module.exports = function(grunt) {

  grunt.initConfig({
    'testem': {
      files : [
        'path/to/test.html'
      ]
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};