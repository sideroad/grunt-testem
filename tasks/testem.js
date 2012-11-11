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

  var exec = require('child_process').exec,
      async = require('async'),
      _ = require('underscore'),
      testemMulti = require('testem-multi'),
      fs = require('fs');
  
  grunt.registerMultiTask( 'testem', 'Execute testem.', function() {
    var done = this.async(),
      that = this,
      data = this.data,
      tap;

    if(data.json){
      data = _.extend({}, JSON.parse( fs.readFileSync(data.json, 'utf-8').replace(/\n/,'')), data);
    }
    tap = data.tap;
    data.tap = null;
    data.json = null;
    data.files = grunt.file.expandFiles(data.files);

    grunt.log.writeln('Now testing...');
    testemMulti.exec(data, function( results ){
      var result = _.chain(results.split('\n')),
          test = result.map(function( item ){
            return (/^(ok|not ok) (\d+) - ([^\n]+)/.test(item)) ? item : false;
          }).compact().value(),
          tests = test.length,
          ok = result.map(function( item ){
            return (/^ok \d+ - [^\n]+/.test(item)) ? item : false;
          }).compact().value(),
          pass = ok.length,
          not = result.map(function( item ){
            return (/^not ok \d+ - [^\n]+/.test(item)) ? item : false;
          }).compact().value(),
          fail = not.length;

      if(tap){
        fs.writeFileSync(tap, results, 'utf-8');
      }
      if( tests != pass ||
          fail ) {
        grunt.log.error(not.join('\n'));
        grunt.log.error(''+fail+'/'+tests+' assertions failed');
        done(false);
      } else {
        grunt.log.ok(''+tests+' assertions passed');
        done(true);
      }
    });
    
  });

};
