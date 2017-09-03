'use strict';

const axios = require('axios');
const config = require('./config');

class Fastly {
  /**
   * The constructor method for creating a fastly-promises instance.
   *
   * @name constructor
   * @method
   * @param token {Sting}
   * @param service_id {String}
   */
  constructor(token, service_id) {
    this.service_id = service_id;
    this.request = axios.create({
      baseURL: config.mainEntryPoint,
      timeout: 3000,
      headers: { 'Fastly-Key': token }
    });
  }

  /**
   * Instant Purge an individual URL.
   *
   * @name purgeIndividual
   * @method
   * @param url {String}
   * @return {Promise}
   */
  purgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`);
  }

  /**
   * Instant Purge everything from a service.
   *
   * @name purgeAll
   * @method
   * @return {Promise}
   */
  purgeAll() {
    return this.request.post(`/service/${this.service_id}/purge_all`);
  }

  /**
   * Instant Purge a particular service of items tagged with a Surrogate Key.
   *
   * @name purgeKey
   * @method
   * @param key {String}
   * @return {Promise}
   */
  purgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`);
  }

  /**
   * Instant Purge a particular service of items tagged with Surrogate Keys in a batch.
   *
   * @name purgeKeys
   * @method
   * @param keys {Array}
   * @return {Promise}
   */
  purgeKeys(keys = []) {
    return this.request.post(`/service/${this.service_id}/purge`, { 'surrogate_keys': keys });
  }

  /**
   * Soft Purge an individual URL.
   *
   * @name softPurgeIndividual
   * @method
   * @param url {String}
   * @return {Promise}
   */
  softPurgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  /**
   * Soft Purge a particular service of items tagged with a Surrogate Key.
   *
   * @name softPurgeKey
   * @method
   * @param key {String}
   * @return {Promise}
   */
  softPurgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  /**
   * Get a list of all Fastly datacenters.
   *
   * @name dataCenters
   * @method
   * @return {Promise}
   */
  dataCenters() {
    return this.request.get('/datacenters');
  }

  /**
   * Fastly's services IP ranges.
   *
   * @name publicIpList
   * @method
   * @return {Promise}
   */
  publicIpList() {
    return this.request.get('/public-ip-list');
  }

  /**
   * Retrieve headers and MD5 hash of the content for a particular URL from each Fastly edge server.
   *
   * @name edgeCheck
   * @method
   * @param url {String}
   * @return {Promise}
   */
  edgeCheck(url = '') {
    return this.request.get(`/content/edge_check?url=${url}`);
  }
  
  /**
   * List all services.
   *
   * @name serviceList
   * @method
   * @return {Promise}
   */
  serviceList() {
    return this.request.get(`/service`);
  }
  
  /**
   * List the versions for a particular service.
   *
   * @name versionList
   * @method
   * @return {Promise}
   */
  versionList() {
    return this.request.get(`/service/${this.service_id}/version`);
  }
  
  /**
   * List all the domains for a particular service and version.
   *
   * @name domainList
   * @method
   * @param version {String}
   * @return {Promise}
   */
  domainList(version = '') {
    return this.request.get(`/service/${this.service_id}/version/${version}/domain`);
  }
}

/**
 * Function to create a new fastly-promises instance.
 *
 * @name anonymous
 * @function
 * @param token {String}
 * @param service_id {String}
 * @return {Object} {
 *    service_id : the alphanumeric string identifying a service
 *    request    : instance of axios with a custom config
 * }
 */
module.exports = (token = '', service_id = '') => {
  return new Fastly(token, service_id);
};
