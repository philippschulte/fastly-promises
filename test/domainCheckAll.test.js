'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/domainCheckAll.response');

describe('#domainCheckAll', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/182/domain/check_all')
    .reply(200, response.domainCheckAll);

  before(async () => {
    res = await fastly.domainCheckAll('182');
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

  it('response body should be an array of arrays', () => {
    res.data.forEach(item => {
      expect(Array.isArray(item)).toBe(true);
    });
  });

  it('response body should have three items', () => {
    res.data.forEach(item => {
      expect(item.length).toEqual(3);
    });
  });
});
