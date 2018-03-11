'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/createSnippet.response');

describe('#createSnippet', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');
  let res;

  nock(config.mainEntryPoint)
    .post('/service/SU1Z0isxPaozGVKXdv0eY/version/1/snippet')
    .reply(200, response.createSnippet);

  before(async () => {
    res = await fastly.createSnippet('1', { name: 'my_snippet', priority: '10', dynamic: '1', type: 'fetch' });
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

  it('response body properties should be created', () => {
    expect(res.data.name).toBe('my_snippet');
    expect(res.data.priority).toBe('10');
    expect(res.data.dynamic).toBe('1');
    expect(res.data.type).toBe('fetch');
  });

  it('response body should contain all properties', () => {
    expect(res.data).toIncludeKeys([
      'name',
      'priority',
      'dynamic',
      'content',
      'type',
      'service_id',
      'version',
      'deleted_at',
      'created_at',
      'updated_at',
      'id'      
    ]);
  });
});
