module.exports.list = [
  {
    action: 'set',
    cache_condition: null,
    dst: 'http.foo',
    ignore_if_set: 0,
    name: 'testheader',
    priority: '10',
    regex: '',
    request_condition: null,
    response_condition: null,
    service_id: 'SU1Z0isxPaozGVKXdv0eY',
    src: 'client.ip',
    substitution: '',
    type: 'request',
    version: '1',
  },
];

module.exports.get = {
  action: 'set',
  cache_condition: null,
  dst: 'http.foo',
  ignore_if_set: 0,
  name: 'testheader',
  priority: '10',
  regex: '',
  request_condition: null,
  response_condition: null,
  service_id: 'SU1Z0isxPaozGVKXdv0eY',
  src: 'client.ip',
  substitution: '',
  type: 'request',
  version: '1',
};

module.exports.post = {
  action: 'set',
  cache_condition: null,
  dst: 'http.foo',
  ignore_if_set: 0,
  name: 'testheader',
  priority: '10',
  regex: '',
  request_condition: null,
  response_condition: null,
  service_id: 'SU1Z0isxPaozGVKXdv0eY',
  src: 'client.ip',
  substitution: '',
  type: 'request',
  version: '1',
};


module.exports.put = {
  action: 'append',
  cache_condition: null,
  dst: 'http.foo',
  ignore_if_set: 0,
  name: 'updatedtestheader',
  priority: '10',
  regex: '',
  request_condition: null,
  response_condition: null,
  service_id: 'SU1Z0isxPaozGVKXdv0eY',
  src: 'client.ip',
  substitution: '',
  type: 'fetch',
  version: '1',
};

module.exports.delete = {
  status: 'ok',
};
