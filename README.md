# Grunt Testem[![Build Status](https://api.travis-ci.org/sideroad/grunt-testem.png?branch=master)](https://travis-ci.org/sideroad/grunt-testem)

A [grunt](https://github.com/cowboy/grunt) plugin for executing [testem](https://github.com/airportyh/testem)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install -g testem grunt
npm install grunt-testem
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
      files : {
        'tests.tap': [
          'examples/*.html'
        ]
      }
    }
  }
});
```

### Options
see also [testem](https://github.com/airportyh/testem)



