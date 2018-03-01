'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/getWafRulesByTags.response');

describe('#getWafRulesByTags', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', '79CEhEeP8DKPQQGTXokV5M');
  let res;

  nock(config.mainEntryPoint)
    //.log(console.log)
    .get('/service/79CEhEeP8DKPQQGTXokV5M/wafs/rfjn9II8V21LSeEgyMT9x/rule_statuses?filter[rule][tags][name]=language-css&page[size]=200&page[number]=1')
    .reply(200, response.getWafRulesByTags);

  before(async () => {
    res = await fastly.getWafRulesByTags('rfjn9II8V21LSeEgyMT9x','language-css','1');
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

  it('response should contain WAF ID rfjn9II8V21LSeEgyMT9x-2077876', () => {
    expect(res.data.data[0].id).toBe("rfjn9II8V21LSeEgyMT9x-2077876");
  });

  it('response should only be 1 page long', () => {
    expect(res.data.meta.total_pages).toBe(1);
  });

});