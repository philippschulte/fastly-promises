/**
 * The Fastly Healthcheck API.
 *
 * @see https://docs.fastly.com/api/config#healthcheck
 * @type {HealthcheckAPI}
 */
class HealthcheckAPI {
  constructor(base) {
    Object.assign(this, {
      service_id: base.service_id,
      request: base.request,
      getVersion: base.getVersion,
    });
  }

  /**
   * List all healthchecks for a particular service and version.
   *
   * @param {string} version - The current version of a service.
   * @returns {Promise} The response object representing the completion or failure.
   */
  async readHealthchecks(version) {
    return this.request.get(`/service/${this.service_id}/version/${await this.getVersion(version, 'current')}/healthcheck`);
  }

  /**
   * Get details of a single named healthcheck.
   *
   * @param {string} version - The current version of a service.
   * @param {string} name - The name of the healthcheck.
   * @returns {Promise} The response object representing the completion or failure.
   */
  async readHealthcheck(version, name) {
    return this.request.get(`/service/${this.service_id}/version/${await this.getVersion(version, 'current')}/healthcheck/${name}`);
  }

  /**
   * Create a healthcheck for a particular service and version.
   *
   * @param {string} version - The current version of a service.
   * @param {object} data - The healthcheck definition.
   * @returns {Promise} The response object representing the completion or failure.
   */
  async createHealthcheck(version, data) {
    return this.request.post(`/service/${this.service_id}/version/${await this.getVersion(version, 'current')}/healthcheck`, data);
  }

  /**
   * Update the healthcheck for a particular service and version.
   *
   * @param {string} version - The current version of a service.
   * @param {string} name - The name of the healthcheck to update.
   * @param {object} data - The healthcheck definition.
   * @returns {Promise} The response object representing the completion or failure.
   */
  async updateHealthcheck(version, name, data) {
    return this.request.put(`/service/${this.service_id}/version/${await this.getVersion(version, 'current')}/healthcheck/${name}`, data);
  }

  /**
   * Delete the healthcheck for a particular service and version.
   *
   * @param {string} version - The current version of a service.
   * @param {string} name - The name of the healthcheck to delete.
   * @returns {Promise} The response object representing the completion or failure.
   */
  async deleteHealthcheck(version, name) {
    return this.request.delete(`/service/${this.service_id}/version/${await this.getVersion(version, 'current')}/healthcheck/${name}`);
  }
}

module.exports = HealthcheckAPI;
