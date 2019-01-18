const request = require('request-promise-native');

class FastlyError extends Error {
  constructor(response) {
    super(response.body.detail || response.body.msg);

    this.data = response.body;
    this.status = response.statusCode;
    this.code = response.body.msg;
  }
}

function create({ baseURL, timeout, headers }) {
  function makereq(method) {
    return function req(path, body, config) {
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
  }

  return {
    post: makereq('post'),
    get: makereq('get'),
    put: makereq('put'),
    delete: makereq('delete'),
  };
}

module.exports = { create };
