const request = require('request-promise-native');
const memo = require('lodash.memoize');

class FastlyError extends Error {
  constructor(response) {
    super(response.body.detail || response.body.msg);

    this.data = response.body;
    this.status = response.statusCode;
    this.code = response.body.msg;
    this.name = 'FastlyError';
  }
}

function repeatError(error) {
  if (error.name === 'FastlyError') {
    return false;
  }
  return error.name === 'RequestError';
}

function repeatResponse({ statusCode }) {
  if (statusCode === 429) {
    return true;
  }
  if (statusCode > 500 && statusCode < 505) {
    return true;
  }
  return false;
}

/**
 * Determines if a response or error indicates that the response is repeatable.
 *
 * @param {Object} responseOrError - – the error response or error object.
 * @returns {boolean} - True, if another attempt can be made.
 */
function repeat(responseOrError) {
  if (responseOrError instanceof Error) {
    return repeatError(responseOrError);
  }
  return responseOrError.statusCode ? repeatResponse(responseOrError) : false;
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
        uri: `${baseURL}${path}`,
        json: true,
        form: method === 'patch' ? undefined : body,
        body: method === 'patch' ? body : undefined,
        timeout,
        headers: myheaders,
        resolveWithFullResponse: true,
        simple: false,
      };

      const reqfn = attempt => request(options).then((response) => {
        responselog.push(response.headers);
        if (response.statusCode >= 400) {
          if (attempt < retries && repeat(response)) {
            return reqfn(attempt + 1);
          }
          throw new FastlyError(response);
        }
        return {
          status: response.statusCode,
          statusText: response.stausMessage,
          headers: response.headers,
          config: options,
          request: response.request,
          data: response.body,
        };
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
      count: () => {
        return responselog.length;
      },

      remaining: () => {
        return responselog
          .filter(headers => typeof headers['Fastly-RateLimit-Remaining']!=='undefined')
          .map(headers => headers['Fastly-RateLimit-Remaining'])
          .map(remaining => Number.parseInt(remaining))
          .pop();
      }
    }
  };

  client.get.fresh = makereq('get');
  return client;
}

module.exports = { create };
