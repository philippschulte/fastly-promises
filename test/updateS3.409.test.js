'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/updateS3.response');

describe('#updateS3', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;
  let err;

  nock(config.mainEntryPoint)
    .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
    .put('/service/SU1Z0isxPaozGVKXdv0eY/version/1/logging/s3/test-s3')
    .reply(409, response.updateS3409);

  before(async () => {
    try {
      res = await fastly.updateS3('1', 'test-s3', {
        name: 'updated-test-s3',
      });
    } catch (e) {
      err = e;
    }
  });

  it('response should be a status 409', () => {
    expect(res).not.toBeDefined();
    expect(err instanceof Error).toBeTruthy();
    expect(err.status).toBe(409);
  });

  it('error body should exist', () => {
    expect(err.data).toBeTruthy();
  });

  it('error code should exist', () => {
    expect(err.code).toBeTruthy();
    expect(err.code).toBe('Duplicate record');
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
      'detail',
    ].forEach((e) => {
      expect(Object.keys(err.data)).toContain(e);
    });
  });
});
