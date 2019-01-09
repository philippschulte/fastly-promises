'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readS3.response');

describe('#readS3', () => {
  const fastly = fastlyPromises('invalid', 'SU1Z0isxPaozGVKXdv0eY');
  let res;
  let err;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/logging/s3/test-s3-does-not-exist')
    .reply(401, response.readS3401);

  before(async () => {
    err = undefined;
    try {
      res = await fastly.readS3('1', 'test-s3-does-not-exist');
    } catch (e) {
      err = e;
    }
  });

  it('response should be a status 401', () => {
    expect(res).not.toBeDefined();
    expect(err instanceof Error).toBeTruthy();
    expect(err.status).toBe(401);
  });

  it('error body should exist', () => {
    expect(err.data).toBeTruthy();
  });

  it('error code should exist', () => {
    expect(err.code).toBeTruthy();
    expect(err.code).toBe('Provided credentials are missing or invalid');
  });

  it('error message should exist', () => {
    expect(err.message).toBeTruthy();
  });

  it('error body should be an object', () => {
    expect(typeof err.data).toBe('object');
  });

  it('response err should contain all properties', () => {
    [
      'msg',
    ].forEach((e) => {
      expect(Object.keys(err.data)).toContain(e);
    });
  });
});
