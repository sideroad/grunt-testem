# grunt-testem

A [grunt](https://github.com/cowboy/grunt) plugin for executing [testem](https://github.com/airportyh/testem)

## Getting Started

Install the module:

```bash
npm install -g testem
npm install -g grunt
npm install grunt-testem
```

You need to install testem more than 0.2.2 version.
Then add this line to your project’s `grunt.js` gruntfile:

```js
grunt.loadNpmTasks('grunt-testem');
```

Now you can execute testem. Here’s a basic example:

```javascript
grunt.initConfig({
  testem : {
    main :{
      files : [
        'examples/1.html',
        'examples/2.html'
      ]
    }
  }
});
```

## Options ( specified browsers and output TAP )
```javascript
grunt.initConfig({
  testem : {
    main : {
      options : {
        launch_in_ci : [
          'firefox',
          'safari'
        ],
        tap : "tests.tap"
      },
      files : [
        'examples/1.html',
        'examples/2.html'
      ]
    }
  }
});
```

You cant specified options, if you want to other options of testem
see also [testem](https://github.com/airportyh/testem)