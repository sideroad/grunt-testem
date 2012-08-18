/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt) {

  var exec = require('child_process').exec;
  
  grunt.registerMultiTask( 'testem', 'Execute testem.', function() {
    
    var done = this.async(),
      browsers = (this.data.length) ? ' -b ' + this.data.join(',') : '';

    exec( 'testem ci'+browsers, {}, function( code, stdout, stderr ){
        var tests = +(stdout.match(/\n# tests\s+(\d+)/)||[0])[1],
          pass = +(stdout.match(/\n# pass\s+(\d+)/)||[0])[1],
          fail = +(stdout.match(/\n# fail\s+(\d+)/)||[0])[1],
          not = (stdout.match(/\nnot ok \d+ - [^\n]+/g)||['']).join('');
        
        if( tests != pass ||
            fail ||
            not ||
            stderr ) {
          grunt.log.error(not);
          grunt.log.error(''+fail+'/'+tests+' assertions failed');
          done(false);
        } else {  
          grunt.log.ok(''+tests+' assertions passed');
          done(true);
        }
    });
    grunt.log.writeln('Now testing...');
  });


};
