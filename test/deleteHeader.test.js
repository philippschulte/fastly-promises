'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/header.response');

describe('#deleteHeader', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .delete('/service/SU1Z0isxPaozGVKXdv0eY/version/1/header/testheader')
    .reply(200, response.delete);

  before(async () => {
    res = await fastly.deleteHeader(1, 'testheader');
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
    expect(res.data.status).toBe('ok');
  });

  it('response body should contain all properties', () => {
    [
      'status',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
