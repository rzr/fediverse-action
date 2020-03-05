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

var fs = require('fs');
var console = require('console');
var Mastodon;
try {
  Mastodon = require('../mastodon-lite');
} catch (err) {
  Mastodon = require('mastodon-lite');
}

if (module.parent === null) {
  var app = {};
  app.file = process.env.HOME + '/.mastodon-lite.json';
  app.config = {
    access_token: '[TODO: Update with app token at https://mastodon.social/settings/applications]',
    host: 'mastodon.social',
    port: 443,
    api: '/api/v1',
    rejectUnauthorized: false
  };

  try {
    app.config = JSON.parse(fs.readFileSync(app.file, 'utf8'));
  } catch (err) {
    fs.writeFileSync(app.file, JSON.stringify(app.config, null, 2));
    console.log('error: TODO: edit configuration file ' + app.file);
    process.exit(0);
  }
  app.mastodon = new Mastodon(app.config);
  app.mastodon.request(process.argv.slice(2), function(err, data) {
    if (err) throw err;
    console.log(data && JSON.stringify(data, 2));
  });
}
