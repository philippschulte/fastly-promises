'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/index.response');

describe('index.js', () => {
  const fastly = fastlyPromises('923b6bd5266a7f932e41962755bd4254', 'SU1Z0isxPaozGVKXdv0eY');

  describe('#constructor', () => {
    it('instance should exist', () => {
      expect(fastly).toExist();
    });

    it('instance should have service_id and request properties', () => {
      expect(fastly).toIncludeKeys(['service_id', 'request']);
    });
  });

  describe('#purgeIndividual', () => {
    let resp;

    nock(config.mainEntryPoint)
      .post('/purge/www.example.com/image.jpg')
      .reply(200, response.purgeIndividual);

    before(async () => {
      resp = await fastly.purgeIndividual('www.example.com/image.jpg');
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an object', () => {
      expect(resp.data).toBeA('object');
    });

    it('response body should have status and id properties', () => {
      expect(resp.data).toIncludeKeys(['status', 'id']);
      expect(resp.data).toEqual(response.purgeIndividual);
    });
  });

  describe('#purgeAll', () => {
    let resp;

    nock(config.mainEntryPoint)
      .post('/service/SU1Z0isxPaozGVKXdv0eY/purge_all')
      .reply(200, response.purgeAll);

    before(async () => {
      resp = await fastly.purgeAll();
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an object', () => {
      expect(resp.data).toBeA('object');
    });

    it('response body should have status property', () => {
      expect(resp.data).toIncludeKeys(['status']);
      expect(resp.data).toEqual(response.purgeAll);
    });
  });

  describe('#purgeKey', () => {
    let resp;

    nock(config.mainEntryPoint)
      .post('/service/SU1Z0isxPaozGVKXdv0eY/purge/key_1')
      .reply(200, response.purgeKey);

    before(async () => {
      resp = await fastly.purgeKey('key_1');
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an object', () => {
      expect(resp.data).toBeA('object');
    });

    it('response body should have status and id properties', () => {
      expect(resp.data).toIncludeKeys(['status', 'id']);
      expect(resp.data).toEqual(response.purgeKey);
    });
  });

  describe('#purgeKeys', () => {
    let resp;

    nock(config.mainEntryPoint)
      .post('/service/SU1Z0isxPaozGVKXdv0eY/purge')
      .reply(200, response.purgeKeys);

    before(async () => {
      resp = await fastly.purgeKeys(['key_1', 'key_2', 'key_3']);
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an object', () => {
      expect(resp.data).toBeA('object');
    });

    it('response body should have surrogate keys property', () => {
      expect(resp.data).toIncludeKeys(['key_1', 'key_2', 'key_3']);
      expect(resp.data).toEqual(response.purgeKeys);
    });
  });

  describe('#softPurgeIndividual', () => {
    let resp;

    nock(config.mainEntryPoint)
      .post('/purge/www.example.com/image.jpg')
      .reply(200, response.softPurgeIndividual);

    before(async () => {
      resp = await fastly.softPurgeIndividual('www.example.com/image.jpg');
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an object', () => {
      expect(resp.data).toBeA('object');
    });

    it('response body should have status and id properties', () => {
      expect(resp.data).toIncludeKeys(['status', 'id']);
      expect(resp.data).toEqual(response.softPurgeIndividual);
    });
  });

  describe('#softPurgeKey', () => {
    let resp;

    nock(config.mainEntryPoint)
      .post('/service/SU1Z0isxPaozGVKXdv0eY/purge/key_1')
      .reply(200, response.softPurgeKey);

    before(async () => {
      resp = await fastly.softPurgeKey('key_1');
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an object', () => {
      expect(resp.data).toBeA('object');
    });

    it('response body should have status and id properties', () => {
      expect(resp.data).toIncludeKeys(['status', 'id']);
      expect(resp.data).toEqual(response.softPurgeKey);
    });
  });

  describe('#dataCenters', () => {
    let resp;

    nock(config.mainEntryPoint)
      .get('/datacenters')
      .reply(200, response.dataCenters);

    before(async () => {
      resp = await fastly.dataCenters();
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an array', () => {
      expect(Array.isArray(resp.data)).toBe(true);
    });

    it('response body should be an array of objects', () => {
      expect(resp.data[0]).toBeA('object');
    });

    it('response body should have code, name, group, coordinates, and shield properties', () => {
      expect(resp.data[0]).toIncludeKeys(['code', 'name', 'group', 'coordinates', 'shield']);
      expect(resp.data[0]).toEqual(response.dataCenters[0]);
    });
  });

  describe('#publicIpList', () => {
    let resp;

    nock(config.mainEntryPoint)
      .get('/public-ip-list')
      .reply(200, response.publicIpList);

    before(async () => {
      resp = await fastly.publicIpList();
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an object', () => {
      expect(resp.data).toBeA('object');
    });

    it('response body should have addresses property', () => {
      expect(resp.data).toIncludeKeys(['addresses']);
      expect(resp.data).toEqual(response.publicIpList);
    });
  });

  describe('#edgeCheck', () => {
    let resp;

    nock(config.mainEntryPoint)
      .get('/content/edge_check?url=www.example.com/foo/bar')
      .reply(200, response.edgeCheck);

    before(async () => {
      resp = await fastly.edgeCheck('www.example.com/foo/bar');
    });

    it('response body should exist', () => {
      expect(resp.data).toExist();
    });

    it('response should be a status 200', () => {
      expect(resp.status).toBe(200);
    });

    it('response body should be an array', () => {
      expect(Array.isArray(resp.data)).toBe(true);
    });

    it('response body should be an array of objects', () => {
      expect(resp.data[0]).toBeA('object');
    });

    it('response body should have hash, request, response, response_time, and server properties', () => {
      expect(resp.data[0]).toIncludeKeys(['hash', 'request', 'response', 'response_time', 'server']);
      expect(resp.data[0]).toEqual(response.edgeCheck[0]);
    });
  });
});
