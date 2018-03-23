#!/bin/sh

echo "********************* Building ***"
bundle exec middleman build || exit

echo "********************* Syncing ***"
bundle exec middleman s3_sync || exit

echo "********************* Invalidating ***"
bundle exec middleman invalidate || exit
