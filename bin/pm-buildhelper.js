#!/usr/bin/env node

const {build} = require("@marijn/buildtool")
const {resolve} = require("path")
const {transform} = require("@babel/core")

let args = process.argv.slice(2)

if (args.length != 1) {
  console.log("Usage: pm-buildhelper src/mainfile.ts")
  process.exit(1)
}

build(resolve(args[0]), {
  expandLink: anchor => "https://prosemirror.net/docs/ref/#" + anchor,
  cjsOutputPlugin: () => ({
    name: "babel-output",
    renderChunk: code => transform(code, {presets: [require('@babel/preset-env')], comments: false}).code
  })
}).then(result => {
  if (!result) process.exit(1)
})
