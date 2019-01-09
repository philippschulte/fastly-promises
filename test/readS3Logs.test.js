'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readS3Logs.response');

describe('#readS3Logs', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/128/logging/s3')
    .reply(200, response.readS3Logs);

  before(async () => {
    res = await fastly.readS3Logs('128');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toBeTruthy();
  });

  it('response body should be an array', () => {
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('response body should be an array of objects', () => {
    res.data.forEach((item) => {
      expect(typeof item).toBe('object');
    });
  });

  it('response body should contain all properties', () => {
    res.data.forEach((item) => {
      [
        'access_key',
        'bucket_name',
        'created_at',
        'deleted_at',
        'domain',
        'format',
        'format_version',
        'gzip_level',
        'message_type',
        'name',
        'path',
        'period',
        'placement',
        'redundancy',
        'response_condition',
        'secret_key',
        'service_id',
        'timestamp_format',
        'updated_at',
        'version',
      ].forEach((e) => {
        expect(Object.keys(item)).toContain(e);
      });
    });
  });
});
