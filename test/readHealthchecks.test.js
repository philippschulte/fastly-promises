'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readHealthchecks.response');

describe('#createHealthCheck', () => {
  const fastly = fastlyPromises('xDrqnDPrSim56UxQeZ442GQTgrAWNXun', '5gY6jizXEIvY6cgU1D1Yq4');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/5gY6jizXEIvY6cgU1D1Yq4/version/1/healthcheck')
    .reply(200, response.readHealthchecks);

  before(async () => {
    res = await fastly.readHealthchecks(1);
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toBeTruthy();
  });

  it('response body should be an array', () => {
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it('response body properties should be created', () => {
    expect(res.data[0].name).toBe('example-healthcheck');
  });

  it('response body should contain all properties', () => {
    res.data.forEach((dat) => {
      [
        'name',
        'host',
        'path',
        'method',
        'expected_response',
        'check_interval',
        'comment',
        'http_version',
        'initial',
        'service_id',
        'threshold',
        'timeout',
        'version',
        'window',
      ].forEach((e) => {
        expect(Object.keys(dat)).toContain(e);
      });
    });
  });
});
