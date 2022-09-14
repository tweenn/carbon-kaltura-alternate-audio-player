#!/bin/bash

rm -rf ./dist;
yarn build;
yarn push:demo;
