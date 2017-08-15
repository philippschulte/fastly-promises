'use strict';

module.exports = {
  purgeIndividual: {
    'status': 'ok',
    'id': '227-1493370174-20086635'
  },
  purgeAll: {
    'status': 'ok'
  },
  purgeKey: {
    'status': 'ok',
    'id': '3646-1492515326-19169960'
  },
  purgeKeys: {
    'key_1': '3646-1492515326-19170046',
    'key_2': '3646-1492515326-19170047',
    'key_3': '3646-1492515326-19170048'
  },
  softPurgeIndividual: {
    'status': 'ok',
    'id': '3646-1492515326-19170160'
  },
  softPurgeKey: {
    'status': 'ok',
    'id': '3646-1492515326-19170245'
  },
  dataCenters: [
    {
      'code': 'AMS',
      'name': 'Amsterdam',
      'group': 'Europe',
      'coordinates': {
          'x': 129,
          'y': 42,
          'latitude': 52.308613,
          'longitude': 4.763889
      },
      'shield': 'amsterdam-nl'
    }
  ],
  publicIpList: {
    'addresses': [
      '23.235.32.0/20',
      '43.249.72.0/22',
      '103.244.50.0/24',
      '103.245.222.0/23',
      '103.245.224.0/24',
      '104.156.80.0/20',
      '151.101.0.0/16',
      '157.52.64.0/18',
      '172.111.64.0/18',
      '185.31.16.0/22',
      '199.27.72.0/21',
      '199.232.0.0/16',
      '202.21.128.11/32',
      '202.21.128.12/32',
      '203.57.145.11/32',
      '203.57.145.12/32'
    ]
  },
  edgeCheck: [
    {
      'hash': 'c6447943be2cff04787d9367ddd58fa0',
      'request': {
        'headers': {
          'Host': 'www.example.com/foo/bar',
          'User-Agent': 'Fastly/cache-check'
        },
        'method': null,
        'url': null
      },
      'response': {
        'headers': {
          'Accept-Ranges': 'bytes',
          'Age': '0',
          'Connection': 'keep-alive',
          'Content-Length': '154189',
          'Content-Type': 'text/html; charset=UTF-8',
          'Date': 'Mon, 06 Jun 2016 15:26:05 GMT',
          'ETag': 'W/\'76cdf069e25c5e32bb8005982d3f8e0d\'',
          'Expires': 'Thu, 01 Jan 1970 00:00:00 GMT',
          'Set-Cookie': [
            'crumb=EUmnHJvt3XCJP2hZmlzWCvVNzOHq5Wb1;Path=/',
            'SS_MID=7b22de59-a0ca-4d2f-aea2-dbe337990ba3ip466npy;Path=/;Domain=.example.com;Expires=Thu, 04-Jun-2026 15:26:05 GMT'
          ],
          'Vary': 'Accept-Encoding, User-Agent',
          'Via': '1.1 varnish',
          'X-Cache': 'MISS',
          'X-Cache-Hits': '0',
          'X-ContextId': 'P0IlaNKm/roP4a7jq',
          'X-PC-AppVer': '7951',
          'X-PC-Date': 'Mon, 06 Jun 2016 15:26:04 GMT',
          'X-PC-Hit': 'true',
          'X-PC-Host': '127.0.0.1',
          'X-PC-Key': 'OZs6DMRDuX2Tj7xXJlbWIZgI2cI-example',
          'X-Served-By': 'cache-sjc3120-SJC',
          'X-ServedBy': 'web029',
          'X-Timer': 'S1465226764.194256,VS0,VE1054',
          'X-Via': '1.1 echo007'
        },
        'status': 200
      },
      'response_time': 2.604431,
      'server': 'cache-sjc3120'
    }
  ],
  versionList: [
    {
      'active': true,
      'comment': '',
      'created_at': '2016-05-01T19:40:49+00:00',
      'deleted_at': null,
      'deployed': null,
      'locked': true,
      'number': 1,
      'service_id': 'SU1Z0isxPaozGVKXdv0eY',
      'staging': null,
      'testing': null,
      'updated_at': '2016-05-09T16:19:09+00:00'
    }
  ]
};
