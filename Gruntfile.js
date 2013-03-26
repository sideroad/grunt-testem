module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    'testem': {
      options : {
        launch_in_ci : [
          'firefox',
          'safari'
        ],
        tap : "tests.tap"
      },
      main : {
        files : {
          examples: [
            'examples/1.html',
            'examples/2.html'
          ]
        }
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};
