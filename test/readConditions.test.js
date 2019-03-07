'use strict';

/* eslint-env mocha */

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/condition.response');

describe('#readConditions', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .get('/service/SU1Z0isxPaozGVKXdv0eY/version/1/condition')
    .reply(200, response.list);

  before(async () => {
    res = await fastly.readConditions(1);
  });

  it('response should be a status 200', () => {
    expect(res.status).toBe(200);
  });

  it('response body should exist', () => {
    expect(res.data).toBeTruthy();
  });

  it('response body should be an object', () => {
    expect(Array.isArray(res.data)).toBeTruthy();
  });

  it('response body properties should be created', () => {
    expect(res.data[0].name).toBe('testcondition');
  });

  it('response body should contain all properties', () => {
    res.data.forEach((dat) => {
      [
        'comment',
        'name',
        'priority',
        'service_id',
        'statement',
        'type',
        'version',
      ].forEach((e) => {
        expect(Object.keys(dat)).toContain(e);
      });
    });
  });
});
