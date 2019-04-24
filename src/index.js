'use strict';

const axios = require('axios');
const config = require('./config');

class Fastly {
  /**
   * The constructor method for creating a fastly-promises instance.
   * @param token {String} The Fastly API token.
   * @param service_id {String} The Fastly service ID.
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
   * @param url {String} The URL to purge.
   * @return {Promise} The response object representing the completion or failure.
   */
  purgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`);
  }

  /**
   * Instant Purge everything from a service.
   * @return {Promise} The response object representing the completion or failure.
   */
  purgeAll() {
    return this.request.post(`/service/${this.service_id}/purge_all`);
  }

  /**
   * Instant Purge a particular service of items tagged with a Surrogate Key.
   * @param key {String} The surrogate key to purge.
   * @return {Promise} The response object representing the completion or failure.
   */
  purgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`);
  }

  /**
   * Instant Purge a particular service of items tagged with Surrogate Keys in a batch.
   * @param keys {Array} The array of surrogate keys to purge.
   * @return {Promise} The response object representing the completion or failure.
   */
  purgeKeys(keys = []) {
    return this.request.post(`/service/${this.service_id}/purge`, { 'surrogate_keys': keys });
  }

  /**
   * Soft Purge an individual URL.
   * @param url {String} The URL to soft purge.
   * @return {Promise} The response object representing the completion or failure.
   */
  softPurgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  /**
   * Soft Purge a particular service of items tagged with a Surrogate Key.
   * @param key {String} The surrogate key to soft purge.
   * @return {Promise} The response object representing the completion or failure.
   */
  softPurgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  /**
   * Get a list of all Fastly datacenters.
   * @return {Promise} The response object representing the completion or failure.
   */
  dataCenters() {
    return this.request.get('/datacenters');
  }

  /**
   * Fastly's services IP ranges.
   * @return {Promise} The response object representing the completion or failure.
   */
  publicIpList() {
    return this.request.get('/public-ip-list');
  }

  /**
   * Retrieve headers and MD5 hash of the content for a particular URL from each Fastly edge server.
   * @param url {String} Full URL (host and path) to check on all nodes. If protocol is omitted, http will be assumed.
   * @return {Promise} The response object representing the completion or failure.
   */
  edgeCheck(url = '') {
    return this.request.get(`/content/edge_check?url=${url}`);
  }
  
  /**
   * List all services.
   * @return {Promise} The response object representing the completion or failure.
   */
  readServices() {
    return this.request.get(`/service`);
  }
  
  /**
   * List the versions for a particular service.
   * @return {Promise} The response object representing the completion or failure.
   */
  readVersions() {
    return this.request.get(`/service/${this.service_id}/version`);
  }

  /**
   * Clone the current configuration into a new version.
   * @param version {String} The version to be cloned.
   * @return {Promise} The response object representing the completion or failure.
   */
  cloneVersion(version = '') {
    return this.request.put(`/service/${this.service_id}/version/${version}/clone`);
  }

  /**
   * Activate the current version.
   * @param version {String} The version to be activated.
   * @return {Promise} The response object representing the completion or failure.
   */
  activateVersion(version = '') {
    return this.request.put(`/service/${this.service_id}/version/${version}/activate`);
  }

  /**
   * Checks the status of all domains for a particular service and version.
   * @param version {String} The current version of a service.
   * @return {Promise} The response object representing the completion or failure.
   */
  domainCheckAll(version = '') {
    return this.request.get(`/service/${this.service_id}/version/${version}/domain/check_all`);
  }

  /**
   * List all the domains for a particular service and version.
   * @param version {String} The current version of a service.
   * @return {Promise} The response object representing the completion or failure.
   */
  readDomains(version = '') {
    return this.request.get(`/service/${this.service_id}/version/${version}/domain`);
  }

  /**
   * List all backends for a particular service and version.
   * @param version {String} The current version of a service.
   * @return {Promise} The response object representing the completion or failure.
   */
  readBackends(version = '') {
    return this.request.get(`/service/${this.service_id}/version/${version}/backend`);
  }


  /**
   * @param version {String} The current version of a service.
   * @return {Promise} The response object representing the completion or failure.
   */
  readBackends(version = '') {
      return this.request.get(`/service/${this.service_id}/version/${version}/dictionary`);
  }

    /**
   * Update the backend for a particular service and version.
   * @param version {String} The current version of a service.
   * @param name {String} The name of the backend.
   * @param data {Object} The data to be sent as the request body.
   * @return {Promise} The response object representing the completion or failure.
   */
  updateBackend(version = '', name = '', data = {}) {
    return this.request.put(`/service/${this.service_id}/version/${version}/backend/${encodeURIComponent(name)}`, data);
  }

  /**
   * Create a snippet for a particular service and version.
   * @param version {String} The current version of a service.
   * @param data {Object} The data to be sent as the request body.
   * @return {Promise} The response object representing the completion or failure.
   */
  createSnippet(version = '', data = {}) {
    return this.request.post(`/service/${this.service_id}/version/${version}/snippet`, data);
  }
}

/**
 * Function to create a new fastly-promises instance.
 * @param token {String} The Fastly API token.
 * @param service_id {String} The Fastly service ID.
 * @return {Object} {
 *    service_id : The alphanumeric string identifying a service
 *    request    : Axios instance
 * }
 */
module.exports = (token = '', service_id = '') => {
  return new Fastly(token, service_id);
};
