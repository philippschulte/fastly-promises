'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/getWafRules.response');

describe('#getWafRules', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', "79CEhEeP8DKPQQGiXokV5M");
  let res;

  nock(config.mainEntryPoint)
   .log(console.log)
   .get('/service/79CEhEeP8DKPQQGiXokV5M/wafs/rfjm9II8V21LSeEgyMi9x/rule_statuses?filter[status]=log&page[size]=200&page[number]=1')
   .reply(200, response.getWafRules);

  before(async () => {
    res = await fastly.getWafRules('rfjm9II8V21LSeEgyMi9x', 'log', '1');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toExist();
  });

  it('response body should be an array', () => {
    expect(Array.isArray(res.data.data)).toBe(true);
  });

  it('response body should contain properties', () => {
    expect(res.data).toIncludeKeys(['data', 'links', 'meta']);
  });

  it('response should contain a status of log', () => {
    expect(res.data.data[0].attributes.status).toBe("log");
  });

  it('response should only be 1 page long', () => {
    expect(res.data.meta.total_pages).toBe(1);
  });

});