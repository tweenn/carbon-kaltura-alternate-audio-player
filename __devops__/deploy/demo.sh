#!/bin/bash

rm -rf ./dist;
yarn build:demo;
yarn push:demo;
