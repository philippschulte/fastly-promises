const context = require('@adobe/helix-fetch').context({
  httpsProtocols:
  /* istanbul ignore next */
  process.env.HELIX_FETCH_FORCE_HTTP1 ? ['http1'] : ['http2', 'http1'],
});
const hash = require('object-hash');

const { fetch } = context;

class FastlyError extends Error {
  constructor(response, text) {
    try {
      const body = JSON.parse(text);
      super(body.detail || body.msg || text);
      this.data = body;
      this.code = body.msg;
    } catch {
      // eslint-disable-next-line constructor-super
      super(text);
    }

    this.status = response.status;
    this.name = 'FastlyError';
  }
}

function memo(fn) {
  const keyfn = (...args) => hash(args[0]);
  const cache = new Map();
  return (...fnargs) => {
    const key = keyfn(...fnargs);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const prom = fn(...fnargs);
    return Promise.resolve(prom).then((res) => {
      cache.set(key, res);
      return res;
    }).catch((e) => {
      throw e;
    });
  };
}

function repeatError(error) {
  if (error.name === 'FastlyError') {
    return false;
  }
  return error.name === 'Error';
}

function repeatResponse({ status }) {
  if (status === 429) {
    return true;
  }
  if (status > 500 && status < 505) {
    return true;
  }
  return false;
}

/**
 * Determines if a response or error indicates that the response is repeatable.
 *
 * @param {object} responseOrError - – the error response or error object.
 * @returns {boolean} - True, if another attempt can be made.
 */
function repeat(responseOrError) {
  if (responseOrError instanceof Error) {
    return repeatError(responseOrError);
  }
  return responseOrError.status ? repeatResponse(responseOrError) : false;
}

function create({ baseURL, timeout, headers }) {
  const responselog = [];
  /**
   * Creates a function that mimicks the Axios request API
   * for the selected HTTP method. Optionally enables
   * memoization (function will always return the same results
   * for the same arguments).
   *
   * @param {string} method - The HTTP method (lowercase).
   * @param {boolean} memoize - Cache results (off by default).
   * @param {number} retries - Number of retries in case of flaky servers (default 0).
   * @returns {Function} - A function that makes HTTP requests.
   */
  function makereq(method, memoize = false, retries = 0) {
    const myreq = function req(path, body, config) {
      const myheaders = Object.assign(headers,
        config && config.headers ? config.headers : {});

      const options = {
        method,
        time: true,
        headers: myheaders,
      };
      
      const uri = `${baseURL}${path}`;

      if (timeout) {
        options.signal = context.timeoutSignal(timeout);
      }

      // set body or form based on content type. default is form, except for patch ;-)
      const contentType = myheaders['content-type']
        || (method === 'patch' ? 'application/vnd.api+json' : 'application/x-www-form-urlencoded');
      if (contentType === 'application/x-www-form-urlencoded') {
        // create form data
        options.body = new URLSearchParams(Object.entries(body || {})).toString();
      } else {
        // send JSON
        options.body = JSON.stringify(body);
      }

      const reqfn = (attempt) => fetch(uri, options).then((response) => {

        responselog.push({ 'request-duration': response.elapsedTime, ...response.headers });

        if (!response.ok) {
          if (attempt < retries && repeat(response)) {
            return response.text().then(() => reqfn(attempt + 1));
          }
          return response.text().then((text) => { throw new FastlyError(response, text); });
        }

        return response.text().then((text) => {
          let data = text;
          try {
            data = JSON.parse(text);
            return {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
              config: options,
              data,
            };
          } catch {
            return {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
              config: options,
              data,
            };
          }
        });
      }).catch((reason) => {
        if (attempt < retries && repeat(reason)) {
          return reqfn(attempt + 1);
        }
        throw reason;
      });
      return reqfn(0);
    };
    return memoize ? memo(myreq) : myreq;
  }

  const client = {
    post: makereq('post'),
    get: makereq('get', true, 2),
    put: makereq('put'),
    patch: makereq('patch'),
    delete: makereq('delete'),
    monitor: {
      get count() {
        return responselog.length;
      },

      get remaining() {
        return responselog
          .filter((hdrs) => typeof hdrs['fastly-ratelimit-remaining'] !== 'undefined')
          .map((hdrs) => hdrs['fastly-ratelimit-remaining'])
          .map((remaining) => Number.parseInt(remaining, 10))
          .pop();
      },

      get edgedurations() {
        return responselog
          .filter((hdrs) => typeof hdrs['x-timer'] !== 'undefined')
          .map((hdrs) => hdrs['x-timer'])
          .map((timer) => timer.split(',').pop())
          .map((ve) => ve.substring(2))
          .map((ve) => Number.parseInt(ve, 10));
      },

      get durations() {
        return responselog
          .filter((hdrs) => typeof hdrs['request-duration'] !== 'undefined')
          .map((hdrs) => hdrs['request-duration'])
          .map((ve) => Number.parseInt(ve, 10));
      },

      get stats() {
        return {
          count: this.count,
          remaining: this.remaining,
          minduration: Math.min(...this.durations),
          maxduration: Math.max(...this.durations),
          meanduration: Math.round(this.durations.reduce((a, b) => a + b, 0)
            / this.durations.length),
          minedgeduration: Math.min(...this.edgedurations),
          maxedgeduration: Math.max(...this.edgedurations),
          meanedgeduration: Math.round(this.edgedurations.reduce((a, b) => a + b, 0)
            / this.edgedurations.length),
        };
      },
    },
  };

  client.get.fresh = makereq('get');
  return client;
}

module.exports = { create, FastlyError };
