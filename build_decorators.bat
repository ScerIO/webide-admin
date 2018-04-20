@echo off
cd ./node_modules/@polymer/decorators
yarn install & npm run build & rd /s /q "./node_modules"
