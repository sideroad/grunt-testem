/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt) {

  var exec = require('child_process').exec,
      async = require('async'),
      fs = require('fs');
  
  grunt.registerTask( 'testem', 'Execute testem.', function() {
    
    var done = this.async(),
      browsers = grunt.config('testem.browsers')||[],
      ci = (browsers.length) ? ' -b ' + browsers.join(',') : '';
    
    async.reduce(
      grunt.config('testem.files'),
      {
        pass : 0,
        fail : 0,
        not : [],
        tests : 0
      },
      function(memo, path, callback){
        fs.writeFileSync('testem.json', '{"test_page":"'+path+'"}');
          
        exec( 'testem ci'+ci, {}, function( code, stdout, stderr ){
          var pass = (stdout.match(/\nok \d+ - [^\n]+/g)||[]).length,
            not = (stdout.match(/\nnot ok \d+ - [^\n]+/g)||[]),
            fail = not.length,
            tests = pass + fail;
          memo.pass += pass;
          memo.fail += fail;
          memo.not = memo.not.concat(not);
          memo.tests += tests;

          callback(null, memo);
        });      
      },
      function(err, memo){
        var tests = memo.tests,
          pass = memo.pass,
          fail = memo.fail,
          not = memo.not.join('');
          
        if( tests != pass ||
            fail ||
            not ||
            err ) {
          grunt.log.error(not);
          grunt.log.error(''+fail+'/'+tests+' assertions failed');
          done(false);
        } else {  
          grunt.log.ok(''+tests+' assertions passed');
          done(true);
        }
      }
    )
    
    grunt.log.writeln('Now testing...');
  });

};
