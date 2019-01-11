/* eslint-env mocha */

'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/activateVersion.response');
const getversionsresponse = require('./response/readVersions.response');

describe('#activateVersion.default', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version')
    .reply(200, getversionsresponse.readVersions)
    .put('/service/SU1Z0isxPaozGVKXdv0eY/version/2/activate')
    .reply(200, response.activateVersionDefault);

  before(async () => {
    res = await fastly.activateVersion();
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
    expect(res.data.number).toBe(3);
    expect(res.data.active).toBeTruthy();
  });

  it('active version is 3', async () => {
    expect((await fastly.getVersions()).active).toBe(3);
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
