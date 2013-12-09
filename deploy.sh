#!/bin/sh

echo "********************* Building ***"
middleman build

echo "********************* Syncing ***"
middleman s3_sync

echo "********************* Invalidating ***"
middleman invalidate
