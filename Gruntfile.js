module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Clean
        clean: {
          all: ['web/*.html']
        }, // end clean
        
        // Build HTML
        assemble: {
            options: {
                layout: "src/layouts/default.hbs",
                partials: ['src/partials/**/*.hbs'],
                helpers: ['handlebars-helper-isActive', 'foo/*.js'],
                helpers: ['handlebars-helper-autolink', 'foo/*.js'],
                flatten: true
            },
            pages: {
                files: {
                    'web/': ['src/pages/*.hbs']
                }
            }
        }, // end assemble 

        // Ensure code quality
        scsslint: {
          allFiles: [
            'scr/sass/css/ui/*.scss',
          ],
          options: {
            bundleExec: true,
            config: '.scss-lint.yml',
            reporterOutput: 'scss-lint-report.xml',
            colorizeOutput: true
          },
        },// end scsslint

        // Compile sass
        sass: {
          dev: {
            options: {
              //quiet: true,
              style: 'expanded' 
            },
            files: {
              'web/css/style.css': 'src/sass/css/style.scss'
            }
          },
          dist: {
            options: {
              quiet: true,
              style: 'compressed' 
            },
            files: {
              'web/css/style.css': 'src/sass/css/style.scss'
            }
          }
        },// end sass

        // Auto Vendor Prefix CSS
        autoprefixer: {
          options: {
            browsers: ['last 2 version',  '> 5%', 'ie >= 8']
          },
          multiple_files: {
            expand: true,
            flatten: true,
            src: 'web/css/*.css',
            dest: 'web/css/'
          },
        }, // end autoprefixer

        // JS
        uglify: {
          build: {
            options: {
              mangle: false
            },
            files: {
              'web/js/app.js': [
              'src/js/main.js', 
              'src/js/plugins/*.js',
              ], 
              'web/js/vendor/modernizr-2.6.2.min.js':  [ 'src/js/vendor/modernizr-2.6.2.min.js', ],
              'web/js/vendor/jquery-1.10.2.min.js': [ 'src/js/vendor/jquery-1.10.2.min.js', ]       
            }
          }
        }, // end JS
        
        // JS Hint 
        jshint: {
          ignore_warning: {
            options: {
              //'-W015': true,
            },
            src: ['**/*.js'],
          },
          options: {
            jshintrc: '.jshintrc',
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true
            },
          },
          all: ['scr/js/{,**/}*.js', '!scr/js/{,**/}*.min.js']
        }, // end JSHint
        
        // Images
        imagemin: {
          dynamic: {
              files: [{
                  expand: true,
                  cwd: 'src/images/',
                  src: ['**/*.{png,jpg,gif}'],
                  dest: 'web/images/'
              }]
          }
        }, // imagemin

        // Combine Media Queries
        cmq: {
          options: {
            log: true
          },
          dev: {
            files: {
              'web/css/style.css': 'web/css/style.css'
            }
          },
          dist: {
            files: {
              'web/css/style.css': 'web/css/style.css'
            }
          }
        }, // end cmq

        // Simply copy the fonts over
        copy: {
          files: {
            cwd: 'src/fonts',
            src: '**/*',
            dest: 'web/fonts',
            expand: true 
          }
        }, // end copy
        
        // SVG Optimisation
        svgmin: {
          options: { 
              plugins: [{
                  removeViewBox: false
              }, {
                  removeUselessStrokeAndFill: false
              }, {
                  convertPathData: { 
                      straightCurves: false
                  }
              }]
          },
          dist: {
              files: [{              
                  expand: true,      
                  cwd: 'src/images',  
                  src: ['**/*.svg'],  
                  dest: 'web/images/', 
                  ext: '.svg'
              }]
          }
        }, // end svgmin

        // Watch for changes
        watch: {
          options: {
            livereload: true,
          },
          html: {
            files: ['**/*.hbs'],
            tasks: ['assemble']
          },
          css: {
            files: '**/*.scss',
            tasks: ['sass:dev', 'autoprefixer', 'cmq:dev']
          },
          scripts: {
            files: ['src/js/{,**/}*.js', '!src/js/{,**/}*.min.js'],
            tasks: ['uglify'], 
            options: {
              spawn: false
            }
          },
          images: {
            files: ['src/images/**']
          },
          registry: {
            files: ['{,**}/*.{hbs}'],
            options: {
              livereload: true
            }
          },
        } // end watch
    });
    

    // HTML
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // CSS
    grunt.loadNpmTasks('grunt-scsslint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-autoprefixer');
    // JS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // IMAGES
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // GRAPHICS
    grunt.loadNpmTasks('grunt-svgmin');
    // COPY 
    grunt.loadNpmTasks('grunt-contrib-copy');
    // WATCH
    grunt.loadNpmTasks('grunt-contrib-watch');


    // default task
    grunt.registerTask('default', [
      'dev'
    ]);

    // development task
    grunt.registerTask('dev', [
      'clean',
      'assemble',
      'scsslint',
      'sass:dev', 
      'autoprefixer',
      'uglify',
      // 'jshint', // @TODO fix this - task hangs
      'imagemin',
      'svgmin',
      'cmq:dev',
      'copy',
      'watch'
    ]);

    // build task
    grunt.registerTask('build', [
      'clean',
      'assemble',
      'sass:dist', 
      'autoprefixer',
      'uglify',
      // 'jshint', // @TODO fix this - task hangs
      'imagemin',
      'svgmin',
      'cmq:dist',
      'copy',
      'watch'
    ]);
};