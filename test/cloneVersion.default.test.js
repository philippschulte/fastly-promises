/* eslint-env mocha */

'use strict';

process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/cloneVersion.response');
const getversionsresponse = require('./response/readVersions.response');

describe('#cloneVersion.default', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version')
    .reply(200, getversionsresponse.readVersions)
    .put('/service/SU1Z0isxPaozGVKXdv0eY/version/1/clone')
    .reply(200, response.cloneVersionDefault);

  before(async () => {
    res = await fastly.cloneVersion();
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
    expect(res.data.number).toBeGreaterThan(1);
  });

  it('current version should be increased', async () => {
    expect((await fastly.getVersions()).current).toBeGreaterThan(1);
  });

  it('latest version should be increased', async () => {
    expect((await fastly.getVersions()).latest).toBeGreaterThan(1);
  });

  it('active version should be unchanged', async () => {
    expect((await fastly.getVersions()).active).toBe(1);
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
