module.exports = function(grunt) {

  grunt.initConfig({
    'testem': {
      files: [
        'path/to/test.html'
      ],
      routes: [
        '/path': 'path/to/files'
      ],
      browsers: [
        'chrome'
      ],
      src_files: [
        'app/templates/**/*.tmpl'
      ]
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};