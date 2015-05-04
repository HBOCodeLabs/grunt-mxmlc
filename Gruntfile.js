/*
 * grunt-mxmlc
 * https://github.com/JamesMGreene/grunt-mxmlc
 *
 * Copyright (c) 2015 James M. Greene, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    mxmlc: {
      options: {
        rawConfig: '+configname=air'
      },
      testCompileSuccess: {
        src: ['test/testData/testApp.as'],
        dest: 'tmp/testApp.swf'
      },
      testCompileFailureDueToSynaxError: {
        options: {
          // `force: true` is required to not fail the Grunt run (as we KNOW this one should cause an error)
          force: true
        },
        src: ['test/testData/errorApp.as'],
        dest: 'tmp/errorApp.swf'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/**/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'compc', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('travis', ['jshint', 'test']);

};
