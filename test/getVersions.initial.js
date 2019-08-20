'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readVersions.initial.response');

describe('#getVersions(inital)', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let versions;

  const scope = nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version')
    .reply(200, response.readVersions);

  beforeEach(async () => {
    versions = await fastly.getVersions();
  });

  it('active version should be undefined', () => {
    expect(versions.active).toBeUndefined();
  });

  it('latest version should be 1', () => {
    expect(versions.latest).toBe(1);
  });

  it('current version should be undefined', () => {
    expect(versions.current).toBeUndefined();
  });

  after('API has been called once', () => {
    scope.done();
  });
});

describe('#getVersion(initial)', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');

  const scope = nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version')
    .reply(200, response.readVersions);

  it('active version should be undefined', async () => {
    expect(await fastly.getVersion(undefined, 'active')).toBeUndefined();
  });

  it('latest version should be 1', async () => {
    expect(await fastly.getVersion(undefined, 'latest')).toBe(1);
  });

  it('current version should be undefined', async () => {
    expect(await fastly.getVersion(undefined, 'current')).toBeUndefined();
  });

  it('current version should be 1 after fallbacks', async () => {
    expect(await fastly.getVersion(undefined, 'nonsense', 'active', 'current', 'initial')).toBe(1);
  });

  after('API has been called once', () => {
    scope.done();
  });
});
