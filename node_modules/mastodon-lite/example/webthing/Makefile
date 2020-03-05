#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: Apache-2.0
# Copyright: 2018-present Samsung Electronics France SAS, and contributors

default: help start
	-sync

example_file?=index.js

IOTJS_EXTRA_MODULE_PATH?=../..
export IOTJS_EXTRA_MODULE_PATH

port?=8888
base_url?=http://localhost:${port}

runtime?=iotjs
iotjs_modules_dir?=${CURDIR}/iotjs_modules

webthing-iotjs_url?=https://github.com/rzr/webthing-iotjs
webthing-iotjs_revision?=webthing-iotjs-0.12.1-1
webthing-iotjs_dir?=${iotjs_modules_dir}/webthing-iotjs
iotjs_modules_dirs+=${webthing-iotjs_dir}

message?=${webthing-iotjs_url} \#WebThingIotJs test using \#MastodonLite
run_args+=${port}


help:
	@echo "## Usage:"
	@echo "# make start # will start sensor server"
	@echo "# make demo"
	@echo "# make put # will start actuator server"
	@echo "# make client/put"
	@echo '# make client/put message="$${message}"'


${webthing-iotjs_dir}:
	@mkdir -p $@
	git clone --depth 1 --recursive --branch ${webthing-iotjs_revision} ${webthing-iotjs_url} $@
	make -C $@ iotjs/modules iotjs_modules_dir=${iotjs_modules_dir}

iotjs/start: ${example_file} modules
	iotjs $< ${run_args}

iotjs/debug: ${example_file}
	rm -rf node_modules
	NODE_PATH=iotjs_modules:../.. node $<

test: client/get client/post
	curl ${base_url}/properties/message

client/get:
	curl ${base_url}
	@echo
	curl ${base_url}/properties
	@echo
	curl ${base_url}/properties/message
	@echo

client/put:
	curl \
 -X PUT \
 -H "Content-Type: application/json" \
 --data "{\"message\":\"${message}\"}" \
 "${base_url}/properties/message"
	@echo

client/post: client/put
	@echo "# TODO: $@ maybe be implemented differently than $<"

iotjs_modules: ${iotjs_modules_dirs}
	ls $<

node_modules: package.json
	npm install

node/modules: node_modules
	ls $<

modules: ${runtime}/modules
	@echo "# $@: $^"

node/start: node_modules
	npm start ${run_args}

start: ${runtime}/start
	@echo "# $@: $^"

run: start
	@echo "# $@: $^"

cleanall:
	rm -rf iotjs_modules node_modules

put:
	${MAKE} ${runtime}/start run_args="${port} $@"

get:
	${MAKE} ${runtime}/start run_args="${port} $@"


timelines/%: ${example_file} ${iotjs_modules_subdirs}
	iotjs $< ${run_args}  get '$@?limit=1'
#	npm start ${run_args} get '$@?limit=1'

${HOME}/.mastodon-lite.conf: ../../mastodon-lite.js
	make -C ${<D} start

demo: timelines/home ${HOME}/.mastodon-lite.conf
	@echo "# $@: $^"

iotjs/modules: ${iotjs_modules_dirs}
	ls $<
