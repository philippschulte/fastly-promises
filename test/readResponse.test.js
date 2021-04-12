'use strict';

process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/response.response');

describe('#readResponse', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/response_object/test-response')
    .reply(200, response.get);

  before(async () => {
    res = await fastly.readResponse(1, 'test-response');
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

  it('response body properties should be created', () => {
    expect(res.data.name).toBe('test-response');
    expect(res.data.content).toBe('This message means all is okay.');
  });

  it('response body should contain all properties', () => {
    [
      'cache_condition',
      'content',
      'content_type',
      'name',
      'request_condition',
      'response',
      'service_id',
      'status',
      'version',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
