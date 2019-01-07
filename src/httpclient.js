const request = require('request-promise-native');

function create({ baseURL, timeout, headers }) {
  function makereq(method) {
    return function req(path, body, config) {
      const myheaders = Object.assign(headers,
        config && config.headers ? config.headers : {});

      const options = {
        method,
        uri: `${baseURL}${path}`,
        json: true,
        body,
        timeout,
        myheaders,
        resolveWithFullResponse: true,
        simple: false,
      };

      return request(options).then(response => ({
        status: response.statusCode,
        statusText: response.stausMessage,
        headers: response.headers,
        config: options,
        request: response.request,
        data: response.body,
      }));
    };
  }

  return {
    post: makereq('post'),
    get: makereq('get'),
    put: makereq('put'),
  };
}

module.exports = { create };
