'use strict';

process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';
/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/dictitem.response');

describe('#readDictItem (write-only)', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    // get the dictionary first
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/dictionary/secret_dictionary')
    .reply(200, response.dict.getsecret);

  before(async () => {
    res = await fastly.readDictItem(1, 'secret_dictionary', 'some_key');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(403);
  });

  it('response body should exist', () => {
    expect(res.data).toBeTruthy();
  });

  it('response body should be an object', () => {
    expect(typeof res.data).toBe('object');
  });

  it('response value should match', () => {
    expect(res.data.item_value).toBeUndefined();
    expect(res.data.created_at).toBeUndefined();
    expect(res.data.deleted_at).toBeUndefined();
    expect(res.data.updated_at).toBeUndefined();
  });

  it('response body should contain all properties', () => {
    [
      'dictionary_id',
      'service_id',
      'item_key',
      'item_value',
      'created_at',
      'deleted_at',
      'updated_at',
    ].forEach((e) => {
      expect(Object.keys(res.data)).toContain(e);
    });
  });
});
