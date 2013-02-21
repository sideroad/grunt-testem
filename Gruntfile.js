module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    'testem': {
      main : {
        launch_in_ci : [
          'firefox',
          'safari'
        ],
        json: 'testem-multi.json',
        tap : "tests.tap"
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};
