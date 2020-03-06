#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: ISC
# SPDX-License-URL: https://spdx.org/licenses/ISC.txt
# Copyright: 2020-present Philippe Coval <http://purl.org/rzr/>

default: help all
	-@sync

project?=fedivers-action

help:
	@echo "# make help"
	@echo "# make release"
	@echo "# make update"

all build: lint
	@echo "# log: $@: $^"

update:
	npm-check-updates -u
	-git commit -sam 'npm: Update deps to latest'
	@rm -rf node_modules
	npm install
	-git commit -sm 'npm: Pin deps' package-lock.json
	-git add node_modules
	-git commit -sm 'npm: Upgrade shipped modules' node_modules

release: lint update
	npm version patch
	@echo "# TODO: Set 'Release X.Y.Z' as commit message"
	git rebase -i HEAD~1
	@echo "# TODO: git push"

lint: action.yml .github/workflows/fediverse-action.yml
	yamllint -f standard $^
