'use strict';

const axios = require('axios');

class Fastly {
  constructor(token, service_id) {
    this.service_id = service_id;
    this.request = axios.create({
      baseURL: 'https://api.fastly.com',
      timeout: 3000,
      headers: { 'Fastly-Key': token }
    });
  }

  async fastly(method = 'get', url = '/', data = {}, headers = {}, fullResponse = false) {
    try {
      const response = await this.request[method](url, data, headers);
      if (fullResponse) {
        return response;
      } else {
        return response.data;
      }
    } catch (e) {
      return Promise.reject(new Error(e));
    }
  }

  purgeIndividual(url = '', fullResponse) {
    return this.fastly('post', `/purge/${url}`, undefined, undefined, fullResponse);
  }

  purgeAll(fullResponse) {
    return this.fastly('post', `/service/${this.service_id}/purge_all`, undefined, undefined, fullResponse);
  }

  purgeKey(key = '', fullResponse) {
    return this.fastly('post', `/service/${this.service_id}/purge/${key}`, undefined, undefined, fullResponse);
  }

  purgeKeys(keys = [], fullResponse) {
    return this.fastly('post', `/service/${this.service_id}/purge`, { 'surrogate_keys': keys }, undefined, fullResponse);
  }

  softPurgeIndividual(url, fullResponse) {
    return this.fastly('post', `/purge/${url}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } }, fullResponse);
  }

  softPurgeKey(key, fullResponse) {
    return this.fastly('post', `/service/${this.service_id}/purge/${key}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } }, fullResponse);
  }

  dataCenters(fullResponse) {
    return this.fastly('get', '/datacenters', undefined, undefined, fullResponse);
  }

  publicIpList(fullResponse) {
    return this.fastly('get', '/public-ip-list', undefined, undefined, fullResponse);
  }

  edgeCheck(url, fullResponse) {
    return this.fastly('get', `/content/edge_check?url=${url}`, undefined, undefined, fullResponse);
  }
}

module.exports = (token = '', service_id = '') => {
  return new Fastly(token, service_id);
};
