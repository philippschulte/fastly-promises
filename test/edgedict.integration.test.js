/* eslint-env mocha */

const { condit } = require('@adobe/helix-testutils');
const nock = require('nock');
const assert = require('assert');
const { AssertionError } = require('assert');
const f = require('../src/index');

describe('#integration edge dictionary updates', () => {
  let fastly;

  before(() => {
    nock.restore();

    fastly = f(process.env.FASTLY_AUTH, process.env.FASTLY_SERVICE_ID);
  });

  after(() => {
    nock.activate();
  });

  condit('Create Edge Dictionary', condit.hasenvs(['FASTLY_AUTH', 'FASTLY_SERVICE_ID']), async () => {
    await fastly.transact(async (version) => {
      await fastly.writeDictionary(version, 'test_dict', {
        name: 'test_dict',
      });
    }, false);
  }).timeout(5000);

  condit('Set Edge Dictionary Value', condit.hasenvs(['FASTLY_AUTH', 'FASTLY_SERVICE_ID']), async () => {
    const version = await fastly.getVersion(undefined, 'current');
    await fastly.writeDictItem(version, 'test_dict', 'some_key', 'some_value');
    const val = await fastly.readDictItem(version, 'test_dict', 'some_key');
    assert.deepEqual(val.data.item_value, 'some_value');
  }).timeout(5000);

  condit('Update Edge Dictionary Value', condit.hasenvs(['FASTLY_AUTH', 'FASTLY_SERVICE_ID']), async () => {
    const version = await fastly.getVersion(undefined, 'current');
    await fastly.writeDictItem(version, 'test_dict', 'some_key', 'some_old_value');
    await fastly.writeDictItem(version, 'test_dict', 'some_key', 'some_new_value');
    const val = await fastly.readDictItem(version, 'test_dict', 'some_key');
    assert.deepEqual(val.data.item_value, 'some_new_value');
  }).timeout(10000);

  condit('Delete Edge Dictionary Value', condit.hasenvs(['FASTLY_AUTH', 'FASTLY_SERVICE_ID']), async () => {
    const version = await fastly.getVersion(undefined, 'current');
    await fastly.writeDictItem(version, 'test_dict', 'some_new_key', 'some_old_value');
    await fastly.writeDictItem(version, 'test_dict', 'some_new_key', undefined);
    try {
      await fastly.readDictItem(version, 'test_dict', 'some_new_key');
      assert.fail('This should throw an error');
    } catch (e) {
      if (e instanceof AssertionError) {
        throw e;
      }
      assert.equal(e.status, 404);
    }
  }).timeout(10000);
});
