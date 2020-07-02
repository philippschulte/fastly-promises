/* eslint-env mocha */

'use strict';

process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/activateVersion.response');

describe('#activateVersion', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .put('/service/SU1Z0isxPaozGVKXdv0eY/version/253/activate')
    .reply(200, response.activateVersion);

  before(async () => {
    res = await fastly.activateVersion('253');
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

  it('response body property should be true', () => {
    expect(res.data.number).toBe(253);
    expect(res.data.active).toBeTruthy();
  });

  it('response body should contain all properties', () => {
    [
      'testing',
      'locked',
      'number',
      'active',
      'service_id',
      'staging',
      'created_at',
      'deleted_at',
      'comment',
      'updated_at',
      'deployed',
      'msg',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
