// -*- mode: js; js-indent-level:2;  -*-
// Copyright 2020-present Philippe Coval <http://purl.org/rzr/>
// SPDX-Licence: ISC
// SPDX-Licence-URL: https://spdx.org/licenses/ISC.txt

const core = require('@actions/core');
const github = require('@actions/github');
const Mastodon = require('mastodon-lite');

try {
  var app = {};
  app.config = {
    access_token: '[TODO: Update with app token at https://mastodon.social/settings/applications]',
    host: 'mastodon.social',
    port: 443,
    api: '/api/v1',
    rejectUnauthorized: false
  };

  if (core.getInput('access-token'))
    app.config.access_token = core.getInput('access-token');
  app.config.host = core.getInput('host');
  if (Number(core.getInput('port')))
    app.config.port = Number(core.getInput('port'));
  if (core.getInput('api'))
    app.config.api = core.getInput('api');
  if (typeof core.getInput('rejectUnauthorized') != 'undefined')
    app.config.rejectUnauthorized = core.getInput('rejectUnauthorized');

  app.mastodon = new Mastodon(app.config);
  const message = core.getInput('message');
  app.mastodon.post(message, (err, status) => {
    if (err || status.error) {
      return core.setFailed(err || status.error);
    } else {
      console.log(status);
      core.setOutput('status', `succeed: ${status}`);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
