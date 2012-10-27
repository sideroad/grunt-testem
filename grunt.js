module.exports = function(grunt) {

  grunt.initConfig({
    'testem': {
      browsers : [
        'chrome',
        'safari'
      ],
      files : [
        'path/to/test.html'
      ]
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'testem');

};
