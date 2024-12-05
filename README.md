Helper scripts to build and test ProseMirror packages.

The scripts (`pm-buildhelper` and `pm-runtests`) in this package build
and test packages that conform to the conventions of the various
ProseMirror packages.

`pm-buildhelper` takes the package's main file as argument and does the
following:

 - Mangle the code to convert our `///` doc comments to `/** */`
   comments, so that TypeScript will not strip them.

 - Run the TypeScript compiler, catching the output in memory.

 - Run rollup and rollup-plugin-dts on the result to emit the CommonJS
   and ES modules, as well as a bundled `.d.ts` file, to `dist/`.

The `pm-runtests` scipt helps run tests. Given a list of directories,
it'll run `./test/test-*.js` as plain mocha tests, and
`./test/webtest-*.js` using a Selenium headless browser.

You can also pass it a `--server` argument to start a test server that
you can interact with in your browser.
