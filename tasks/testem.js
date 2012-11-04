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
      fs = require('fs');
  
  grunt.registerMultiTask( 'testem', 'Execute testem.', function() {
    var done = this.async(),
      that = this,
      data = this.data,
      files,
      tap;

    if(data.json){
      data = _.extend({}, JSON.parse( fs.readFileSync(data.json, 'utf-8').replace(/\n/,'')), data);
    }
    files = data.files || [];
    tap = data.tap;
    delete data.files;
    delete data.tap;
    delete data.json;

    grunt.log.writeln('Now testing...');
    async.reduce(
      files,
      {
        test: [],
        ok: [],
        pass : 0,
        fail : 0,
        not : [],
        tests : 0,
        version : ""
      },
      function(memo, path, callback){
        that.data['test_page'] = path;
        fs.writeFileSync('testem.json', JSON.stringify(that.data));
        exec('testem ci', {}, function( code, stdout, stderr ){
          var result = _.chain(stdout.split('\n')),
            tests = memo.tests,
            test = result.map(function( item ){
              var reg = /^(ok|not ok) (\d+) - ([^\n]+)/,
                  match = item.match(reg);
              return (reg.test(item)) ? match[1]+" "+(Number( match[2] )+tests)+" - "+path+" - "+match[3] : false;
            }).compact().value(),
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

          memo.version = result.find(function(item){
            return /^TAP version (\d+)/i.test(item);
          }).value();
          memo.ok = memo.ok.concat(ok);
          memo.pass += pass;
          memo.fail += fail;
          memo.not = memo.not.concat(not);
          memo.tests += pass+fail;
          memo.test = memo.test.concat(test);

          callback(null, memo);
        });
      },
      function(err, memo){
        var tests = memo.tests,
          pass = memo.pass,
          fail = memo.fail,
          not = memo.not.join('\n'),
          test = memo.test;

        if(tap){
          test.unshift(memo.version);
          test.push('# tests '+ tests );
          test.push('# pass '+ pass );
          test.push('# fail '+ fail );
          fs.writeFileSync(tap, test.join('\n'), 'utf-8');
        }
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
