#!/bin/sh

echo "********************* Building ***"
bundle exec middleman build || exit

echo "********************* Syncing ***"
# bundle exec middleman s3_sync || exit
aws s3 sync build s3://www.camerasrj.com.br \
  --profile default \
  --delete \
  --acl public-read \
  --exclude *.DS_Store

echo "********************* Invalidating ***"
# bundle exec middleman invalidate || exit
# aws cloudfront create-invalidation \
#   --distribution-id E24VVIEBCKV6BF \
#   --paths '/*'
