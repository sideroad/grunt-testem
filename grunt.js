module.exports = function(grunt) {

  grunt.initConfig({
    'testem': {
      main : {
        launch_in_dev : [
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
