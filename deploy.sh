#!/bin/sh

echo "********************* Building ***"
middleman build || exit

echo "********************* Syncing ***"
middleman s3_sync || exit

echo "********************* Invalidating ***"
middleman invalidate || exit
