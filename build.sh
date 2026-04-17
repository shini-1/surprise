#!/bin/bash

echo "Installing frontend dependencies..."
cd frontend
npm install
echo "Building frontend..."
npm run build
echo "Build complete!"