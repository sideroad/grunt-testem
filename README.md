# grunt-testem[![Build Status](https://api.travis-ci.org/sideroad/grunt-testem.png?branch=master)](https://travis-ci.org/sideroad/grunt-testem)

>Execute [testem](https://github.com/airportyh/testem) with [Continuous Integration Mode](https://github.com/airportyh/testem#continuous-integration-mode) then generate TAP file as test results.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install -g testem grunt-cli
npm install grunt-testem --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-testem');
```

## The "testem" task

### Overview
In your project's Gruntfile, add a section named `testem` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'testem': {
    options : {
      launch_in_ci : [
        'firefox',
        'safari'
      ]
    },
    main : {
      src: [ 'examples/*.html' ],
      dest: 'tests.tap'
    }
  }
});
```

#### src
src property be able to set `test_page` html path as testem option or `testem.json` path

#### dest
TAP file path

### Options
See also [Configuration File](https://github.com/airportyh/testem#configuration-file)

It also accepts an `output.coverage` option that is the folder path where coverage reports are written.

```js
grunt.initConfig({
  'testem': {
    options : {
      output: {
        coverage : 'coverage-results/'
      }
    },
    main : {
      src: [ 'examples/*.html' ],
      dest: 'tests.tap'
    }
  }
});
```

Source files must be instrumented before running tests. An example on how to do it in grunt is available inside `examples/coverage`.
