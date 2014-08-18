'use strict';

var grunt = require('grunt');

var commentUsingTestem = /^# using testem/i;
function getNormalizedFile(filepath) {
  var content = grunt.file.read(filepath);
  // Remove the first line # Using testem
  return content.split(/\r?\n/).filter(function (line, i) {
    return !(commentUsingTestem.test(line) && i === 0);
  }).join("\n");
}

exports.testem = {
  success: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('test/actual/success.tap');
    var expected = getNormalizedFile('test/expected/success.tap');
    test.equal(actual, expected, 'should output tap of success case.');

    test.done();
  },
  failed: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('test/actual/failed.tap');
    var expected = getNormalizedFile('test/expected/failed.tap');
    test.equal(actual, expected, 'should output tap of failed case.');

    test.done();
  },
  json: function(test){
    test.expect(1);

    var actual = getNormalizedFile('test/actual/json.tap');
    var expected = getNormalizedFile('test/expected/json.tap');
    test.equal(actual, expected, 'should output tap of json case.');

    test.done();

  },
  bailout: function(test){
    test.expect(1);

    var actual = getNormalizedFile('test/actual/bailout.tap');
    var expected = getNormalizedFile('test/expected/bailout.tap');
    test.equal(actual, expected, 'should output tap of bailout case.');

    test.done();

  }
};