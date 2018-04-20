#!/bin/bash
cd ./node_modules/@polymer/decorators;
yarn install;
npm run build;
rm -rf ./node_modules;
