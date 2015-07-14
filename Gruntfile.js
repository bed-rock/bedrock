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
        files: ['assets/**/*.scss'],
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
          'css/style.css': 'scss/general.scss'
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
          cwd: 'assets/css/source/',
          src: [
          '*.css', '!_*.css'
          ],
          dest: 'assets/css/minified/',
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
          cwd: 'js/',
          src: [
          '*.js',
          '!*.min.js',
          '!all.js',
          ],
          dest: 'js/minified/',
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
          ],
        },
      },
      extras: {
        options: {
          separator: ';'
        },
        files: {
          'js/all.js': [
          'js/minified/move-top.min.js',
          'js/minified/easing.min.js',
          'js/minified/responsiveslides.min.js',
          'js/minified/jquery.mixitup.min.js',
          'js/minified/jquery.flexisel.min.js',
          ],
        }
      }
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
        cwd: 'css/',
        src: ['*.css'],
        dest: 'css/'
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
grunt.registerTask( 'css', [ 'sass', 'postcss', 'cssmin', 'concat:basic' ] );
grunt.registerTask( 'js', [ 'uglify', 'concat' ] );

};