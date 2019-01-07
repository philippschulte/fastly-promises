'use strict';

/* eslint-env mocha */

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
    expect(res.data).toExist();
  });

  it('response body should be an array', () => {
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('response body should be an array of objects', () => {
    res.data.forEach((item) => {
      expect(item).toBeA('object');
    });
  });

  it('response body should contain all properties', () => {
    res.data.forEach((item) => {
      expect(item).toIncludeKeys(['hash', 'request', 'response', 'response_time', 'server']);
    });
  });
});
