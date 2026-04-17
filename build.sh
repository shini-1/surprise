#!/bin/bash

echo "Installing frontend dependencies..."
cd frontend
npm install
echo "Building frontend..."
npm run build

# Clean and move build output to root dist/
rm -rf ../dist
cp -r dist/* ../
echo "Frontend build moved to root dist/"
echo "Build complete!"
