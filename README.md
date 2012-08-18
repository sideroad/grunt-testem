grunt-tasks
===========

Install
Download grunt-tasks and add path of load task into grunt.js.
```javascript
grunt.loadTasks('path/to/grunt-tasks');
```

testem
------


### All browsers test
```javascript
grunt.initConfig({
  testem : {
    ci : []
  }
});
```

### Selecting specific browsers
```javascript
grunt.initConfig({
  testem : {
    ci : ['chrome','safari']
  }
});
```
