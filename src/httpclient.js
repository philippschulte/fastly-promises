const request = require('request-promise-native');
const memo = require('lodash.memoize');

class FastlyError extends Error {
  constructor(response) {
    super(response.body.detail || response.body.msg);

    this.data = response.body;
    this.status = response.statusCode;
    this.code = response.body.msg;
  }
}

function create({ baseURL, timeout, headers }) {
  /**
   * Creates a function that mimicks the Axios request API
   * for the selected HTTP method. Optionally enables
   * memoization (function will always return the same results
   * for the same arguments).
   *
   * @param {string} method - The HTTP method (lowercase).
   * @param {boolean} memoize - Cache results (off by default).
   * @returns {Function} - A function that makes HTTP requests.
   */
  function makereq(method, memoize = false) {
    const myreq = function req(path, body, config) {
      const myheaders = Object.assign(headers,
        config && config.headers ? config.headers : {});

      const options = {
        method,
        uri: `${baseURL}${path}`,
        json: true,
        form: body,
        timeout,
        headers: myheaders,
        resolveWithFullResponse: true,
        simple: false,
      };

      return request(options).then((response) => {
        if (response.statusCode >= 400) {
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
      });
    };
    return memoize ? memo(myreq) : myreq;
  }

  const client = {
    post: makereq('post'),
    get: makereq('get', true),
    put: makereq('put'),
    delete: makereq('delete'),
  };

  client.get.fresh = makereq('get');
  return client;
}

module.exports = { create };
