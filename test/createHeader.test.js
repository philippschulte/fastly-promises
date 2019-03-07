'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/header.response');

describe('#createHeader', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .post('/service/SU1Z0isxPaozGVKXdv0eY/version/1/header')
    .reply(200, response.post);

  before(async () => {
    res = await fastly.createHeader(1, {
      name: 'testheader',
    });
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
    expect(res.data.name).toBe('testheader');
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
