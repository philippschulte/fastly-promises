'use strict';

const axios = require('./httpclient');
const config = require('./config');

class Fastly {
  /**
   * Create a new function that lists all log configurations for a given service
   * and version. The function can be parametrized with the name of the logging
   * service.
   *
   * @param {string} service - The id of the logging service. Supported services are:
   * s3, s3canary, azureblob, cloudfiles, digitalocean, ftp, bigquery, gcs, honeycomb,
   * logshuttle, logentries, loggly, heroku, openstack, papertrail, scalyr, splunk,
   * sumologic, syslog.
   * @returns {Function} A logging function.
   */
  static readLogsFn(service) {
    return function readLogs(version) {
      return this.request.get(`/service/${this.service_id}/version/${version}/logging/${service}`);
    };
  }

  /* eslint-disable camelcase */
  /**
   * The constructor method for creating a fastly-promises instance.
   *
   * @param {string} token - The Fastly API token.
   * @param {string} service_id - The Fastly service ID.
   */
  constructor(token, service_id) {
    this.service_id = service_id;
    this.request = axios.create({
      baseURL: config.mainEntryPoint,
      timeout: 3000,
      headers: { 'Fastly-Key': token },
    });

    this.readS3 = Fastly.readLogsFn('s3');
    this.readS3canary = Fastly.readLogsFn('s3canary');
    this.readAzureblob = Fastly.readLogsFn('azureblob');
    this.readCloudfiles = Fastly.readLogsFn('cloudfiles');
    this.readDigitalocean = Fastly.readLogsFn('digitalocean');
    this.readFtp = Fastly.readLogsFn('ftp');
    this.readBigquery = Fastly.readLogsFn('bigquery');
    this.readGcs = Fastly.readLogsFn('gcs');
    this.readHoneycomb = Fastly.readLogsFn('honeycomb');
    this.readLogshuttle = Fastly.readLogsFn('logshuttle');
    this.readLogentries = Fastly.readLogsFn('logentries');
    this.readLoggly = Fastly.readLogsFn('loggly');
    this.readHeroku = Fastly.readLogsFn('heroku');
    this.readOpenstack = Fastly.readLogsFn('openstack');
    this.readPapertrail = Fastly.readLogsFn('papertrail');
    this.readScalyr = Fastly.readLogsFn('scalyr');
    this.readSplunk = Fastly.readLogsFn('splunk');
    this.readSumologic = Fastly.readLogsFn('sumologic');
    this.readSyslog = Fastly.readLogsFn('syslog');
  }

  /**
   * @typedef {Object} Response
   * @property {Number} status The HTTP status code from the server response, e.g. 200.
   * @property {String} statusText The HTTP status text, e.g. 'OK'
   * @property {Object} headers The HTTP headers of the reponse
   * @property {Object} config The original request configuration used for the HTTP client
   * @property {Object} request the HTTP request
   * @property {Object} data the parsed body of the HTTP response
   */

