'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readBigquery.response');

describe('#readBigquery', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/logging/s3/my_bigquery_logging')
    .reply(200, response.readBigquery);

  before(async () => {
    res = await fastly.readS3('1', 'my_bigquery_logging');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toBeTruthy();
  });

  it('response body should be an object', () => {
    expect(typeof res.data).toBe('object');
  });

  it('response body should contain all properties', () => {
    [
      'name',
      'service_id',
      'format',
      'user',
      'secret_key',
      'project_id',
      'dataset',
      'table',
      'template_suffix',
      'response_condition',
      'created_at',
      'updated_at',
      'deleted_at',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
