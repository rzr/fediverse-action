#!/bin/sh
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

set -e
set -x

this_dir=$(dirname -- "$0")
this_dir=$(realpath "${this_dir}")
this_name=$(basename -- "$0")
top_dir="${this_dir}/../.."
name="activitypub"
archive_name="${name}-adapter"
project="mozilla-iot-${archive_name}"
architecture=$(basename "${this_dir}")
dir="/usr/local/opt/${project}"
tag=$(git describe --tags || echo v0.0.0)
version=$(echo "${tag}" | cut -dv -f2 | cut -d'-' -f1)
file="${this_dir}/tmp/dist/${archive_name}-${version}.tgz"
docker_tag="${project}-${tag}"

docker --version
docker version
mkdir -p "${this_dir}/local" "${this_dir}/tmp"

time docker build --tag "${docker_tag}" "${top_dir}"
container=$(docker create "${docker_tag}")
docker cp "${container}:$dir/dist" "${this_dir}/tmp"
file=$(ls "${this_dir}/tmp/dist/${archive_name}"* | head -n1 \
           || echo "/tmp/${USER}/${this_dir}/failure.tmp")
sha256sum "${file}"
