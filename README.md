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
    files : [
      'path/to/test.html'
    ]
  }
});
```

## Selecting specific browsers
```javascript
grunt.initConfig({
  testem : {
    browsers : [
      'chrome',
      'safari'
    ],
    files : [
      'path/to/test.html',
      'path/to/test.html'
    ]
  }
});
```
