#!/bin/bash

dirname "$0"
cd backend
cp .env.defaults .env
npm install

cd ../frontend
cp .env.defaults .env
npm install

echo "Success installation"