module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    'testem': {
      main : {
        launch_in_ci : [
          'chrome',
          'safari'
        ],
        tap : "tests.tap",
        files: [
          'examples/1.html',
          'examples/2.html'
        ],
        routes: {
          '/lib': 'examples/lib'
        },
        src_files: [
        ]
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};
