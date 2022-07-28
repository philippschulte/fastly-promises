'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/readService.response');

describe('#readServices', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY')
    .reply(200, response.readService);

  before(async () => {
    res = await fastly.readService();
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

  it('response versions value should be an array', () => {
    expect(Array.isArray(res.data.versions)).toBe(true);
  });

  it('response body should contain all properties', () => {
    expect(res.data).toIncludeKeys([
      'comment',
      'customer_id',
      'id',
      'name',
      'version',
      'versions'
    ]);
  });
});
