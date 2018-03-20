'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/deployChangesForWAF.response.js');

describe('#deployChangesForWAF', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', '79CEhEeP8DKPQQGiXokV5M');
  let res;

  nock(config.mainEntryPoint)
   .patch('/service/79CEhEeP8DKPQQGiXokV5M/wafs/rfjn9II8V21LSeEgyMT9x/ruleset')
   .reply(200, response.deployChangesForWAF);

  before(async () => {
    res = await fastly.deployChangesForWAF('rfjn9II8V21LSeEgyMT9x');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toExist();
  });

  it('response should contain WAF ID rfjn9II8V21LSeEgyMT9x', () => {
    console.log(res.data)
    expect(res.data.data.id).toBe("rfjn9II8V21LSeEgyMT9x");
  });

  it('response should contain type "ruleset"', () => {
    expect(res.data.data.type).toBe("ruleset");
  });

});