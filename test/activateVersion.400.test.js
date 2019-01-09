/* eslint-env mocha */

'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/activateVersion.response');

describe('#activateVersion', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;
  let err;

  nock(config.mainEntryPoint)
    .put('/service/SU1Z0isxPaozGVKXdv0eY/version/253/activate')
    .reply(400, response.activateVersion400);

  before(async () => {
    err = undefined;
    try {
      res = await fastly.activateVersion('253');
    } catch (e) {
      err = e;
    }
  });

  it('response should be a status 400', () => {
    expect(res).not.toBeDefined();
    expect(err instanceof Error).toBeTruthy();
    expect(err.status).toBe(400);
  });

  it('error body should exist', () => {
    expect(err.data).toBeTruthy();
  });

  it('error code should exist', () => {
    expect(err.code).toBeTruthy();
    expect(err.code).toBe('Bad request');
  });

  it('error message should exist', () => {
    expect(err.message).toBeTruthy();
  });

  it('error body should be an object', () => {
    expect(typeof err.data).toBe('object');
  });

  it('response err should contain all properties', () => {
    [
      'msg',
      'detail',
    ].forEach((e) => {
      expect(Object.keys(err.data)).toContain(e);
    });
  });
});
