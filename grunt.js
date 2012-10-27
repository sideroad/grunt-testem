module.exports = function(grunt) {

  grunt.initConfig({
    'testem': {
      main : {
        browsers : [
          'chrome',
          'safari'
        ],
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
