# Fediverse-Action #

[![GitHub forks](
https://img.shields.io/github/forks/rzr/fediverse-action.svg?style=social&label=Fork&maxAge=2592000
)](
https://GitHub.com/rzr/fediverse-action/network/
)
[![License](
https://img.shields.io/badge/license-ISC-blue.svg?style=flat
)](
LICENSE
)
[![NPM](
https://img.shields.io/npm/v/fediverse-action.svg
)](
https://www.npmjs.com/package/fediverse-action
)
[![dependencies Status](
https://david-dm.org/rzr/fediverse-action/status.svg
)](
https://david-dm.org/rzr/fediverse-action
)

## About ##

Post notification to fediverse social web when code is updated.
Currently it was tested with Mastodon service,
Support for other ActivityPub services
like pleroma or GNUsocial is also welcome.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fediverse_logo_proposal.svg/330px-Fediverse_logo_proposal.svg.png)

## Usage ##

### Join fediverse ###

- If you didn't before register to an instance of mastodon network:
  - example: <https://mastodon.social>
- Once registered and logged, go to settings page to create an application:
  - example: <https://mastodon.social/settings/profile>
- Go to "Settings" / "Development" / "New Application"
  - example: <https://mastodon.social/settings/applications/>
  - example: <https://mastodon.social/settings/applications/new>
- Fill application name: mastodon-lite (or anything else),
  ignore  other fields
- Submit to generate application
  - example: <https://mastodon.social/settings/applications>
- Go to application details and note "access token"
  - example: "B4DC0D-DeadBeef1BadCode-1TODO-1TODOtodoTODO"

### Add secret to github ###

- From your project page:
  - <https://github.com/${org}/${project}/settings/secrets>
- Add new secret with name "MASTODON_ACCESS_TOKEN"
  and the previous  encoded string as value.

### Commit config file ###

To enable this "action" in any of your github hosted project,
a configuration file should be located in ".github/workflow/" subdir, just like:

- <https://raw.githubusercontent.com/rzr/fediverse-action/master/.github/workflows/fediverse-action.yml>

Back to your project you can create ".github/workflows/fediverse-action.yml"
file by applying this patch from shell:

``` {.bash org-language="sh"}
curl "https://github.com/rzr/color-sensor-js/commit/867de15f.patch"  | git am
git push
```

Or pick it from:

- <https://github.com/rzr/fediverse-action/commit/40dc4bccfb3d8b6efd26327a412b73bbe2f7113d.patch>

Then check action's status on github,
a default message should then appears on
a "mastodon.social" profile, something like:

- <https://mastodon.social/@tizenhelper/103781386501900694>
- <https://mastodon.social/tags/FediVerseAction>

Note default "mastodon.social" server will be used
unless you override a host value:

``` {.yml}
        with:
          access-token: ${{ secrets.MASTODON_ACCESS_TOKEN }}
          host: "social.bau-ha.us" # custom host if not "mastodon.social" (default)
```

Example:

- <https://github.com/Tarnyko/test-mastodon/commit/414d3191c5a394caac5ed67fe40de24caf063498>

Default message will link to your repo URL.

### Customize commit message ###

Once posting is verified,
then apply this next change to overload default message
with your project's latest git commit message.

```sh
curl "https://github.com/rzr/color-sensor-js/commit/cb4512fe.patch" | git am
git push
```

- <https://github.com/abandonware/bmp085-sensor/commit/5701e5c3>

``` {.yml}
(...)
    steps:
      - uses: actions/checkout@v1
      - id: log
        run: echo "::set-output name=message::$(git log --no-merges -1 --oneline)"
      - uses: rzr/fediverse-action@master
        with:
          access-token: ${{ secrets.MASTODON_ACCESS_TOKEN }}
          message: "https://github.com/${{ github.repository }}/commit/${{ steps.log.outputs.message }} ~ #FediVerseAction"
```

Feel free to edit "message" input with anything you prefer.

Examples:

- <https://github.com/abandonware/bmp085-sensor/commit/5701e5c3e0773fedc65b5477a45005783a30cb63>
- <https://mastodon.social/@tizenhelper/103810982954496420>

