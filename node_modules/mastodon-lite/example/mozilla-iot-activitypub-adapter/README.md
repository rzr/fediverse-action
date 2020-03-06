# MOZILLA-IOT-ACTIVITYPUB-ADAPTER #

## DEMO: ##

[![web-of-things-agriculture-20180712rzr.webm](
https://camo.githubusercontent.com/8c693d7e5d3950831e7f7fd62aa1dc790a6100f8/68747470733a2f2f732d6f70656e736f757263652e6f72672f77702d636f6e74656e742f75706c6f6164732f323031382f30372f7765622d6f662d7468696e67732d6167726963756c747572652d3230313830373132727a722e676966#web-of-things-agriculture-20180712rzr.gif
)](
https://player.vimeo.com/video/279677314#web-of-things-agriculture-20180712rzr.webm
"Video Demo")

This "Smart Orchid" demonstrate how to link IoT to social web, using WebOfThings and ActivityPub,
with Mozilla Thing project, check this wiki page from insights:

* <https://github.com/rzr/webthing-iotjs/wiki/Social>


## USAGE: ##


### JOIN FEDIVERSE: ###

This is previously explained in 

[mastodon-lite's README](
https://github.com/rzr/mastodon-lite/blob/master/README.md
)

* If you didn't before register to an instance of mastodon network:
  * example: <https://mastodon.social>
* Once registered, go to settings page to create an application:
  * example: <https://mastodon.social/settings/profile>
* Go to "Settings" / "Development" / "New Application"
  * example: https://mastodon.social/settings/applications/new
* Fill application name: mastodon-lite (or anything else), ignore other fields
* Submit to generate application
  * example: <https://mastodon.social/settings/applications>
* Go to application details and note "access token"
  * example: "B4DC0D-DeadBeef1BadCode-1TODO_1TODOtodoTODO"


### SETUP WEBTHINGS ACTIVITYPUB ADDON: ###

* Setup webthings-gateway as explained at:
  * <https://iot.mozilla.org/>
* From addons menu, Add "ActivityPub Adapter"
* Go to addon page, and *configure* "ActivityPub" addon
  * <http://gateway.local:8080/settings/addons>
* Configure mastodon host (default is mastodon.social) and port
* Fill access token issue from application page
* Go back to things pages
  * <http://gateway.local:8080/things>
* Add "MastodonActuator" using add button ("+") at bottom right
* Click on icon and update text
* Automate with predefined messages using rules engine


## RESOURCES: ##

* <https://purl.org/rzr/mastodon-lite>
* <https://speakerdeck.com/rzr/webthing-iotjs-20181022rzr>
* <https://github.com/rzr/mastodon-lite/tree/master/example/mozilla-iot-activitypub-adapter#>
* <https://github.com/rzr/webthing-iotjs/wiki/Social>
* <https://libraries.io/npm/mastodon-lite>
