module.exports = function(grunt) {

  grunt.initConfig({
    'testem': {
      main : {
        browsers : [
          'chrome',
          'safari'
        ],
        files: [
          'path/to/test.html'
        ],
        routes: {
          '/path': 'path/to/files'
        },
        src_files: [
          'app/templates/**/*.tmpl'
        ]
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};
