'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/deleteHealthcheck.response');

describe('#deleteHealthcheck', () => {
  const fastly = fastlyPromises('xDrqnDPrSim56UxQeZ442GQTgrAWNXun', '5gY6jizXEIvY6cgU1D1Yq4');
  let res;

  nock(config.mainEntryPoint)
    .delete('/service/5gY6jizXEIvY6cgU1D1Yq4/version/1/healthcheck/example-healthcheck')
    .reply(200, response.deleteHealthcheck);

  before(async () => {
    res = await fastly.deleteHealthcheck(1, 'example-healthcheck');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toBeTruthy();
  });

  it('response body properties should be created', () => {
    expect(res.data.status).toBe('ok');
  });

  it('response body should contain all properties', () => {
    [
      'status',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
