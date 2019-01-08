/* eslint-env mocha */

'use strict';

const expect = require('expect');
const config = require('../src/config');

describe('#mainEntryPoint', () => {
  it('property should exist', () => {
    expect(config.mainEntryPoint).toExist();
  });

  it('property should be a string', () => {
    expect(typeof config.mainEntryPoint).toBe('string');
  });
});
