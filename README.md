Fediverse-Action Documentation:
===============================

About:
------

Post notification to fediverse social web when code is updated.
Currently
it was tested with Mastodon service, Support for other activity pub
services like pleroma or GNUsocial is also welcome.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fediverse_logo_proposal.svg/330px-Fediverse_logo_proposal.svg.png)

Usage:
------

### Join fediverse

-   If you didn't before register to an instance of mastodon network:
    -   example: <https://mastodon.social>
-   Once registered, go to settings page to create an application:
    -   example: <https://mastodon.social/settings/profile>
-   Go to "Settings" / "Development" / "New Application"
    -   example: <https://mastodon.social/settings/applications/new>
-   Fill application name: mastodon-lite (or anything else), ignore
    other fields
-   Submit to generate application
    -   example: <https://mastodon.social/settings/applications>
-   Go to application details and note "access token"
    -   example: "B4DC0D-DeadBeef1BadCode-1TODO~1TODOtodoTODO~"

### Add secret to github

-   From your project page:
    -   <https://github.com/$%7Borg%7D/$%7Bproject%7D/settings/secrets>
-   Add new secret with name "MASTODON~ACCESSTOKEN~" and the previous
    encoded string as value.

### Commit config file

Back to your project import config file:

``` {.bash org-language="sh"}
mkdir -p .github/workflows/
file=".github/workflows/fediverse-action.yml"
curl -o "$file" \
  "https://raw.githubusercontent.com/rzr/fediverse-action/master/$file"
git add "$file"
git commit -sm 'github: Add fediverse-action' "$file"
git push
```

Then check action's status on github, a message should then appear on
your fediverse profile, something like:

*    <https://mastodon.social/@rzr/103772616301851818>

### Customize yml

The default config file will post on each push, if you something less
verbose you can filter on release only.

Note default "mastodon.social" server will be used unless you override
a host value:

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
          message: "https://github.com/marketplace/actions/fediverse-action# #FediverseAction has just been triggered on my repo thx @rzr@mastodon.social"
```

You can get inspired from this reference config file:

-   <https://raw.githubusercontent.com/rzr/mastodon-lite/master/.github/workflows/fediverse-action.yml>

Feel free to also pin version to latest release (-"@master" +"@vX.Y.Z"):

-   <https://github.com/marketplace/actions/fediverse-action>



Resources:
----------

-   <https://github.com/marketplace/actions/fediverse-action/>
-   <https://github.com/rzr/mastodon-lite/>
-   <https://help.github.com/en/actions/building-actions/creating-a-javascript-action>
-   <https://github.com/rzr/webthing-iotjs/wiki/Social>
-   <https://en.wikipedia.org/wiki/Fediverse>
-   <https://github.com/features/actions>
-   <https://www.npmjs.com/package/fediverse-action>
-   <https://github.community/t5/GitHub-Actions/bd-p/actions>
-   <https://lab.github.com/githubtraining/github-actions:-continuous-delivery>
-   <https://mastodon.social/@rzr/103772277257320621#fediverse-action>
-   <https://github.com/rzr/mastodon-lite/blob/master/.github/workflows/fediverse-action.yml>
-   <https://mastodon.social/@rzr/103772576183594794#mastodon-lite>

[![fediverse-action](
https://pbs.twimg.com/media/ESZE74mXkAEojrH?format=jpg&name=medium#./file/githubhackaton.jpg
)](
https://twitter.com/RzrFreeFr/status/1235750998364352512#fediverse-action#
"fediverse-action")
