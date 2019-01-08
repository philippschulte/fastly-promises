# fastly-native-promises

> Native Promise based Fastly API client for Node.js

[![Known Vulnerabilities](https://snyk.io/test/github/adobe/fastly-native-promises/badge.svg?targetFile=package.json)](https://snyk.io/test/github/adobe/fastly-native-promises?targetFile=package.json)
[![codecov](https://img.shields.io/codecov/c/github/adobe/fastly-native-promises.svg)](https://codecov.io/gh/adobe/fastly-native-promises)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/fastly-native-promises.svg)](https://circleci.com/gh/adobe/fastly-native-promises)
[![GitHub license](https://img.shields.io/github/license/adobe/fastly-native-promises.svg)](https://github.com/adobe/fastly-native-promises/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/adobe/fastly-native-promises.svg)](https://github.com/adobe/fastly-native-promises/issues) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/fastly-native-promises.svg)](https://greenkeeper.io/)


## Problem

The callback based [fastly](https://www.npmjs.com/package/fastly) package is still the most used client on [NPM](https://www.npmjs.com/). However, I needed a client which allows me to perform request sequentially and parallelly without ending up in an untamable [callback hell](http://callbackhell.com/). [Philipp Schulte's fastly-native-promises](https://github.com/philippschulte/fastly-native-promises) client seemed almost perfect, except:

- it uses Axios, which is an additional dependency we'd like to avoid, especially when running inside Adobe I/O Runtime
- it has been missing features and pull requests were merged only slowly

This fork addresses the concerns above, but breaks compatibility with Browsers, so that it can only be used in Node JS environments.

## Solution

The `fastly-native-promises` package uses the promise based HTTP client [Request-Promise-Native](https://github.com/request/request-promise-native) to perform requests to the [Fastly](https://docs.fastly.com/api/) API. [Request-Promise-Native](https://github.com/request/request-promise-native) supports the native JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API and automatically transforms the data into JSON. Each `fastly-native-promises` API method returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which represents either the completion or failure of the request. 

## Table of Contents

- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Tests](#tests)
- [Contribute](#contribute)
- [License](#license)

## Security

You'll need a [Fastly API Token](https://docs.fastly.com/api/auth#tokens) in order to use the `fastly-native-promises` library. I recommend to use a token with a [global scope](https://docs.fastly.com/api/auth#access) to be able to use all `fastly-native-promises` API methods.

## Install

This is a [Node.js](https://nodejs.org/) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install fastly-native-promises
```

## Usage

```javascript
const fastly = require('fastly-native-promises');

// create one or more instances
const service_1 = fastly('token', 'service_id_1');
const serivce_2 = fastly('token', 'service_id_2');

// read/write baseURL property
console.log(service_1.request.defaults.baseURL); // https://api.fastly.com

// read/write timeout property
console.log(service_1.request.defaults.timeout); // 3000
```

### Promises

Purge all domains of the active version:

1. Get all the versions
2. Filter out the active version
3. Get all the domains for the active version
4. Purge all the domains
5. Log the status text for each purge request

```javascript
const fastly = require('fastly-native-promises');

const service = fastly('token', 'service_id');

function handler() {
  service.readVersions()
    .then(versions => {
      const active = versions.data.filter(version => version.active)[0];
      return service.readDomains(active.number);
    })
    .then(domains => {
      return Promise.all(domains.data.map(domain => service.purgeIndividual(domain.name)));
    })
    .then(purges => {
      purges.forEach(purge => console.log(purge.statusText));
    })
    .catch(e => {
      console.log('Shoot!');
    });
}
```

### Async/Await

Update `first_byte_timeout` property for every backend and service if the value is less than 5000 milliseconds:

1.  Get all the services associated with the Fastly API token
2.  Filter out the service IDs
3.  Iterate over all services synchronously
4.  Get all the versions
5.  Filter out the active version
6.  Get all the backends for the active version
7.  Filter out the affected backends
8.  Continue with the next service if there are no affected backends
9.  Clone the active version
10. Update all the affected backends parallelly
11. Activate the cloned version

```javascript
const fastly = require('fastly-native-promises');

const account = fastly('token');

async function handler() {
  try {
    const services = await account.readServices();
    const ids = services.data.map(service => service.id);

    for (const id of ids) {
      const service = fastly('token', id);
      const versions = await service.readVersions();
      const active = versions.data.filter(version => version.active)[0];
      const backends = await service.readBackends(active.number);
      const affected = backends.data.filter(backend => backend.first_byte_timeout < 5000);

      if (!affected.length) continue;

      const clone = await service.cloneVersion(active.number);
      await Promise.all(affected.map(backend => service.updateBackend(clone.data.number, backend.name, { first_byte_timeout: 5000 })));
      await service.activateVersion(clone.data.number);
    }
  } catch (e) {
    console.log('Shoot!');
  }
}
```

### Response Schema

Each `fastly-native-promises` API method returns the following response object:

```javascript
{
  // the HTTP status code from the server response
  status: 200,

  // the HTTP status message from the server response
  statusText: 'OK',

  // the headers that the server responded with
  headers: {},

  // the options that were provided to request for the request
  config: {},

  // the request that generated the response
  request: {},

  // the response that was provided by the server
  data: {}
}
```

## API

### Classes

<dl>
<dt><a href="#Fastly">Fastly</a></dt>
<dd></dd>
</dl>

### Typedefs

<dl>
<dt><a href="#Response">Response</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Snippet">Snippet</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#VCL">VCL</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Fastly"></a>

### Fastly
**Kind**: global class  

* [Fastly](#Fastly)
    * [new Fastly(token, service_id)](#new_Fastly_new)
    * [.purgeIndividual(url)](#Fastly+purgeIndividual) ⇒ <code>Promise</code>
    * [.purgeAll()](#Fastly+purgeAll) ⇒ <code>Promise</code>
    * [.purgeKey(key)](#Fastly+purgeKey) ⇒ <code>Promise</code>
    * [.purgeKeys(keys)](#Fastly+purgeKeys) ⇒ <code>Promise</code>
    * [.softPurgeIndividual(url)](#Fastly+softPurgeIndividual) ⇒ <code>Promise</code>
    * [.softPurgeKey(key)](#Fastly+softPurgeKey) ⇒ <code>Promise</code>
    * [.dataCenters()](#Fastly+dataCenters) ⇒ <code>Promise</code>
    * [.publicIpList()](#Fastly+publicIpList) ⇒ <code>Promise</code>
    * [.edgeCheck(url)](#Fastly+edgeCheck) ⇒ <code>Promise</code>
    * [.readServices()](#Fastly+readServices) ⇒ <code>Promise</code>
    * [.readVersions()](#Fastly+readVersions) ⇒ <code>Promise</code>
    * [.cloneVersion(version)](#Fastly+cloneVersion) ⇒ <code>Promise</code>
    * [.activateVersion(version)](#Fastly+activateVersion) ⇒ <code>Promise</code>
    * [.domainCheckAll(version)](#Fastly+domainCheckAll) ⇒ <code>Promise</code>
    * [.readDomains(version)](#Fastly+readDomains) ⇒ <code>Promise</code>
    * [.readBackends(version)](#Fastly+readBackends) ⇒ <code>Promise</code>
    * [.updateBackend(version, name, data)](#Fastly+updateBackend) ⇒ <code>Promise</code>
    * [.createSnippet(version, data)](#Fastly+createSnippet) ⇒ <code>Promise</code>
    * [.updateSnippet(version, name, data)](#Fastly+updateSnippet) ⇒ <code>Promise</code>
    * [.createVCL(version, data)](#Fastly+createVCL) ⇒ <code>Promise</code>
    * [.updateVCL(version, name, data)](#Fastly+updateVCL) ⇒ <code>Promise</code>
    * [.setMainVCL(version, name)](#Fastly+setMainVCL) ⇒ <code>Promise</code>

<a name="new_Fastly_new"></a>

#### new Fastly(token, service_id)
The constructor method for creating a fastly-promises instance.


| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | The Fastly API token. |
| service_id | <code>String</code> | The Fastly service ID. |

<a name="Fastly+purgeIndividual"></a>

#### fastly.purgeIndividual(url) ⇒ <code>Promise</code>
Instant Purge an individual URL.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/purge#purge_3aa1d66ee81dbfed0b03deed0fa16a9a  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL to purge. |

**Example**  
```js
instance.purgeIndividual('www.example.com')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+purgeAll"></a>

#### fastly.purgeAll() ⇒ <code>Promise</code>
Instant Purge everything from a service.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/purge#purge_bee5ed1a0cfd541e8b9f970a44718546  
**Example**  
```js
instance.purgeAll()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+purgeKey"></a>

#### fastly.purgeKey(key) ⇒ <code>Promise</code>
Instant Purge a particular service of items tagged with a Surrogate Key.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/purge#purge_d8b8e8be84c350dd92492453a3df3230  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The surrogate key to purge. |

**Example**  
```js
instance.purgeKey('key_1')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+purgeKeys"></a>

#### fastly.purgeKeys(keys) ⇒ <code>Promise</code>
Instant Purge a particular service of items tagged with Surrogate Keys in a batch.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/purge#purge_db35b293f8a724717fcf25628d713583  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>Array</code> | The array of surrogate keys to purge. |

**Example**  
```js
instance.purgeKeys(['key_2', 'key_3', 'key_4'])
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+softPurgeIndividual"></a>

#### fastly.softPurgeIndividual(url) ⇒ <code>Promise</code>
Soft Purge an individual URL.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/purge#soft_purge_0c4f56f3d68e9bed44fb8b638b78ea36  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL to soft purge. |

**Example**  
```js
instance.softPurgeIndividual('www.example.com/images')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+softPurgeKey"></a>

#### fastly.softPurgeKey(key) ⇒ <code>Promise</code>
Soft Purge a particular service of items tagged with a Surrogate Key.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/purge#soft_purge_2e4d29085640127739f8467f27a5b549  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The surrogate key to soft purge. |

**Example**  
```js
instance.softPurgeKey('key_5')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+dataCenters"></a>

#### fastly.dataCenters() ⇒ <code>Promise</code>
Get a list of all Fastly datacenters.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/tools#datacenter_1c8d3b9dd035e301155b44eae05e0554  
**Example**  
```js
instance.dataCenters()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+publicIpList"></a>

#### fastly.publicIpList() ⇒ <code>Promise</code>
Fastly's services IP ranges.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/tools#public_ip_list_ef2e9900a1c9522b58f5abed92ec785e  
**Example**  
```js
instance.publicIpList()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+edgeCheck"></a>

#### fastly.edgeCheck(url) ⇒ <code>Promise</code>
Retrieve headers and MD5 hash of the content for a particular URL from each Fastly edge server.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/tools#content_4d2d4548b29c7661e17ebe7098872d6d  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Full URL (host and path) to check on all nodes. If protocol is omitted,    http will be assumed. |

**Example**  
```js
instance.edgeCheck('api.example.com')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+readServices"></a>

#### fastly.readServices() ⇒ <code>Promise</code>
List all services.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/config#service_74d98f7e5d018256e44d1cf820388ef8  
**Example**  
```js
instance.readServices()
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+readVersions"></a>

#### fastly.readVersions() ⇒ <code>Promise</code>
List the versions for a particular service.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/config#version_dfde9093f4eb0aa2497bbfd1d9415987  
**Example**  
```js
instance.readVersions()
   .then(res => {
     const active = res.data.filter(version => version.active);
     console.log(active);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+cloneVersion"></a>

#### fastly.cloneVersion(version) ⇒ <code>Promise</code>
Clone the current configuration into a new version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/config#version_7f4937d0663a27fbb765820d4c76c709  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The version to be cloned. |

**Example**  
```js
instance.cloneVersion('45')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+activateVersion"></a>

#### fastly.activateVersion(version) ⇒ <code>Promise</code>
Activate the current version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/config#version_0b79ae1ba6aee61d64cc4d43fed1e0d5  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The version to be activated. |

**Example**  
```js
instance.activateVersion('23')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+domainCheckAll"></a>

#### fastly.domainCheckAll(version) ⇒ <code>Promise</code>
Checks the status of all domains for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/config#domain_e33a599694c3316f00b6b8d53a2db7d9  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |

**Example**  
```js
instance.domainCheckAll('182')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+readDomains"></a>

#### fastly.readDomains(version) ⇒ <code>Promise</code>
List all the domains for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/config#domain_6d340186666771f022ca20f81609d03d  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |

**Example**  
```js
instance.readDomains('182')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+readBackends"></a>

#### fastly.readBackends(version) ⇒ <code>Promise</code>
List all backends for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/config#backend_fb0e875c9a7669f071cbf89ca32c7f69  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |

**Example**  
```js
instance.readBackends('12')
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+updateBackend"></a>

#### fastly.updateBackend(version, name, data) ⇒ <code>Promise</code>
Update the backend for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/config#backend_fb3b3529417c70f57458644f7aec652e  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |
| name | <code>String</code> | The name of the backend. |
| data | <code>Object</code> | The data to be sent as the request body. |

**Example**  
```js
instance.updateBackend('34', 'slow-server', { name: 'fast-server' })
   .then(res => {
     console.log(res.data);
   })
   .catch(err => {
     console.log(err.message);
   });
```
<a name="Fastly+createSnippet"></a>

#### fastly.createSnippet(version, data) ⇒ <code>Promise</code>
Create a snippet for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**See**: https://docs.fastly.com/api/config#snippet_41e0e11c662d4d56adada215e707f30d  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |
| data | [<code>Snippet</code>](#Snippet) | The data to be sent as the request body. |

**Example**  
```js
instance.createSnippet('36', {
    name: 'your_snippet',
    priority: 10,
    dynamic: 1,
    content: 'table referer_blacklist {}',
    type: 'init'
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err.message);
  });
```
<a name="Fastly+updateSnippet"></a>

#### fastly.updateSnippet(version, name, data) ⇒ <code>Promise</code>
Update a VCL snippet for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |
| name | <code>String</code> | The name of the snippet to update. |
| data | [<code>Snippet</code>](#Snippet) | The data to be sent as the request body. |

<a name="Fastly+createVCL"></a>

#### fastly.createVCL(version, data) ⇒ <code>Promise</code>
Create custom VCL for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/config#vcl_7ade6ab5926b903b6acf3335a85060cc  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |
| data | [<code>VCL</code>](#VCL) | The data to be sent as the request body. |

<a name="Fastly+updateVCL"></a>

#### fastly.updateVCL(version, name, data) ⇒ <code>Promise</code>
Update custom VCL for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/config#vcl_0971365908e17086751c5ef2a8053087  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |
| name | <code>String</code> | The name of the VCL to update. |
| data | [<code>VCL</code>](#VCL) | The data to be sent as the request body. |

<a name="Fastly+setMainVCL"></a>

#### fastly.setMainVCL(version, name) ⇒ <code>Promise</code>
Define a custom VCL to be the main VCL for a particular service and version.

**Kind**: instance method of [<code>Fastly</code>](#Fastly)  
**Returns**: <code>Promise</code> - The response object representing the completion or failure.  
**Fulfil**: [<code>Response</code>](#Response)  
**See**: https://docs.fastly.com/api/config#vcl_5576c38e7652f5a7261bfcad41c0faf1  

| Param | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | The current version of a service. |
| name | <code>String</code> | The name of the VCL to declare main. |

<a name="Response"></a>

### Response : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>Number</code> | The HTTP status code from the server response, e.g. 200. |
| statusText | <code>String</code> | The HTTP status text, e.g. 'OK' |
| headers | <code>Object</code> | The HTTP headers of the reponse |
| config | <code>Object</code> | The original request configuration used for the HTTP client |
| request | <code>Object</code> | the HTTP request |
| data | <code>Object</code> | the parsed body of the HTTP response |

<a name="Snippet"></a>

### Snippet : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the snippet, as visible in the Fastly UI |
| content | <code>String</code> | The VCL body of the snippet |

<a name="VCL"></a>

### VCL : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the VCL, as visible in the Fastly UI. Note: setting the name to 'main' here won't make it the main VCL, unless you also call `setMainVCL`. |
| content | <code>String</code> | The VCL body of the custom VCL |


## Tests

To run the test suite, first install the dependencies, then run the [`npm test` command](https://docs.npmjs.com/cli/test):

```bash
$ npm install
$ npm test
```

## Contribute

PRs accepted. I am open to suggestions in improving this library. Commit by:

```bash
$ npm run commit
```

## License

Licensed under the [MIT License](LICENSE) © 2017 Philipp Schulte
