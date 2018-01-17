'use strict';

const expect = require('expect');
const config = require('../src/config');

describe('#mainEntryPoint', () => {
    it('property should exist', () => {
        expect(config.mainEntryPoint).toExist();
    });

    it('property should be a string', () => {
        expect(config.mainEntryPoint).toBeA('string');
    });
});
describe('#WAFTags', () => {
    it('Tags should exist', () => {
        expect(config.WAFTags).toExist();
    });
    it('property should be an array', () => {
        expect(Array.isArray(config.WAFTags)).toBe(true)
    });
});
