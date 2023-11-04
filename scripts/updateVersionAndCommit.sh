#!/bin/sh
# Run the updateVersion.js script
node scripts/updateVersion.js

# Add the updated file to the current commit
git add ./public/worker.js
