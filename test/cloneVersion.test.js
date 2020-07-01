/* eslint-env mocha */

'use strict';

process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/cloneVersion.response');

describe('#cloneVersion', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .put('/service/SU1Z0isxPaozGVKXdv0eY/version/134/clone')
    .reply(200, response.cloneVersion);

  before(async () => {
    res = await fastly.cloneVersion('134');
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

  it('response body property should be greater than cloned version number', () => {
    expect(res.data.number).toBeGreaterThan(134);
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
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
