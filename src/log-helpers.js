/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function toString(schema) {
  if (typeof schema === 'object') {
    return `{${Object
      .entries(schema)
      .map(([key, value]) => ` "${key}": ${toString(value)}`).join(', ')} }`;
  }
  return schema;
}

function concat(...args) {
  return args.map(toString).join('');
}

function vcl([expr]) {
  return `%{json.escape(${expr})}V`;
}

function str(expr) {
  return `"${expr}"`;
}

function time([expr]) {
  return `%{${expr}}t`;
}

function req([expr]) {
  return `"%{${expr}}i"`;
}

function res([expr]) {
  return `"%{${expr}}o"`;
}

module.exports = {
  toString, vcl, time, req, res, str, concat,
};
