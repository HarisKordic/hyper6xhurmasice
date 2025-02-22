#!/bin/bash

# Kill any process running on port 3000
echo "Killing process on port 3000..."
kill $(lsof -t -i:3000) 2>/dev/null || true

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