# fastly-promises

Promise based Fastly API client for Node.js

## Table of Contents

- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Security

You'll need a [Fastly API Token](https://docs.fastly.com/api/auth#tokens) in order to use the `fastly-promises` library. I recommend to use a token with a [global](https://docs.fastly.com/api/auth#access) scope to be able to use all `fastly-promises` API methods.

## Install

```
npm install fastly-promises
```

## Usage

```javascript
const fastly = require('fastly-promises');

// create one or more instances
const service_1('token', 'service_id_1');
const serivce_2('token', 'service_id_2');

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
function process() {
  Promise.all([
    instance.purgeIndividual('https://docs.fastly.com/api/'),
    instance.purgeAll(),
    instance.purgeKey('key_1'),
    instance.purgeKeys(['key_2', 'key_3', 'key_4']),
    instance.softPurgeIndividual('https://docs.fastly.com/api/purge#purge'),
    instance.softPurgeKey('key_5'),
    instance.dataCenters(),
    instance.publicIpList(),
    instance.edgeCheck('https://docs.fastly.com/api/')
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
async function process() {
  try {
    const responses = await Promise.all([
      instance.purgeIndividual('https://docs.fastly.com/api/'),
      instance.purgeAll(),
      instance.purgeKey('key_1'),
      instance.purgeKeys(['key_2', 'key_3', 'key_4']),
      instance.softPurgeIndividual('https://docs.fastly.com/api/purge#purge'),
      instance.softPurgeKey('key_5'),
      instance.dataCenters(),
      instance.publicIpList(),
      instance.edgeCheck('https://docs.fastly.com/api/')
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

- [instance.request.defaults.baseURL](#baseURL)
- [instance.request.defaults.timeout](#timeout)
- [instance.purgeIndividual(url)](#purgeIndividual(url))
- [instance.purgeAll()](#purgeAll())
- [instance.purgeKey(key)](#purgeKey(key))
- [instance.purgeKeys(keys)](#purgeKeys(keys))
- [instance.softPurgeIndividual(url)](#softPurgeIndividual(url))
- [instance.softPurgeKey(key)](#softPurgeKey(key))
- [instance.dataCenters()](#dataCenters())
- [instance.publicIpList()](#publicIpList())
- [instance.edgeCheck(url)](#edgeCheck(url))

### baseURL

*The main entry point for the API is https://api.fastly.com/.*

**Kind**: Property
**Return**: {String}

### timeout

*The number of milliseconds before the request times out.*

**Kind**: Property
**Return**: {Number}

### purgeIndividual(url)

*Instant Purge an individual URL.*

**Kind**: Method
**Param**: url {String}
**Return**: {Promise}

### purgeAll()

*Instant Purge everything from a service.*

**Kind**: Method
**Return**: {Promise}

### purgeKey(key)

*Instant Purge a particular service of items tagged with a Surrogate Key.*

**Kind**: Method
**Param**: key {String}
**Return**: {Promise}

### purgeKeys(keys)

*Instant Purge a particular service of items tagged with Surrogate Keys in a batch.*

**Kind**: Method
**Param**: keys {Array}
**Return**: {Promise}

### softPurgeIndividual(url)

*Soft Purge an individual URL.*

**Kind**: Method
**Param**: url {String}
**Return**: {Promise}

### softPurgeKey(key)

*Soft Purge a particular service of items tagged with a Surrogate Key.*

**Kind**: Method
**Param**: key {String}
**Return**: {Promise}

### dataCenters()

*Get a list of all Fastly datacenters.*

**Kind**: Method
**Return**: {Promise}

### publicIpList()

*Fastly's services IP ranges.*

**Kind**: Method
**Return**: {Promise}

### edgeCheck(url)

*Retrieve headers and MD5 hash of the content for a particular URL from each Fastly edge server.*

**Kind**: Method
**Param**: url {String}
**Return**: {Promise}

## Maintainers

[@philippschulte](https://github.com/philippschulte)

## Contribute

PRs accepted.

## License

MIT © 2017 Philipp Schulte
