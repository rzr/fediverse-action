// -*- mode: js; js-indent-level:2;  -*-
/* Copyright 2017-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var console = require('console');
var http = require('https');
var Mastodon = function(config) {
  var self = this;
  if (!(self instanceof Mastodon)) {
    return new Mastodon(config);
  }
  self.config = config;
  self.message = 'https://github.com/rzr/webthing-iotjs/wiki/Social# #ActivityPub to build #Social #WebOfThings powered by #MastodonLite and #WebThingIotJs from @rzr@social.samsunginter.net';
};

var verbose = !console.log || function () {};

function receive (incoming, callback) {
  var data = '';
  verbose('log: receiving:');
  incoming.on('data', function (chunk) {
    verbose('log: chunk: ' + data.length + '+' + chunk.length);
    data += chunk;
  });
  incoming.on('close', function () {
    verbose('log: close');
  });
  incoming.on('end', function () {
    verbose('log: end:' + data);
    if (callback) return callback(null, data && JSON.parse(data));
  });
}

Mastodon.prototype.post = function (message, callback) {
  var self = this;
  verbose('log: post: ' + message);
  if (!self.config) {
    console.error('log: TODO: must provide config, attempt to use defaults: ' + self.config);
  }
  if (!message) {
    message = self.message;
    verbose('log: Using default message: ' + message);
  }

  message = 'status=' + message;
  var config = self.config;
  config.method = 'POST';
  config.path = self.config.api + '/statuses';
  config.headers = {
    'Authorization': 'Bearer ' + self.config.access_token,
    'Content-Length': Buffer.byteLength(message)
  };

  if (!callback) {
    callback = function (err, data) {
      if (err) throw err;
      verbose(data);
    };
  }

  http.request(config, function (res) {
    receive(res, callback);
  }).end(message);
};

Mastodon.prototype.get = function (path, callback) {
  var self = this;
  verbose('log: get: ' + path);
  if (!self.config) {
    console.error('log: TODO: must provide config, attempt to use defaults: ' + self.config);
  }
  if (!path) {
    path = '/timelines/home?limit=1';
    verbose('log: Using default endpoint: ' + path);
  }

  var config = self.config;
  config.method = 'GET';
  config.path = self.config.api + '/' + path;
  config.headers = {
    'Authorization': 'Bearer ' + self.config.access_token
  };

  if (!callback) {
    callback = function (data) {
      verbose(data);
    };
  }
  http.request(config, function (res) {
    receive(res, callback);
  }).end();
};

Mastodon.prototype.request = function(argv, callback) {
  var verb = 'get';
  var token = null;
  var idx = 0;
  if (argv.length > idx && (token = argv[idx])) {
    if (token === 'get' || token === 'post' ||
        token === 'put' || token === 'delete') {
      verb = token;
      idx += 1;
    } else {
      verb = 'post';
    }
  }
  verbose('log: verb: ' + verb);
  switch (verb) {
  case 'post':
  case 'put':
    if (argv.length > idx) {
      this.post(argv[idx], callback);
    }
    break;

  case 'get':
    var endpoint = null;
    if (argv.length > idx) {
      endpoint = argv[idx];
    }
    this.get(endpoint, callback);
    break;

  default:
    if (callback) return callback('Error: Must be implemented', null);
    break;
  }
};

Mastodon.prototype.getUrl = function() {
  return (this.config.port === 443 ? 'https' : 'http') +
    '://' + this.config.hostname +
    ':' + (this.config.port || 80);
};

module.exports = Mastodon;
