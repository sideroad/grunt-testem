module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    'testem': {
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
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};
