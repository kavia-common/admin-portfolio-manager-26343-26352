#!/bin/bash
cd /home/kavia/workspace/code-generation/admin-portfolio-manager-26343-26352/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

