#!/usr/bin/env node

const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "rootDir", alias: "r", type: String },
  { name: "matching", alias: "m", type: String }
];

const options = commandLineArgs(optionDefinitions);

if (!options.rootDir) throw new Error("rootDir is a required argument");
if (!options.matching) throw new Error("matching is a required argument");

const { testRunner } = require("../dist/runner.js");

testRunner.run(options);
