'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/upsertDictionaryItems.response');

describe('#upsertDictionaryItems', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .patch('/service/SU1Z0isxPaozGVKXdv0eY/dictionary/3e0q7dNrOfeXSBGcL5GeLQ/items')
    .reply(200, response.upsertDictionaryItems);

  let data = {
      "items": [
          {
              "op": "upsert",
              "item_key": "v1",
              "item_value": "1.0.5"
          },
          {
              "op": "upsert",
              "item_key": "vLatest",
              "item_value": "2.3.9"
          },
          {
              "op": "upsert",
              "item_key": "legacy",
              "item_value": "1.1.0"
          }
      ]
  };
  before(async () => {
    res = await fastly.upsertDictionaryItems('3e0q7dNrOfeXSBGcL5GeLQ', data);
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });
  
  it('response body should exist', () => {
    expect(res.data).toExist();
  });

  it('response body should be an object', () => {
      expect(res.data).toBeA('object');
  });

    it('response body should contain all properties', () => {
        expect(res.data).toIncludeKeys(['status']);
    });
});
