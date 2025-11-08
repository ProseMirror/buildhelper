#!/usr/bin/env node

const {build} = require("@marijn/buildtool")
const {resolve} = require("path")
const {transform} = require("@babel/core")
const {parseArgs} = require("node:util")

const {values, positionals} = parseArgs({
  options: {"type-check": {type: "boolean", default: false}},
  allowPositionals: true
})

if (positionals.length != 1) {
  console.log("Usage: pm-buildhelper [--type-check] src/mainfile.ts")
  process.exit(1)
}

build(resolve(positionals[0]), {
  typeCheck: values["type-check"],
  expandLink: anchor => "https://prosemirror.net/docs/ref/#" + anchor,
  expandRootLink: "https://prosemirror.net/",
  cjsOutputPlugin: () => ({
    name: "babel-output",
    renderChunk: code => transform(code, {presets: [require('@babel/preset-env')], comments: false}).code
  })
}).then(result => {
  if (!result) process.exit(1)
})
