'use strict';

require('dotenv').config({path: require('path').join(__dirname, '../src/.env')});
const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const fastlyPromises = require('../src/index');
const response = require('./response/getWAFs.response');

const FASTLY_API_TOKEN = process.env.FASTLY_API_TOKEN;

describe('#getWAFs', () => {
    const fastly = fastlyPromises(FASTLY_API_TOKEN, '79CEhEeP8DKPQQGiXokV5M');
    let res;

    nock(config.mainEntryPoint)
        .get('/service/79CEhEeP8DKPQQGiXokV5M/version/9/wafs')
        .reply(200, response.getWAFs);

    before(async () => {
        res = await fastly.getWAFs('9');
    });

    it('response should be a status 200', () => {
        expect(res.status).toBe(200);
        //console.log(res.data.data)
    });

    it('response body should exist', () => {
        expect(res.data).toExist();
    });

    it('response body should be an array', () => {
        expect(Array.isArray(res.data.data)).toBe(true);
    });

    it('response should contain WAF ID rfjm9II8V21LSeEgyMi9x', () => {
        expect(res.data.data[0].id).toBe("rfjm9II8V21LSeEgyMi9x");
    });

    it('response body should contain properties', () => {
        expect(res.data).toIncludeKeys(['links','meta']);
    });

});
