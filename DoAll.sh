#!/bin/bash

cd `dirname $0`
bash debs/Deb.sh
bash debs/Clean.sh
bash Pack.sh
