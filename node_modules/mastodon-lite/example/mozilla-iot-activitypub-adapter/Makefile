#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: Apache-2.0
# SPDX-License-URL: https://spdx.org/licenses/Apache-2.0.txt
# Copyright 2020-present Philippe Coval <http://purl.org/rzr/>

default: help all

project ?= mozilla-iot-activitypub-adapter

lint: node_modules
	npm run $@

help:
	@echo "## Usage: "
	@echo "# make lint"

rule/npm/version/%: manifest.json
	-git tag -d v${@F}
	-npm version
	npm version ${@F}
	-git describe --tags
	sed -e "s|\(\"version\":\) .*|\1 \"${@F}\"|g" -i $<
	-git commit -sam "moziot: Update version to ${@F}"
