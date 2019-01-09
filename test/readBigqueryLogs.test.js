'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readBigqueryLogs.response');

describe('#readBigqueryLogs', () => {
  const fastly = fastlyPromises(
    '923b6bd5266a7f932e41962755bd4254',
    'SU1Z0isxPaozGVKXdv0eY',
  );
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/128/logging/bigquery')
    .reply(200, response.readBigqueryLogs);

  before(async () => {
    res = await fastly.readBigqueryLogs('128');
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
        expect(Object.keys(item)).toContain(e);
      });
    });
  });
});
