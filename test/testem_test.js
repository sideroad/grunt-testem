'use strict';

var grunt = require('grunt');

function getNormalizedFile(filepath) {
  return grunt.util.normalizelf(grunt.file.read(filepath));
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
  }
};