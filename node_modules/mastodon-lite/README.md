# MASTODON-LITE #

[![GitHub forks](https://img.shields.io/github/forks/rzr/mastodon-lite.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/rzr/mastodon-lite/network/)
[![License](https://img.shields.io/badge/licence-Apache-2.0.svg?style=flat)](LICENSE)
[![NPM](https://img.shields.io/npm/v/mastodon-lite.svg)](https://www.npmjs.com/package/mastodon-lite)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite?ref=badge_shield)
[![dependencies Status](https://david-dm.org/rzr/mastodon-lite/status.svg)](https://david-dm.org/rzr/mastodon-lite)
[![Build Status](https://api.travis-ci.org/rzr/mastodon-lite.svg?branch=master)](https://travis-ci.org/rzr/mastodon-lite)

[![NPM](https://nodei.co/npm/mastodon-lite.png)](https://npmjs.org/package/mastodon-lite)


## INTRODUCTION: ##

Lightweight client for mastodon micro blogging service.

This implementation is focusing on reducing dependencies,
for supporting IoT.js runtime, (as well as node).

So far only 'https' module is used (and 'fs' for the example app)

[![Presentation](
https://image.slidesharecdn.com/webthing-iotjs-20181022rzr-181027220201/95/webthingiotjs20181022rzr-25-638.jpg
)](
https://www.slideshare.net/slideshow/embed_code/key/BGdKOn9HHRF4Oa#webthing-iotjs#
"WebThingIotJs")


## USAGE: ##


### USING NODEJS: ###

Running from sources tree is straightforward, but each step will be detailed.


#### PREREQUISITE: ###

Then user need to create an account on decentralized, mastodon social network (or setup your own instance)

* <https://instances.social>

While we're here, let's go to settings to create an application and generate it's secret token, that will be used later:

Once logged go to "Settings" / "Development" / "New Application" ie:

* <https://mastodon.social/settings/applications/new>

Then just set application name to "mastodon-lite" or any name of your choice, other fields can be skipped.


Then your "mastodon-lite" application should appear on:

* <https://mastodon.social/settings/applications>

Click on it and note down the "access token" (64char hexa string or base64 string)


#### CONFIGURE: ####

On first run, if not already present, configuration file will generated in ~/.mastodon-lite.js.

```sh
git clone https://github.com/rzr/mastodon-lite ; cd mastodon-lite
npm start
# error: TODO: edit configuration file ~/.mastodon-lite.json
cat ~/.mastodon-lite.json
```

Then update credentials in generated config file with "Your access token" in earlier step,
if running on different instance, host and port should be changed accordingly,


#### FETCH CONTENTS: ####

By default timeline will be displayed:

```
npm start
```

Response is a JSON stream of all posts:

```
[
{
  "id": "99568354696365896",
  "created_at": "2018-02-22T09:42:01.636Z",
   (...)
  "uri": "https://mastodon.social/users/rzr/statuses/99568354696365896",
  "content": "<p><a href=\"https://www.npmjs.com/package/mastodon-lite#\" rel=\"nofollow noopener\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">npmjs.com/package/mastodon-lit</span><span class=\"invisible\">e#</span></a> <a href=\"https://mastodon.social/tags/mastodonlite\" class=\"mention hashtag\" rel=\"tag\">#<span>MastodonLite</span></a> : A lightweight <a href=\"https://mastodon.social/tags/mastodon\" class=\"mention hashtag\" rel=\"tag\">#<span>Mastodon</span></a> client to support <a href=\"https://mastodon.social/tags/constrainteddevices\" class=\"mention hashtag\" rel=\"tag\">#<span>ConstraintedDevices</span></a> using <a href=\"https://mastodon.social/tags/iotjs\" class=\"mention hashtag\" rel=\"tag\">#<span>IotJs</span></a></p>",
  "url": "https://mastodon.social/@rzr/99568354696365896",
   (...)
(...)
]
```

Different enpoints can be used, for instance to retrieve private messages:

```sh
npm run start get 'timelines/direct'
```


#### POSTING: ####

To post a message, just add a quoted message as parameter:

```
npm start 'https://www.npmjs.com/package/mastodon-lite# #MastodonLite : A lightweight #Mastodon client to support #ConstraintedDevices using #IotJs cc: @TizenHelper@quitter.is '
```

Message (toot) should be displayed on your profile's page 
(eg: <https://mastodon.social/@tizenhelper/99568473401250711> )
and client will get server's answer in this form:

```
{
  "id": "99568473401250711",
  "created_at": "2018-02-22T10:12:12.931Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/tizenhelper/statuses/99568473401250711",
  "content": "<p><a href=\"https://www.npmjs.com/package/mastodon-lite#\" rel=\"nofollow noopener\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">npmjs.com/package/mastodon-lit</span><span class=\"invisible\">e#</span></a> <a href=\"https://mastodon.social/tags/mastodonlite\" class=\"mention hashtag\" rel=\"tag\">#<span>MastodonLite</span></a> : A lightweight <a href=\"https://mastodon.social/tags/mastodon\" class=\"mention hashtag\" rel=\"tag\">#<span>Mastodon</span></a> client to support <a href=\"https://mastodon.social/tags/constrainteddevices\" class=\"mention hashtag\" rel=\"tag\">#<span>ConstraintedDevices</span></a> using <a href=\"https://mastodon.social/tags/iotjs\" class=\"mention hashtag\" rel=\"tag\">#<span>IotJs</span></a> cc: <span class=\"h-card\"><a href=\"https://quitter.is/tizenhelper\" class=\"u-url mention\">@<span>tizenhelper</span></a></span></p>",
  "url": "https://mastodon.social/@tizenhelper/99568473401250711",
  "reblogs_count": 0,
  "favourites_count": 0,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "pinned": false,
  "reblog": null,
  "application": {
    "name": "mastodon-lite",
    "website": "https://www.npmjs.com/package/mastodon-lite"
  },
  "account": {
    "id": "287178",
    "username": "tizenhelper",
    "acct": "tizenhelper",
    "display_name": "",
    "locked": false,
    "created_at": "2018-02-22T09:55:04.226Z",
    "note": "<p></p>",
    "url": "https://mastodon.social/@tizenhelper",
    "avatar": "https://mastodon.social/avatars/original/missing.png",
    "avatar_static": "https://mastodon.social/avatars/original/missing.png",
    "header": "https://mastodon.social/headers/original/missing.png",
    "header_static": "https://mastodon.social/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 2,
    "statuses_count": 1
  },
  "media_attachments": [],
  "mentions": [
    {
      "id": "287020",
      "username": "tizenhelper",
      "url": "https://quitter.is/tizenhelper",
      "acct": "tizenhelper@quitter.is"
    }
  ],
  "tags": [
    {
      "name": "mastodonlite",
      "url": "https://mastodon.social/tags/mastodonlite"
    },
    {
      "name": "mastodon",
      "url": "https://mastodon.social/tags/mastodon"
    },
    {
      "name": "constrainteddevices",
      "url": "https://mastodon.social/tags/constrainteddevices"
    },
    {
      "name": "iotjs",
      "url": "https://mastodon.social/tags/iotjs"
    }
  ],
  "emojis": []
}
```

#### INTEGRATE ####

Module is in NPM repo, so it can be added using npm tool:

```sh
ls package.json || npm init
npm install mastodon-lite
NODE_PATH=node_modules node node_modules/mastodon-lite/example
```

### USING IOTJS: ###

It's very similar to nodejs,

```sh
git clone https://github.com/rzr/mastodon-lite ; cd mastodon-lite
make start
iotjs example
```

Note, if you don't want to use git, code can be imported using node's npm package manager tool.
just update PATH variable.

```sh
ls package.json || npm init
npm install mastodon-lite
IOTJS_EXTRA_MODULE_PATH=./node_modules/ iotjs node_modules/mastodon-lite/example

```

Alternatively gitmodule can be used to track master branch.


### USING TIZENRT ON ARTIK05X ###

Rebuild demo from this makefile:

* <https://github.com/rzr/TizenRT/tree/master/rules/mastodon-lite>


## USING MOZILLA WEBTHING GATEWAY: ##

## DEMO: ##

[![web-of-things-agriculture-20180712rzr.webm](
https://camo.githubusercontent.com/8c693d7e5d3950831e7f7fd62aa1dc790a6100f8/68747470733a2f2f732d6f70656e736f757263652e6f72672f77702d636f6e74656e742f75706c6f6164732f323031382f30372f7765622d6f662d7468696e67732d6167726963756c747572652d3230313830373132727a722e676966#web-of-things-agriculture-20180712rzr.gif
)](
https://player.vimeo.com/video/279677314#web-of-things-agriculture-20180712rzr.webm
"Video Demo")

This "Smart Orchid" demonstrate how to link IoT to social web, using WebOfThings and ActivityPub,
with Mozilla Thing project, check this wiki page from webthing-iotjs project:

* <https://github.com/rzr/webthing-iotjs/wiki/Social>

For code check [example/webthing](example/webthing) in this mastodon-lite project.

An other integration example is add on adapter for mozilla-iot's Gateway:
[example/mozilla-iot-activitypub-adapter](example/mozilla-iot-activitypub-adapter):

More details are explained in addon directory in README file :

* [./example/mozilla-iot-activitypub-adapter/README.md](./example/mozilla-iot-activitypub-adapter/README.md)

Feedback also welcome on this Wiki page:

* <https://github.com/rzr/webthing-iotjs/wiki/Social>


## RESOURCES: ##

* <https://purl.org/rzr/mastodon-lite>
* <https://github.com/rzr/mastodon-lite>
* <https://www.npmjs.com/package/mastodon-lite>
* <https://www.mozillapulse.org/entry/959>
* <https://libraries.io/npm/mastodon-lite>
* <http://iotjs.net/>
* <https://w3c.github.io/activitypub/>
* <https://docs.joinmastodon.org/methods/timelines/#>
* <https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#timelines>
* <https://mastodon.social/@tizenhelper/101092551900857924>
* <https://www.slideshare.net/rzrfreefr/webthingiotjs20181022rzr-120959360>
* <https://mastodon.social/about/more>
* <https://github.com/jerryscript-project/iotjs-modules>


## LICENSE: ##

[![FOSSA Status](
https://app.fossa.io/api/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite.svg?type=large
)](
https://app.fossa.io/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite?ref=badge_large
)
