'use strict';

/* eslint-env mocha */
process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/edgeCheck.response');

describe('#edgeCheck', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/content/edge_check?url=www.example.com/foo/bar')
    .reply(200, response.edgeCheck);

  before(async () => {
    res = await fastly.edgeCheck('www.example.com/foo/bar');
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
      ['hash', 'request', 'response', 'response_time', 'server'].forEach((e) => {
        expect(Object.keys(item)).toContain(e);
      });
    });
  });
});
