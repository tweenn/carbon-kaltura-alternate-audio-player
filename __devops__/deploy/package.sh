#!/bin/bash

rm -rf ./dist;
yarn build:package;
yarn push:package;
