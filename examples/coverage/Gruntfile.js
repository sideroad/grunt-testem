module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    testem: {
      options : {
        launch_in_ci : ['Chrome'],
        output: {
          coverage: 'tmp/coverage/from_browsers/'
        },
        routes: {
          "/lib": "../lib",
          "/src": "instrumented"
        }
      },
      all : {
        files : {
          'tmp/result.tap': ['test/index.html']
        }
      }
    },

    clean: {
      tests: ['tmp']
    },

    // This section is to instrument files from grunt
    shell: {
      instrument: {
        command: "istanbul instrument --output instrumented src"
      },
      report: {
        command: "istanbul report --root tmp/coverage/from_browsers --dir tmp/coverage lcov"
      },
      options: {
        stdout: true,
        failOnError: true
      }
    }
  });

  // In real life replace this line:
  grunt.loadTasks('../../tasks');
  // with
  // grunt.loadNpmTasks('grunt-testem');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  

  grunt.registerTask('test', ['clean', 'shell:instrument', 'testem', 'shell:report']);
  grunt.registerTask('default', ['test']);

};
