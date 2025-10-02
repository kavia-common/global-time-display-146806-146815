#!/bin/bash
cd /home/kavia/workspace/code-generation/global-time-display-146806-146815/clock_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

