'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/upsertDictionaryItem.response');

describe('#upsertDictionaryItem', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .put('/service/SU1Z0isxPaozGVKXdv0eY/dictionary/3e0q7dNrOfeXSBGcL5GeLQ/item/v1')
    .reply(200, response.upsertDictionaryItem);

  before(async () => {
    res = await fastly.upsertDictionaryItem('3e0q7dNrOfeXSBGcL5GeLQ', 'v1', '1.1.23');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });
  
  it('response body should exist', () => {
    expect(res.data).toExist();
  });

  it('response body should be an array', () => {
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('response body should be an array of objects', () => {
    res.data.forEach(item => {
      expect(item).toBeA('object');
    });
  });

  it('response body should contain all properties', () => {
    res.data.forEach(item => {
      expect(item).toIncludeKeys([
        'dictionary_id',
        'service_id',
        'deleted_at',
        'created_at',
        'updated_at',
        'item_key',
        'item_value'
      ]);
    });
  });
});
