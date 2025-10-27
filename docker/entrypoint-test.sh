#!/bin/bash -l
set -e
if [ "$#" -eq 0 ]; then
  # Kill cache, pytest complains about it if running local and docker tests in mapped volume
 # find tests  -type d -name '__pycache__' -print0 | xargs -0 rm -rf {}
 echo "FIXME: Run tests"
else
  exec "$@"
fi
