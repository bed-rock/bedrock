module.exports = function (grunt) {
  grunt.initConfig({

    watch: {
      scripts: {
        files: [ 'Gruntfile.js', 'js/*.js', 'css/*.css', '!**/all.**' ],
        tasks: ['prod'],
        options: {
          interrupt: true,
          livereload: true,
        },
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['css'],
        options: {
          interrupt: true,
          livereload: true,
        }
      }
    },

    sass: {
      options: {
        style: 'expanded',
        sourcemap: 'none',
        noCache: true
      },
      single_file: {
        files: {
          'dist/css/style.css': 'scss/general.scss',
          'components/atoms/br-selectbox/dist/br-selectbox.css': 'components/atoms/br-selectbox/src/br-selectbox.scss'
        }
      },
      // multiple_files: {
      //   files: [{
      //     expand: true,
      //     cwd: 'scss/',
      //     src: ['*.scss', '!_*.scss'],
      //     dest: 'assets/css/source/',
      //     ext: '.css'
      //   }]
      // }
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: [
          '*.css', '!*.min.css'
          ],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      my_target: {
        files: [{
          expand: true,
          flatten: true,
          mangle: false,
          cwd: 'dist/js/',
          src: [
          '*.js',
          '!*.min.js'
          ],
          dest: 'dist/js/',
          ext: '.min.js'
        }]
      }
    },

    concat: {
      basic: {
        files: {
          'css/style.css': [
            'vendor/normalize.css/normalize.css',
            'css/style.css',
            'vendor/flexboxgrid/dist/flexboxgrid.min.css',
          ],
        },
      },
      // extras: {
      //   options: {
      //     separator: ';'
      //   },
      //   files: {
      //     'js/all.js': [
      //     'js/minified/move-top.min.js',
      //     ],
      //   }
      // }
    },

    postcss: {
      options: {
        safe: true,
        processors: [
          require('autoprefixer-core')({browsers: 'last 2 version'}),
          // require('csswring')
        ]
      },
      dist: {
        expand: true,
        cascade: true,
        remove: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    }

  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');

grunt.registerTask( 'default', [ 'sass', 'postcss', 'concat:basic' ] );
grunt.registerTask( 'css', [ 'sass', 'postcss', 'cssmin' ] );
grunt.registerTask( 'js', [ 'uglify', 'concat' ] );

};