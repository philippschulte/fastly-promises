'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/purgeIndividual.response');

describe('#purgeIndividual', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .post('/purge/www.example.com/image.jpg')
    .reply(200, response.purgeIndividual);

  before(async () => {
    res = await fastly.purgeIndividual('www.example.com/image.jpg');
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

  it('response body should have status and id properties', () => {
    expect(res.data).toIncludeKeys(['status', 'id']);
  });
});
