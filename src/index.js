'use strict';

const axios = require('axios');
const config = require('./config');

class Fastly {
  constructor(token, service_id) {
    this.service_id = service_id;
    this.request = axios.create({
      baseURL: config.mainEntryPoint,
      timeout: 3000,
      headers: { 'Fastly-Key': token }
    });
  }

  purgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`);
  }

  purgeAll() {
    return this.request.post(`/service/${this.service_id}/purge_all`);
  }

  purgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`);
  }

  purgeKeys(keys = []) {
    return this.request.post(`/service/${this.service_id}/purge`, { 'surrogate_keys': keys });
  }

  softPurgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  softPurgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  dataCenters() {
    return this.request.get('/datacenters');
  }

  publicIpList() {
    return this.request.get('/public-ip-list');
  }

  edgeCheck(url = '') {
    return this.request.get(`/content/edge_check?url=${url}`);
  }
}

module.exports = (token = '', service_id = '') => {
  return new Fastly(token, service_id);
};
