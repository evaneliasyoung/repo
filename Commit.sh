#!/bin/bash

cd `dirname $0`
printf "\e[1mCommitting Changes\e[0m\n"
printf "Commit Name: "
read reason
printf "Commit Comment: "
read comment

git add .
git commit -m "$reason" -m "$comment"
git push
