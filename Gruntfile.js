var pkg = require('./package.json');


//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
module.exports = function(grunt) {
  'use strict';

  var date = new Date();
  var today = date.toDateString() + ' ' + date.toLocaleTimeString();
  var banner = '/*! <%= pkg.name %> v<%= pkg.version %> - ' + today + '. (c) ' + date.getFullYear() + ' Miguel Castillo. Licensed under MIT */';

  grunt.initConfig({
    pkg: pkg,
    connect: {
      test: {
        options: {
          port: 8912,
          hostname: 'localhost'
        }
      },
      keepalive: {
        options: {
          port: 8919,
          host: 'localhost',
          keepalive: true,
          open: 'http://localhost:8919/test/SpecRunner.html'
        }
      }
    },
    mocha: {
      test: {
        options: {
          log: true,
          logErrors: true,
          reporter: 'Spec',
          run: false,
          timeout: 10000,
          urls: ['http://localhost:8912/test/SpecRunner.html']
        }
      }
    },
    watch: {
      test: {
        files: ['src/**/*.js', 'test/**/*.js', '*.js'],
        tasks: ['jshint:all', 'browserify:build'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        options: {
          jshintrc: true,
          reporter: require('jshint-stylish')
        },
        src: ['src/**/*.js', 'test/**/*.js', '*.js']
      }
    },
    concurrent: {
      test: {
        tasks: ['connect:keepalive', 'watch:test'],
        options: {
          logConcurrentOutput : true
        }
      }
    },
    browserify: {
      build: {
        files: {
          'dist/index.js': ['src/index.js']
        },
        options: {
          banner: banner,
          browserifyOptions: {
            detectGlobals: false,
            standalone: 'index'
          }
        }
      }
    },
    uglify: {
      build: {
        options: {
          preserveComments: 'some',
          sourceMap: true
        },
        files: {
          'dist/index.min.js': ['dist/index.js']
        }
      }
    },
    release: {
      options: {
        tagName: 'v<%= version %>',
        tagMessage: 'Version <%= version %>',
        commitMessage: 'Release v<%= version %>',
        afterBump: [
          'build'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('build', ['jshint:all', 'browserify:build', 'uglify:build']);
  grunt.registerTask('serve', ['concurrent:test']);
};
