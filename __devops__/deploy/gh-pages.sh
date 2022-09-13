#!/bin/bash

rm -rf ./dist;
yarn build:storybook;
yarn push:ghpages;
