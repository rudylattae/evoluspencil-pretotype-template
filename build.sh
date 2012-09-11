#!/bin/bash

echo "Building..."

here=$0
base_dir=$(cd "$(dirname "$here")"; pwd)
dist_dir=$base_dir/dist

## Project info
project_name=EvolusPencil-PretotypeTemplate
project_version=0.3-dev

## Package info
package_source=$base_dir/$project_name
package_name=$project_name-$project_version
package_archive=$dist_dir/$package_name.zip

## setup
rm $package_archive

## build and package
cd $package_source
zip -r $package_archive *

cd ..