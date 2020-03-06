#!/bin/echo docker build . -f
# -*- coding: utf-8 -*-
# SPDX-License-Identifier: MPL-2.0
# Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors

FROM mozillaiot/gateway:latest
LABEL maintainer="Philippe Coval (rzr@users.sf.net)"

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL en_US.UTF-8
ENV LANG ${LC_ALL}

ENV project mozilla-iot-activitypub-adapter

ADD . /root/.mozilla-iot/addons/activitypub-adapter
WORKDIR /root/.mozilla-iot/addons/${project}
RUN echo "#log: ${project}: Preparing sources" \
  && set -x \
  && which yarn || npm install -g yarn \
  && sync

WORKDIR /root/.mozilla-iot/addons/activitypub-adapter
RUN echo "#log: ${project}: Building sources" \
  && set -x \
  && ./package.sh \
  && sync

WORKDIR /root/.mozilla-iot/addons/activitypub-adapter
RUN echo "#log: ${project}: Installing sources" \
  && set -x \
  && install -d /usr/local/opt/${project}/dist \
  && install activitypub-adapter-*.tgz /usr/local/opt/${project}/dist \
  && sha256sum /usr/local/opt/${project}/dist/* \
  && sync
