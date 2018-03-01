'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/getWAFs.response');

describe('#getWAFs', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', '79CEhEeP8DKPQQGTXokV5M');
  let res;

  nock(config.mainEntryPoint)
   .get('/service/79CEhEeP8DKPQQGTXokV5M/version/9/wafs')
   .reply(200, response.getWAFs);

  before(async () => {
    res = await fastly.getWAFs('9');
    //console.log(res.data)
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

  it('response should contain WAF ID rfjn9II8V21LSeEgyMT9x', () => {
    expect(res.data.data[0].id).toBe("rfjn9II8V21LSeEgyMT9x");
  });

  it('response body should contain properties', () => {
    expect(res.data).toIncludeKeys(['links', 'meta']);
  });

});
