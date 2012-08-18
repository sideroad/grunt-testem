# grunt-testem

A [grunt](https://github.com/cowboy/grunt) plugin for executing [testem](https://github.com/airportyh/testem)

## Getting Started

Install the module:

```bash
npm install grunt-testem
```

Then add this line to your project’s `grunt.js` gruntfile:

```js
grunt.loadNpmTasks('grunt-testem');
```

Now you can execute testem. Here’s a basic example:

```javascript
grunt.initConfig({
  testem : {
    ci : []
  }
});
```

## Selecting specific browsers
```javascript
grunt.initConfig({
  testem : {
    ci : ['chrome','safari']
  }
});
```
