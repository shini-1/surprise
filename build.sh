#!/bin/bash
# build.sh

# Install Python dependencies
pip install -r requirements.txt

# Generate the static site with Reflex.
# Ensure this command outputs files to the 'public' directory,
# as referenced in vercel.json.
reflex export

echo "Build completed!"