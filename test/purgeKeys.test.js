'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/purgeKeys.response');

describe('#purgeKeys', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .post('/service/SU1Z0isxPaozGVKXdv0eY/purge')
    .reply(200, response.purgeKeys);

  before(async () => {
    res = await fastly.purgeKeys(['key_1', 'key_2', 'key_3']);
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
    expect(res.data).toIncludeKeys(['key_1', 'key_2', 'key_3']);
  });
});
