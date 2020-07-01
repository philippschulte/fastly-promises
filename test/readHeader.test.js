'use strict';

process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/header.response');

describe('#readHeader', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;
  let res2;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/header/testheader')
    .reply(200, response.get);

  before(async () => {
    res = await fastly.readHeader(1, 'testheader');
    res2 = await fastly.readHeader(1, 'testheader');
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

  it('response should be the same for repeated invocations', () => {
    expect(res2).toEqual(res);
  });

  it('response body properties should be created', () => {
    expect(res.data.name).toBe('testheader');
    expect(res.data.dst).toBe('http.foo');
  });

  it('response body should contain all properties', () => {
    [
      'action',
      'cache_condition',
      'dst',
      'ignore_if_set',
      'name',
      'priority',
      'regex',
      'request_condition',
      'response_condition',
      'service_id',
      'src',
      'substitution',
      'type',
      'version',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
