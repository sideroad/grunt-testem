module.exports = function(grunt) {

    grunt.initConfig({
        'testem': {
            ci : []
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'testem');

};