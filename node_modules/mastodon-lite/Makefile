#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: Apache-2.0
#{
# Copyright 2018-present Samsung Electronics France SAS, and other contributors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#}

default: help build
	-@sync

runtime?=iotjs
srcs?=mastodon-lite.js
V?=1
eslint ?= node_modules/eslint/bin/eslint.js
run_args?=
url?=http://github.com/rzr/mastodon-lite
message?=${url} \#ActivityPub : \#MastodonLite test, ping @tizenhelper@mastodon.social


%/start: example/index.js
	${@D} $< "${run_args}"

%/check: ${srcs}
	${@D} $<

help:
	@echo "# make start"
	@echo "# make rule/npm/start"
	@echo "# make check"
	@echo "# make lint"
	@echo "# make post"
	@echo "# make post message=\"${message}# #MastodonLite from @rzr@social.samsunginet.net\""
	@echo "# make -C example/webthing help"

start: ${runtime}/start
	@echo "# log: $@: $^"

run: start
	@echo "# log: $@: $^"

check: ${runtime}/check
	@echo "# log: $@: $^"

test: check start
	@echo "# log: $@: $^"

clean:
	rm -rf *~

cleanall: clean
	rm -rf node_modules iotjs_modules

distclean: cleanall
	rm -rf tmp

setup:
	@echo "log: Expected iotjs help to be printed"
	${runtime} -h ||:

rule/npm/version/%: package.json
	-git tag -d ${@F}
	-git describe --tags
	make -C example/mozilla-iot-activitypub-adapter "$@"
	cd example/webthing && npm version ${@F}
	-git add example/webthing/package*.json
	-git add example/*/package*.json
	-git commit -sam "webthing: Update version to ${@F}"
	-git add package*.json
	-git tag -d v${@F}
	npm version ${@F}
	-git tag -d v${@F}
	@echo "# TODO: Edit Release ${@F}"
	-git commit --amend 

rule/npm/start: package.json
	npm run ${@F}

${eslint}:
	npm install --only=dev

rule/eslint: .eslintrc.js ${eslint}
	@rm -rf tmp/dist
	${eslint} --no-color --fix . ||:
	${eslint} --no-color .
	git diff --exit-code

lint: rule/eslint
	@echo "# log: $@: $^"

timelines/%:
	npm start get "$@"
	${runtime} example get "$@"

timelines/direct:
	npm -q start get "$@?limit=1"
	${runtime} example get "$@?limit=1"

post:
	${runtime} example post "${message}"

demo: timelines/home timelines/direct
	@echo "# log: $@: $^"

iotjs/modules: ${iotjs_modules_dirs}
	ls $<

all build:
	@echo "# log: $@: $^"
