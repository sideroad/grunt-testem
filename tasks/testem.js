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
      _ = require('underscore'),
      fs = require('fs');
  
  grunt.registerMultiTask( 'testem', 'Execute testem.', function() {
    var done = this.async(),
      that = this,
      browsers = this.data.launch_in_dev||[],
      ci = (browsers.length) ? ' -l ' + browsers.join(',') : '',
      files = this.data.files || [];

    grunt.log.writeln('Now testing...');
    async.reduce(
      files,
      {
        ok: [],
        pass : 0,
        fail : 0,
        not : [],
        tests : 0
      },
      function(memo, path, callback){
        that.data['test_page'] = path;
        fs.writeFileSync('testem.json', JSON.stringify(that.data));
        exec('testem ci'+ci, {}, function( code, stdout, stderr ){
          var result = _.chain(stdout.split('\n')),
            ok = result.map(function( item ){
              return (/^ok \d+ - [^\n]+/.test(item)) ? item : false;
            }).compact().value(),
            pass = ok.length,
            not = result.map(function( item ){
              return (/^not ok \d+ - [^\n]+/.test(item)) ? item : false;
            }).compact().value(),
            fail = not.length;

          if(not.length) {
            not.unshift(path);
          }

          memo.ok = memo.ok.concat(ok);
          memo.pass += pass;
          memo.fail += fail;
          memo.not = memo.not.concat(not);
          memo.tests += pass+fail;

          callback(null, memo);
        });
      },
      function(err, memo){
        var tests = memo.tests,
          pass = memo.pass,
          fail = memo.fail,
          not = memo.not.join('\n');
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
    );
    
  });

};
