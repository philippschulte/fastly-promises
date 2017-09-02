'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/publicIpList.response');

describe('#publicIpList', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/public-ip-list')
    .reply(200, response.publicIpList);

  before(async () => {
    res = await fastly.publicIpList();
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

  it('response body should have addresses property', () => {
    expect(res.data).toIncludeKeys(['addresses']);
  });
});
