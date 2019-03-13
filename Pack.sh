#!/bin/bash

cd `dirname $0`
rm Packages

printf "\e[1mGenerating Packages\e[0m\n"
dpkg-scanpackages.pl -m . /dev/null > Packages
bzip2 -fksq Packages
gzip -fkq Packages
