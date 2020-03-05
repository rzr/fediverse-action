#!/bin/echo docker build . -f
# -*- coding: utf-8 -*-
#{ 
# Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
# 
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
# 
#      http://www.apache.org/licenses/LICENSE-2.0
# 
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#}

FROM rzrfreefr/iotjs-express:latest
LABEL maintainer="Philippe Coval (rzr@users.sf.net)"

ENV project mastodon-lite
COPY Makefile /usr/local/opt/${project}/src/${project}/
WORKDIR /usr/local/opt/${project}/src/${project}
RUN echo "#log: ${project}: Setup system" \
  && set -x \
  && make setup \
  && sync

COPY . /usr/local/opt/${project}/src/${project}/
RUN echo "#log: ${project}: Testing sources" \
  && set -x \
  && ls .${project}.json || echo "ERROR: please add config file to run actual test" \
  && ls .${project}.json && echo "WARNING: Don't publish image" \
  && cp -v .${project}.json ${HOME} || echo "Using default config" \
  && make test \
  && sync

WORKDIR /usr/local/opt/${project}/src/${project}
ENTRYPOINT [ "/usr/bin/env", "make" ]
CMD [ "test" ]
