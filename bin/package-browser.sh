#!/bin/bash -e

ROOT=`dirname $0`

cd "$ROOT/.."

yarn workspace loot-core build:browser
yarn workspace @actual-app/web build:browser

echo "packages/desktop-client/build"
 