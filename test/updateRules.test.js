'use strict';

require('dotenv').config({path: require('path').join(__dirname, '../src/.env')});
const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/updateRules.response');

const FASTLY_API_TOKEN = process.env.FASTLY_API_TOKEN;

describe('#UpdateRules', () => {
  const fastly = fastlyPromises(FASTLY_API_TOKEN, '79CEhEeP8DKPQQGTXokV5M');
  let res;

  nock(config.mainEntryPoint)
    .patch('/service/79CEhEeP8DKPQQGTXokV5M/wafs/rfjn9II8V21LSeEgyMT9x/rules/2071357/rule_status', () => true)
    .times(2)
    .reply(200, response.updateRules);

  before(async () => {
    res = await fastly.updateRules("rfjn9II8V21LSeEgyMT9x", "disabled", ["2071357","2071357"]);
    //console.log(res)
  });

  it('response body should exist', () => {
    //console.log(res);
    expect(res).toExist();
  });

  it('response should be an array of objects', () => {
    res.forEach(item => {
      expect(item).toBeA('object');
    });
  });

  it('all responses should have a status 200', () => {
    res.forEach(item => {
      expect(item.status).toBe(200);
    });
  });

  it('responses should have "data" field containing properties', () => {
    res.forEach(item => {
      //console.log(item.data.data)
      expect(item.data.data).toIncludeKeys([
        'id',
        'attributes',
        'type',
        'relationships'
      ]);
    });
  });

  it('responses should have status as disabled', () => {
    res.forEach(item => {
      expect(item.data.data.id).toBe("rfjn9II8V21LSeEgyMT9x-2071357");
      expect(item.data.data.attributes.status).toBe("disabled");
    });
  });
});
