# fastly-promises

Promise based Fastly API client for Node.js

## Table of Contents

- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Tests](#tests)
- [Contribute](#contribute)
- [License](#license)

## Security

You'll need a [Fastly API Token](https://docs.fastly.com/api/auth#tokens) in order to use the `fastly-promises` library. I recommend to use a token with a [global scope](https://docs.fastly.com/api/auth#access) to be able to use all `fastly-promises` API methods.

## Install

```
$ npm install fastly-promises
```

## Usage

```javascript
const fastly = require('fastly-promises');

// create one or more instances
const service_1 = fastly('token', 'service_id_1');
const serivce_2 = fastly('token', 'service_id_2');

// read/write baseURL property
console.log(service_1.request.defaults.baseURL); // https://api.fastly.com

// read/write timeout property
console.log(service_1.request.defaults.timeout); // 3000
```

### Response Schema

```javascript
// each fastly-promises api method responses with the following object
{
  // the HTTP status code from the server response
  status: 200,

  // the HTTP status message from the server response
  statusText: 'OK',

  // the headers that the server responded with
  headers: {},

  // the config that was provided to axios for the request
  config: {},

  // the request that generated the response
  request: {},

  // the response that was provided by the server
  data: {}
}
```

### Promises

```javascript
function handler() {
  Promise.all([
    service_1.purgeIndividual('https://docs.fastly.com/api/'),
    service_1.purgeAll(),
    service_1.purgeKey('key_1'),
    service_1.purgeKeys(['key_2', 'key_3', 'key_4']),
    service_1.softPurgeIndividual('https://docs.fastly.com/api/purge#purge'),
    service_1.softPurgeKey('key_5'),
    service_1.dataCenters(),
    service_1.publicIpList(),
    service_1.edgeCheck('https://docs.fastly.com/api/')
  ])
  .then(responses => {
    responses.forEach(response => {
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
      console.log(response.request);
      console.log(response.data);
    });
  })
  .catch(e => {
    console.log('Shoot!');
  });
}
```

### Async/Await

```javascript
async function handler() {
  try {
    const responses = await Promise.all([
      serivce_2.purgeIndividual('https://docs.fastly.com/api/'),
      serivce_2.purgeAll(),
      serivce_2.purgeKey('key_1'),
      serivce_2.purgeKeys(['key_2', 'key_3', 'key_4']),
      serivce_2.softPurgeIndividual('https://docs.fastly.com/api/purge#purge'),
      serivce_2.softPurgeKey('key_5'),
      serivce_2.dataCenters(),
      serivce_2.publicIpList(),
      serivce_2.edgeCheck('https://docs.fastly.com/api/')
    ]);

    responses.forEach(response => {
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
      console.log(response.request);
      console.log(response.data);
    });
  } catch (e) {
    console.log('Shoot!');
  }
}
```

## API

- [constructor(token, service_id)](#constructor)
  - [.request.defaults.baseURL](#baseURL)
  - [.request.defaults.timeout](#timeout)
  - [.purgeIndividual(url)](#purgeIndividual)
  - [.purgeAll()](#purgeAll)
  - [.purgeKey(key)](#purgeKey)
  - [.purgeKeys(keys)](#purgeKeys)
  - [.softPurgeIndividual(url)](#softPurgeIndividual)
  - [.softPurgeKey(key)](#softPurgeKey)
  - [.dataCenters()](#dataCenters)
  - [.publicIpList()](#publicIpList)
  - [.edgeCheck(url)](#edgeCheck)

<a name="constructor"></a>

### constructor(token, service_id)

*Method for creating and initializing a new fastly-promises instance.*

**Kind**: method  
**Param**: token `string`  
**Param**: service_id `string`  
**Return**: instance `object`

<a name="baseURL"></a>

### .request.defaults.baseURL

*The main entry point for the Fastly API.*

**Kind**: property  
**Return**: url `string`

<a name="timeout"></a>

### .request.defaults.timeout

*The number of milliseconds before the request times out.*

**Kind**: property  
**Return**: milliseconds `number`

<a name="purgeIndividual"></a>

### .purgeIndividual(url)

*Instant Purge an individual URL.*

**Kind**: method  
**Param**: url `string`  
**Return**: schema `promise`

<a name="purgeAll"></a>

### .purgeAll()

*Instant Purge everything from a service.*

**Kind**: method  
**Return**: schema `promise`

<a name="purgeKey"></a>

### .purgeKey(key)

*Instant Purge a particular service of items tagged with a Surrogate Key.*

**Kind**: method  
**Param**: key `string`  
**Return**: schema `promise`

<a name="purgeKeys"></a>

### .purgeKeys(keys)

*Instant Purge a particular service of items tagged with Surrogate Keys in a batch.*

**Kind**: method  
**Param**: keys `array`  
**Return**: schema `promise`

<a name="softPurgeIndividual"></a>

### .softPurgeIndividual(url)

*Soft Purge an individual URL.*

**Kind**: method  
**Param**: url `string`  
**Return**: schema `promise`

<a name="softPurgeKey"></a>

### .softPurgeKey(key)

*Soft Purge a particular service of items tagged with a Surrogate Key.*

**Kind**: method  
**Param**: key `string`  
**Return**: schema `promise`

<a name="dataCenters"></a>

### .dataCenters()

*Get a list of all Fastly datacenters.*

**Kind**: method  
**Return**: schema `promise`

<a name="publicIpList"></a>

### .publicIpList()

*Fastly's services IP ranges.*

**Kind**: method  
**Return**: schema `promise`

<a name="edgeCheck"></a>

### .edgeCheck(url)

*Retrieve headers and MD5 hash of the content for a particular URL from each Fastly edge server.*

**Kind**: method  
**Param**: url `string`  
**Return**: schema `promise`

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```
$ npm install
$ npm test
```

## Contribute

PRs accepted.

## License

MIT © 2017 Philipp Schulte
