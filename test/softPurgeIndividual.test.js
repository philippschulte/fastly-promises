'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/softPurgeIndividual.response');

describe('#softPurgeIndividual', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .post('/purge/www.example.com/image.jpg')
    .reply(200, response.softPurgeIndividual);

  before(async () => {
    res = await fastly.softPurgeIndividual('www.example.com/image.jpg');
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toExist();
  });

  it('response body should be an object', () => {
    expect(typeof res.data).toBe('object');
  });

  it('response body should contain all properties', () => {
    expect(res.data).toIncludeKeys(['status', 'id']);
  });
});