If you need to be less verbose you can filter on
"Release x.y.z" commit messages only:

- <https://github.com/abandonware/node-i2c/commit/1837c8111e5d5bb609824a5981716cbfc28a05cd.patch>
- <https://github.com/abandonware/node-i2c/commit/16ce8ec0796efa723079a5103791e57cfe13652b>
- <https://github.com/rzr/pinball-table-hurd/commit/53f85ccab02c9820e34edbc937c8f358c9b8ec83>

As a reference, config file should look like this:

``` {.yml}
# YAML
---
name: fediverse-action
on: [push]
jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - id: log
        run: echo "::set-output name=message::$(git log --no-merges -1 --oneline)"
      - if: "contains(steps.log.outputs.message, 'Release ')"
        uses: rzr/fediverse-action@master
        with:
          access-token: ${{ secrets.MASTODON_ACCESS_TOKEN }}
          message: "https://github.com/${{ github.repository }}# ${{ steps.log.outputs.message }} ~ #FediVerseAction"
          host: "mamot.fr" # If not using default "mastodon.social"
```

You can get inspired from this reference config file:

- <https://raw.githubusercontent.com/rzr/mastodon-lite/master/.github/workflows/fediverse-action.yml>

Feel free to also pin version to latest release (-"@master" +"@vX.Y.Z"):

- <https://github.com/marketplace/actions/fediverse-action>

## Notes ##

If you want to crosspost to other social network, it's possible using IFTT:

- <https://twitter.com/search?q=%23FediVerseAction>
- <https://ifttt.com/applets/K6FLEawj-mastodon-twitter-exclude-mentions>
- <https://help.twitter.com/en/using-twitter/how-to-tweet?lang=browser#source-labels>
- <https://nitter.net/search?q=%23FediVerseAction>

## Community ##

Projects using fediverse-action:

- <https://github.com/rzr/fediverse-action/blob/master/.github/workflows/fediverse-action.yml>
  - <https://mastodon.social/@tizenhelper/103781386501900694>

Feel free to add your config file and relative post to this list:

- <https://github.com/abandonware/node-eddystone-beacon-scanner/blob/master/.github/workflows/fediverse-action.yml>
  - <https://mastodon.social/@tizenhelper/103781987207513944>
- <https://github.com/rzr/iotjs-async/blob/master/.github/workflows/fediverse-action.yml>
  - <https://mastodon.social/@tizenhelper/103775679164369666>
- <https://github.com/rzr/mastodon-lite/blob/master/.github/workflows/fediverse-action.yml>
  - <https://mastodon.social/@rzr/103771440856951663>
- <https://github.com/rzr/twins/blob/master/.github/workflows/fediverse-action.yml>
  - <https://mastodon.social/@rzr/103781317496412496>

## Resources ##

- <https://github.com/marketplace/actions/fediverse-action/>
- <https://github.com/rzr/mastodon-lite/>
- <https://help.github.com/en/actions/building-actions/creating-a-javascript-action>
- <https://github.com/rzr/webthing-iotjs/wiki/Social>
- <https://en.wikipedia.org/wiki/Fediverse>
- <https://github.com/features/actions>
- <https://www.npmjs.com/package/fediverse-action>
- <https://github.community/t5/GitHub-Actions/bd-p/actions>
- <https://lab.github.com/githubtraining/github-actions:-continuous-delivery>
- <https://mastodon.social/@rzr/103772277257320621#fediverse-action>
- <https://github.com/rzr/mastodon-lite/blob/master/.github/workflows/fediverse-action.yml>
- <https://mastodon.social/@rzr/103772576183594794#mastodon-lite>
- <https://www.reddit.com/r/fediverse/comments/fek66r/fediverseaction_post_to_fediverse_from_github/>
- <https://www.linkedin.com/feed/update/urn:li:activity:6641985314296598528>

[![fediverse-action](
https://pbs.twimg.com/media/ESZE74mXkAEojrH?format=jpg&name=medium#./file/githubhackaton.jpg
)](
https://twitter.com/RzrFreeFr/status/1235750998364352512#fediverse-action#
"fediverse-action")
