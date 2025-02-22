#!/bin/bash

echo "Killing Next.js server if already running..."
pkill -9 ^next-server

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building project..."
npm run build

# Start the project in background
echo "Starting project..."
nohup npm start > /dev/null 2>&1 &

echo "Deployment complete! Application is running on port 3000"