  /**
   * Instant Purge an individual URL.
   *
   * @see https://docs.fastly.com/api/purge#purge_3aa1d66ee81dbfed0b03deed0fa16a9a
   * @param {string} url - The URL to purge.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   * @example
   * instance.purgeIndividual('www.example.com')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   */
  purgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`);
  }

  /**
   * Instant Purge everything from a service.
   *
   * @see https://docs.fastly.com/api/purge#purge_bee5ed1a0cfd541e8b9f970a44718546
   * @example
   * instance.purgeAll()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  purgeAll() {
    return this.request.post(`/service/${this.service_id}/purge_all`);
  }

  /**
   * Instant Purge a particular service of items tagged with a Surrogate Key.
   *
   * @see https://docs.fastly.com/api/purge#purge_d8b8e8be84c350dd92492453a3df3230
   * @example
   * instance.purgeKey('key_1')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @param {string} key - The surrogate key to purge.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  purgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`);
  }

  /**
   * Instant Purge a particular service of items tagged with Surrogate Keys in a batch.
   *
   * @see https://docs.fastly.com/api/purge#purge_db35b293f8a724717fcf25628d713583
   * @example
   * instance.purgeKeys(['key_2', 'key_3', 'key_4'])
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @param {Array} keys - The array of surrogate keys to purge.
   * @returns {Promise} The response object representing the completion or failure.
   */
  purgeKeys(keys = []) {
    return this.request.post(`/service/${this.service_id}/purge`, { surrogate_keys: keys });
  }

  /**
   * Soft Purge an individual URL.
   *
   * @param {string} url - The URL to soft purge.
   * @see https://docs.fastly.com/api/purge#soft_purge_0c4f56f3d68e9bed44fb8b638b78ea36
   * @example
   * instance.softPurgeIndividual('www.example.com/images')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  softPurgeIndividual(url = '') {
    return this.request.post(`/purge/${url}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  /**
   * Soft Purge a particular service of items tagged with a Surrogate Key.
   *
   * @see https://docs.fastly.com/api/purge#soft_purge_2e4d29085640127739f8467f27a5b549
   * @example
   * instance.softPurgeKey('key_5')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @param {string} key - The surrogate key to soft purge.
   * @returns {Promise} The response object representing the completion or failure.
   */
  softPurgeKey(key = '') {
    return this.request.post(`/service/${this.service_id}/purge/${key}`, undefined, { headers: { 'Fastly-Soft-Purge': 1 } });
  }

  /**
   * Get a list of all Fastly datacenters.
   *
   * @see https://docs.fastly.com/api/tools#datacenter_1c8d3b9dd035e301155b44eae05e0554
   * @example
   * instance.dataCenters()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  dataCenters() {
    return this.request.get('/datacenters');
  }

  /**
   * Fastly's services IP ranges.
   *
   * @see https://docs.fastly.com/api/tools#public_ip_list_ef2e9900a1c9522b58f5abed92ec785e
   * @example
   * instance.publicIpList()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   */
  publicIpList() {
    return this.request.get('/public-ip-list');
  }

  /**
   * Retrieve headers and MD5 hash of the content for a particular URL from each Fastly edge server.
   *
   * @see https://docs.fastly.com/api/tools#content_4d2d4548b29c7661e17ebe7098872d6d
   * @example
   * instance.edgeCheck('api.example.com')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @param {string} url - Full URL (host and path) to check on all nodes. If protocol is omitted,
   http will be assumed.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  edgeCheck(url = '') {
    return this.request.get(`/content/edge_check?url=${url}`);
  }

  /**
   * List all services.
   *
   * @see https://docs.fastly.com/api/config#service_74d98f7e5d018256e44d1cf820388ef8
   * @example
   * instance.readServices()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   */
  readServices() {
    return this.request.get('/service');
  }

  /**
   * List the versions for a particular service.
   *
   * @see https://docs.fastly.com/api/config#version_dfde9093f4eb0aa2497bbfd1d9415987
   * @example
   * instance.readVersions()
   .then(res => {
     const active = res.data.filter(version => version.active);
     console.log(active);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  readVersions() {
    return this.request.get(`/service/${this.service_id}/version`);
  }

  /**
   * Clone the current configuration into a new version.
   *
   * @param {string} version - The version to be cloned.
   * @see https://docs.fastly.com/api/config#version_7f4937d0663a27fbb765820d4c76c709
   * @example
   * instance.cloneVersion('45')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   */
  cloneVersion(version = '') {
    return this.request.put(`/service/${this.service_id}/version/${version}/clone`);
  }

  /**
   * Activate the current version.
   *
   * @param {string} version - The version to be activated.
   * @see https://docs.fastly.com/api/config#version_0b79ae1ba6aee61d64cc4d43fed1e0d5
   * @example
   * instance.activateVersion('23')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  activateVersion(version = '') {
    return this.request.put(`/service/${this.service_id}/version/${version}/activate`);
  }

  /**
   * Checks the status of all domains for a particular service and version.
   *
   * @param {string} version - The current version of a service.
   * @see https://docs.fastly.com/api/config#domain_e33a599694c3316f00b6b8d53a2db7d9
   * @example
   * instance.domainCheckAll('182')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @returns {Promise} The response object representing the completion or failure.
   */
  domainCheckAll(version = '') {
    return this.request.get(`/service/${this.service_id}/version/${version}/domain/check_all`);
  }

  /**
   * List all the domains for a particular service and version.
   *
   * @param {string} version - The current version of a service.
   * @see https://docs.fastly.com/api/config#domain_6d340186666771f022ca20f81609d03d
   * @example
   * instance.readDomains('182')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });

   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  readDomains(version = '') {
    return this.request.get(`/service/${this.service_id}/version/${version}/domain`);
  }

  /**
   * List all backends for a particular service and version.
   *
   * @see https://docs.fastly.com/api/config#backend_fb0e875c9a7669f071cbf89ca32c7f69
   * @example
   * instance.readBackends('12')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @param {string} version - The current version of a service.
   * @returns {Promise} The response object representing the completion or failure.
   */
  readBackends(version = '') {
    return this.request.get(`/service/${this.service_id}/version/${version}/backend`);
  }

  /**
   * Update the backend for a particular service and version.
   *
   * @see https://docs.fastly.com/api/config#backend_fb3b3529417c70f57458644f7aec652e
   * @example
   * instance.updateBackend('34', 'slow-server', { name: 'fast-server' })
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
   * @param {string} version - The current version of a service.
   * @param {string} name - The name of the backend.
   * @param {Object} data - The data to be sent as the request body.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  updateBackend(version = '', name = '', data = {}) {
    return this.request.put(`/service/${this.service_id}/version/${version}/backend/${encodeURIComponent(name)}`, data);
  }
  /**
   * @typedef {Object} Snippet
   * @property {String} name The name of the snippet, as visible in the Fastly UI
   * @property {String} content The VCL body of the snippet
   */

  /**
   * Create a snippet for a particular service and version.
   *
   * @see https://docs.fastly.com/api/config#snippet_41e0e11c662d4d56adada215e707f30d
   * @example
   * instance.createSnippet('36', {
    name: 'your_snippet',
    priority: 10,
    dynamic: 1,
    content: 'table referer_blacklist {}',
    type: 'init'
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err.message);
  });
   * @param {string} version - The current version of a service.
   * @param {Snippet} data - The data to be sent as the request body.
   * @returns {Promise} The response object representing the completion or failure.
   */
  createSnippet(version = '', data = {}) {
    return this.request.post(`/service/${this.service_id}/version/${version}/snippet`, data);
  }

  /**
   * Update a VCL snippet for a particular service and version.
   *
   * @param {string} version - The current version of a service.
   * @param {string} name - The name of the snippet to update.
   * @param {Snippet} data - The data to be sent as the request body.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  updateSnippet(version = '', name = '', data = {}) {
    return this.request.put(`/service/${this.service_id}/version/${version}/snippet/${name}`, data);
  }

  /**
   * @typedef {Object} VCL
   * @property {String} name The name of the VCL, as visible in the Fastly UI.
   * Note: setting the name to 'main' here won't make it the main VCL,
   * unless you also call `setMainVCL`.
   * @property {String} content The VCL body of the custom VCL
   */

  /**
   * Create custom VCL for a particular service and version.
   *
   * @see https://docs.fastly.com/api/config#vcl_7ade6ab5926b903b6acf3335a85060cc
   * @param {string} version - The current version of a service.
   * @param {VCL} data - The data to be sent as the request body.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  createVCL(version = '', data = {}) {
    return this.request.post(`/service/${this.service_id}/version/${version}/vcl`, data);
  }

  /**
   * Update custom VCL for a particular service and version.
   *
   * @see https://docs.fastly.com/api/config#vcl_0971365908e17086751c5ef2a8053087
   * @param {string} version - The current version of a service.
   * @param {string} name - The name of the VCL to update.
   * @param {VCL} data - The data to be sent as the request body.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  updateVCL(version = '', name = '', data = {}) {
    return this.request.put(`/service/${this.service_id}/version/${version}/vcl/${name}`, data);
  }

  /**
   * Define a custom VCL to be the main VCL for a particular service and version.
   *
   * @see https://docs.fastly.com/api/config#vcl_5576c38e7652f5a7261bfcad41c0faf1
   * @param {string} version - The current version of a service.
   * @param {string} name - The name of the VCL to declare main.
   * @returns {Promise} The response object representing the completion or failure.
   * @fulfil {Response}
   */
  setMainVCL(version = '', name = '') {
    return this.request.put(`/service/${this.service_id}/version/${version}/vcl/${name}/main`, {});
  }
}

/**
 * Function to create a new fastly-promises instance.
 *
 * @param {string} token - The Fastly API token.
 * @param {string} service_id - The Fastly service ID.
 */
module.exports = (token = '', service_id = '') => new Fastly(token, service_id);
