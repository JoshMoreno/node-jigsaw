#!/usr/bin/env node
const path = require('../src/helpers').path();
const spawn = require('cross-spawn');
const args = process.argv.splice(2);

const response = spawn.sync(path, args);
const output = response.error ? response.stderr : response.stdout;
console.log(output.toString());