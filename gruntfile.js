module.exports = function(grunt){
  "use strict";

  grunt.initConfig({
    browserify: {
      dev: {
        options: {
            debug: true,
            transform: [["babelify", { "stage": 0 }]],
            browserifyOptions: {
              extensions: ['.jsx']
            }
        },
        files: {
            'dist/app.js': 'src/**/*.jsx',
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/static.js': [
              './node_modules/jquery/dist/jquery.min.js',
              './node_modules/bootstrap/dist/js/bootstrap.min.js',
              './node_modules/babel-core/browser-polyfill.min.js',
              './node_modules/cytoscape/lib/dagre.js'
          ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/app.css': [
            './node_modules/bootstrap/dist/css/bootstrap.css', 
            './node_modules/codemirror/lib/codemirror.css',
            './node_modules/react-treeview/react-treeview.css'
          ]
        }
      }
    },
    watch: {
      browserify: {
        files: ['src/**/*.jsx', 'src/**/*.js'],
        tasks: ['browserify:dev']
      },
      options: {
        nospawn: true
      }
    },
    compress: {
      main: {
        options: {
          archive: 'demo.tgz',
        },
        files: [
          {src: ['dist/**','projects/**','index.html'], dest: 'demo/', filter: 'isFile', expand: true}, // includes files in path and its subdirs
        ]
      }
    }    
  })

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.registerTask('default', ['watch']);
//grunt.registerTask('build', ['env:build', 'browserify:build']);
};
