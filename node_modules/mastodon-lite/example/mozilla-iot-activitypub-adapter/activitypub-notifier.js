/* -*- mode: js; js-indent-level:2;  -*-
   SPDX-License-Identifier: MPL-2.0 */
/**
 * Activitypub-notifier.js - ActivityPub notifier.
 */
const manifest = require('./manifest.json');
const mastodon = require('mastodon-lite');

const {
  Constants,
  Database,
  Notifier,
  Outlet
} = require('gateway-addon');

const config = {
  access_token: null,
  api: '/api/v1',
  hostname: 'mastodon.social',
  port: 443,
  rejectUnauthorized: false
};

function createTransport() {
  return mastodon(config);
}

function message() {
  return {
    name: 'message',
    metadata: {
      type: 'string'
    }
  };
}

function post(message) {
  const transport = createTransport();

  return new Promise(function(resolve, reject) {
    transport.post(message, (err, response) => {
      if (err || !response) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

class ActivityPubOutlet extends Outlet {
  constructor(notifier, id) {
    super(notifier, id);
    this.name = 'ActivityPub Poster';
  }

  async notify(title, message, level) {
    console.log(`Posting message "${message}", and level "${level}"`);

    switch (level) {
      case Constants.NotificationLevel.LOW:
      case Constants.NotificationLevel.NORMAL:
        title = `(NOTICE) ${title}`;
        break;
      case Constants.NotificationLevel.HIGH:
        title = `(ALERT) ${title}`;
        break;
    }

    await post(message);
  }
}

/**
 * ActivityPub Sender Notifier
 * Instantiates one activitypub poster outlet
 */
class ActivityPubNotifier extends Notifier {
  constructor(addonManager) {
    super(addonManager, 'activitypub-sender', manifest.id);

    addonManager.addNotifier(this);

    const db = new Database(manifest.id);
    db.open().then(() => db.loadConfig()).
      then((cfg) => {
        Object.assign(config, cfg);

        if (!this.outlets['activitypub-sender-0']) {
          this.handleOutletAdded(new ActivityPubOutlet(this, 'activitypub-sender-0'));
        }
      }).
      catch(console.error);
  }
}

module.exports = ActivityPubNotifier;
