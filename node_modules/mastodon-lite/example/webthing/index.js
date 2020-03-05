/* -*- mode: js; js-indent-level:2;  -*-
   SPDX-License-Identifier: Apache-2.0 */
/* Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
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
var webthing = require('webthing-iotjs');

var fs = require('fs');
var Mastodon = require('mastodon-lite');

var verbose = !console.log || function () {};

function MastodonActuator (mastodon) {
  var self = this;
  verbose('log: actuator');
  this.message = mastodon.message;
  this.thing = new webthing.Thing(
    'urn:dev:ops:mastodon-actuator-1234',
    'MastodonActuator', ['String'], 'An actuator example that just blog'
);
  this.thing.setUiHref(mastodon.getUrl());
  this.mastodon = mastodon;
  this.value = new webthing.Value(this.message, function (value) {
    if (self.message !== String(value)) {
      self.message = String(value);
      console.log(self.message);
      self.mastodon.post(value, function(err, data) {
          if (err || !data) throw err;
          self.thing.setUiHref(data.url);
        });
    }
  });
  this.thing.addProperty(new webthing.Property(
    this.thing, 'message', this.value,
    {
      label: 'Message',
      type: 'string',
      description: 'Message to be sent on change'
    }
  ));
}


function MastodonSensor (mastodon, argv) {
  var self = this;
  verbose('log: sensor: hostname=' + mastodon.config.hostname);
  this.frequency = 1 / 60;
  this.thing = new webthing.Thing(
    'urn:dev:ops:mastodon-sensor-1234',
    'MastodonSensor', ['String'], 'An sensor example that just listen'
);
  this.thing.setUiHref(mastodon.getUrl());
  this.mastodon = mastodon;
  this.value = new webthing.Value(mastodon.message);
  this.thing.addProperty(new webthing.Property(
    this.thing,
    'message',
    this.value,
    {
      label: 'Message',
      type: 'string',
      description: 'Message to be sent on change'
      // TODO readOnly: true // (should display HTML properly on GUI)
    }
  ));
  this.inteval = setInterval(function() {
    self.mastodon.request(
      ['get'].concat(argv),
      function(err, data) {
        if (err || !data || !data[0]) throw err;
        self.thing.setUiHref(data[0].url);
        var value = data && data[0] && data[0].content;
        self.value.notifyOfExternalUpdate(value);
      }
    );
  }, 1000 / this.frequency);
}

if (module.parent === null) {
  var app = {};
  var idx = 2;
  // TODO: Workaround TizenRT issue
  if (!process.env.HOME) {
    process.env.HOME = process.env.IOTJS_PATH || '.';
  }
  app.conf = process.env.HOME + '/.mastodon-lite.json';
  console.log('log: Loading private file: ' + app.conf);
  app.config = JSON.parse(fs.readFileSync(app.conf, 'utf8'));
  app.mastodon = Mastodon(app.config);

  app.port = process.argv[idx] ? Number(process.argv[idx]) : 8888;
  app.url = 'http://localhost:' + app.port + '/properties';

  console.log('Usage:\n' +
              process.argv[0] + ' ' +
              process.argv[1] + ' [port]\n' +
              'Try:\ncurl ' + app.url + '\n');

  var verb = 'get';
  idx += 1;
  if (process.argv[idx]) {
    verb = process.argv[idx];
  }

  switch (verb) {
  case 'put':
  case 'post':
    idx += 1;
    app.device = new MastodonActuator(app.mastodon, process.argv.slice(idx));
    break;
  case 'get':
  default:
    idx += 1;
    app.device = new MastodonSensor(app.mastodon, process.argv.slice(idx));
    break;
  }

  app.server = new webthing.WebThingServer(new webthing.SingleThing(app.device.thing), app.port);
  process.on('SIGINT', function () {
    app.server.stop();
    process.exit();
  });
  app.server.start();
}
