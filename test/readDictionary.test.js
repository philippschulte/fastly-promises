'use strict';

process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/dictionary.response');

describe('#updateDictionary', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;
  let res2;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/dictionary/my_dictionary')
    .reply(200, response.get);

  before(async () => {
    res = await fastly.readDictionary(1, 'my_dictionary');
    res2 = await fastly.readDictionary(1, 'my_dictionary');
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
    expect(res.data.name).toBe('my_dictionary');
    expect(res.data.deleted_at).toBe(null);
    expect(res.data.write_only).toBe(false);
  });

  it('response body should contain all properties', () => {
    [
      'created_at',
      'deleted_at',
      'id',
      'name',
      'service_id',
      'updated_at',
      'version',
      'write_only',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
