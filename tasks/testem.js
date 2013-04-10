/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt) {
  "use strict";

  var async = require('async'),
      _ = require('underscore'),
      fs = require('fs');

  grunt.registerMultiTask( 'testem', 'Execute testem.', function() {
    var done = this.async(),
      that = this,
      options = this.options(),
      files = [];

    if(options.json){
      options = _.extend({}, JSON.parse( fs.readFileSync(options.json, 'utf-8').replace(/\n/,'')), options);
    }
    grunt.log.writeln('Now testing...');

    this.files.forEach(function(f) {
      var tap = f.dest,
          files = f.src.filter(function(filepath) {
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          }),
          testemMulti = require('testem-multi');

      options.files = files;

      testemMulti.exec(options);

      testemMulti.on('data', function( data ){
        var matches={};
        data = ''+data;
        matches.path = data.match(/^# Executing (.+)$/);
        matches.fail = data.match(/^not ok (.+)/);
        if(matches.path){
          grunt.log.writeln(matches.path[0]);
        }
        if(matches.fail){
          grunt.log.error(matches.fail[0]);
        }
        grunt.verbose.write(''+data);
      });
      testemMulti.on('exit', function( results, memo ){
        var tests = memo.tests,
            pass = memo.pass,
            not = memo.not,
            fail = memo.fail;

        if(tap){
          fs.writeFileSync(tap, results, 'utf-8');
        }
        if( tests != pass ||
            fail ) {
          grunt.log.error(''+fail+'/'+tests+' assertions failed');
          done(options.force || false);
        } else {
          grunt.log.ok(''+tests+' assertions passed');
          done(true);
        }
      });
    });
  });

};
