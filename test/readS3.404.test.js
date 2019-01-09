'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readS3.response');

describe('#readS3', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/logging/s3/test-s3-does-not-exist')
    .reply(404, response.readS3404);

  before(async () => {
    res = await fastly.readS3('1', 'test-s3-does-not-exist');
  });

  it('response should be a status 404', () => {
    expect(res.status).toBe(404);
  });

  it('response body should exist', () => {
    expect(res.data).toBeTruthy();
  });

  it('response body should be an object', () => {
    expect(typeof res.data).toBe('object');
  });

  it('response body should contain all properties', () => {
    [
      'msg',
      'detail',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
