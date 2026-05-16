#!/bin/sh
buildNumber=`git rev-list --count HEAD`
jq ".buildNumber = $buildNumber" template.json > template.json.tmp && mv template.json.tmp template.json && git add template.json
