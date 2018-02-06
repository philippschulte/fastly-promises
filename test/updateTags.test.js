'use strict';

require('dotenv').config({path: require('path').join(__dirname, '../src/.env')});
const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/updateTags.response');

const FASTLY_API_TOKEN = process.env.FASTLY_API_TOKEN;

describe('#UpdateTags', () => {
  const fastly = fastlyPromises(FASTLY_API_TOKEN, '79CEhEeP8DKPQQGTXokV5M');
  let res;

  nock(config.mainEntryPoint)
   .post('/service/79CEhEeP8DKPQQGTXokV5M/wafs/rfjn9II8V21LSeEgyMT9x/rule_statuses', () => true)
   .times(10)
   .reply(200, response.updateTags);

  before(async () => {
    res = await fastly.updateTags("rfjn9II8V21LSeEgyMT9x", "block");
    //console.log(res)
  });

  it('response body should exist', () => {
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
      expect(item.data.data[0]).toIncludeKeys([
        'id',
        'attributes',
        'relationships'
      ]);
    });
  });

  it('responses should have status as blocked', () => {
    res.forEach(item => {
      item.data.data.forEach(subitem => {
        //console.log(subitem.attributes.status);
        expect(subitem.attributes.status).toBe("block");
      });
    });
  });

});
