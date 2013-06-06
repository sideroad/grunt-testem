module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    'testem': {
      options : {
        launch_in_ci : [
          'PhantomJS'
        ]
      },
      success : {
        files : {
          'test/actual/success.tap': [
            'test/source/success-*.html'
          ]
        }
      },
      failed: {
        files : {
          'test/actual/failed.tap': [
            'test/source/failed-*.html'
          ]
        },
        options: {
          force: true
        }
      },
      json: {
        files : {
          'test/actual/json.tap': [
            'test/source/testem.json'
          ]
        }
      }
    },

    clean: {
      tests: ['test/actual/*']
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'testem', 'nodeunit']);
  grunt.registerTask('default', ['testem']);

};
