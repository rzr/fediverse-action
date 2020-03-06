#!/bin/bash -e
# SPDX-License-Identifier: MPL-2.0
yarn --version > /dev/null 2>&1 \
|| { echo "error: yarn not found (try: npm install -g yarn)" ; exit 1; }

date=$(git log -1 --date=short --pretty=format:%cd || date -u -r package.json)

rm -rf node_modules
if [ -z "${ADDON_ARCH}" ]; then
  TARFILE_SUFFIX=
else
  NODE_VERSION="$(node --version)"
  TARFILE_SUFFIX="-${ADDON_ARCH}-${NODE_VERSION/\.*/}"
fi
yarn install --production

rm -f SHA256SUMS
sha256sum package.json *.js LICENSE manifest.json README.md > SHA256SUMS
find node_modules -type f -exec sha256sum {} \; >> SHA256SUMS
TARFILE="$(npm pack)"
tar xzf ${TARFILE}
rm ${TARFILE}
TARFILE_ARCH="${TARFILE/.tgz/${TARFILE_SUFFIX}.tgz}"
cp -r node_modules ./package
GZIP="-n" tar czf "${TARFILE_ARCH}" --mtime="${date}" package
rm -rf package
echo "Created ${TARFILE_ARCH}"
sha256sum "${TARFILE_ARCH}"
