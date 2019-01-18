'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/dictionary.response');

describe('#updateDictionary', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .put('/service/SU1Z0isxPaozGVKXdv0eY/version/1/dictionary/my_dictionary')
    .reply(200, response.put);

  before(async () => {
    res = await fastly.updateDictionary(1, 'my_dictionary', {
      name: 'updated_dictionary',
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
    expect(res.data.name).toBe('updated_dictionary');
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
