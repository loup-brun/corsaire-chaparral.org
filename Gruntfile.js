module.exports = function ( grunt ) {

  // Take care of all Grunt plugins in a single line
  require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', '!grunt-assemble-*'] });

  var config = {
    'src': 'src',
    'dist': 'dist',
    'temp': '.tmp'
  };


  // This is the configuration object Grunt uses to give each plugin its instructions.
  grunt.initConfig({
    // We read in our `package.json` file so we can access the package name and version. It's already there, so we don't repeat ourselves here.

    year: new Date().getFullYear(),
    pkg: grunt.file.readJSON("package.json"),
    bower: grunt.file.readJSON("bower.json"),
    bowerrc: grunt.file.readJSON(".bowerrc"),
    config: config,
    banner:
    '/** \n' +
    ' * @author <%= pkg.author %> \n' +
    ' * @version <%= pkg.version %> \n' +
    ' * @description <%= pkg.description %> \n' +
    ' * @license <%= pkg.license %> \n' +
    ' */ \n',

    handlebars: {
      compile: {
        options: {
          namespace: 'Handlebars.templates',
          // trim url and extension from template name
          processName: function(filePath) {
            var pieces = filePath.split("/");
            return pieces[pieces.length - 1].replace(/\.hbs$/, '');
          }
        },
        files: {
          '<%= config.src %>/scripts/handlebars/handlebars.templates.js': ['<%= config.src %>/partials/*.hbs'],
        }
      }
    },

    concat: {
      options: {
        separator: ';',
        banner: '<%= banner %>'
      },
      temp: {
        files: {
          '<%= config.temp %>/assets/scripts/vendor.js': [
            '<%= bowerrc.directory %>/qwery/qwery.js',
            '<%= bowerrc.directory %>/bean/bean.js',
            '<%= bowerrc.directory %>/classie/classie.js',
            '<%= bowerrc.directory %>/FastActive/FastActive.js',
            '<%= bowerrc.directory %>/blazy/blazy.js',
            '<%= bowerrc.directory %>/nanoajax/nanoajax.min.js',
            '<%= bowerrc.directory %>/velocity/velocity.js',
            '<%= bowerrc.directory %>/swipe-js/swipe.js'
          ],

          '<%= config.temp %>/assets/scripts/main.js': ['<%= config.src %>/scripts/*.js'],

          '<%= config.temp %>/assets/scripts/photos.custom.js': ['<%= config.src %>/scripts/handlebars/*.js', '<%= config.src %>/scripts/photos/*.js'],

          '<%= config.temp %>/assets/scripts/photos.vendor.js': [
            '<%= bowerrc.directory %>/packery/dist/packery.pkgd.min.js',
            '<%= bowerrc.directory %>/handlebars/handlebars.runtime.js',
            '<%= bowerrc.directory %>/imagesloaded/imagesloaded.pkgd.js',
          ],

          '<%= config.temp %>/assets/scripts/ie.js': ['<%= config.src %>/scripts/ie/*.js'],

          '<%= config.temp %>/assets/scripts/inscription.js': ['<%= config.src %>/scripts/inscription/*.js']

        },
      },
    },

    sass: {
      // compile different stylesheets to be loaded async
      temp: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: [
          { '<%= config.src %>/_templates/partials/main.css.hbs': '<%= config.src %>/styles/main.scss' },
          { '<%= config.temp %>/assets/styles/main.css': '<%= config.src %>/styles/main.scss' },
          { '<%= config.temp %>/assets/styles/blocks-layout.css': '<%= config.src %>/styles/blocks-layout.scss' },
          { '<%= config.temp %>/assets/styles/ie.css': '<%= config.src %>/styles/ie.scss' }
        ],
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'IE 7']
          })
        ]
      },
      temp: {
        src: [ '<%= config.temp %>/assets/styles/*.css', '<%= config.src %>/_templates/partials/main.css.hbs']
      }
    },

    copy: {
      temp: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: '<%= config.src %>/assets',
            src: [
              '**',
              '!**scripts/*',
              '!**styles/*',
            ],
            dest: '<%= config.temp %>/assets'
          },
          {
            expand: true,
            //flatten: true,
            dot: true,
            cwd: '<%= config.src %>',
            src: ['.htaccess', 'robots.txt'],
            dest: '<%= config.temp %>'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: '<%= config.temp %>/assets',
            src: [
              '**',
              '!**scripts/*',
            ],
            dest: '<%= config.dist %>/assets'
          },
          {
            expand: true,
            //flatten: true,
            dot: true,
            cwd: '<%= config.temp %>',
            src: ['.htaccess', 'robots.txt'],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: false,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: false,
          removeComments: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: false,
          removeOptionalTags: false,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.temp %>',
          src: '{,**/}*.html',
          dest: '<%= config.dist %>'
        }]
      },
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.temp %>/assets/scripts',
          src: ['*.js'],
          dest: '<%= config.dist %>/assets/scripts'
        }]
      }
    },

    // watch: rebuild parts of site on file change
    watch: {
      sass: {
        files: ['<%= config.src %>/styles/**/*.scss'],
        tasks: ['sass:temp']
      },
      concat: {
        files: ['<%= config.src %>/scripts/**/*.js'],
        tasks: ['concat:temp']
      },
      handlebars: {
        files: ['<%= config.src %>partials/*.hbs'],
        tasks: ['handlebars']
      },
      assets: {
        files: ['<%= config.src %>/assets/**'],
        tasks: ['copy:temp']
      },
      assemble: {
        files: ['<%= config.src %>/pages/**/*.{hbs,md}', '<%= config.src %>/_templates/**/*.hbs'],
        tasks: ['assemble']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.src %>/pages/**/*.{hbs,md}',
          '<%= config.src %>/_templates/**/*.hbs',
          '<%= config.src %>/assets/**',
          '<%= config.src %>/scripts/**/*.js',
          '<%= config.src %>/styles/*.scss',
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      server: {
        options: {
          base: '<%= config.temp %>',
          index: 'accueil/index.html'
        }
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('<%= config.temp %>'),
              connect.static('<%= config.temp %>/accueil/'),
              //connect().use('/bower_components', connect.static('./bower_components')),
            ];
          }
        }
      }
    },

    // The big task
    assemble: {
      options: {
        //assets: '<%= config.temp %>/assets',
        helpers: [
          'helper-moment',
          '<%= config.src %>/_helpers/*.js'
        ],
        marked: {sanitize: false },
        flatten: true,
        layoutdir: '<%= config.src %>/_templates/layouts',
        layout: 'page.hbs',
        data: '<%= config.src %>/_data/*.{json,yml}',
        partials: ['<%= config.src %>/_templates/partials/*.hbs'],
        plugins: ['grunt-assemble-permalinks'],
        permalinks: {
          structure: ':basename/index:ext'
        },
        baseurl: '',
        collections: [
          {
            name: 'Entraîneurs',
          },
          { 
            name: 'Compétitions',
          },
          {
            name: 'Résultats',
          }
        ]
      },
      pages: {
        options: {
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/pages',
            src: ['*.hbs'],
            dest: '<%= config.temp %>',
            ext: '.html'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/pages/club',
            src: ['*.hbs'],
            dest: '<%= config.temp %>/club',
            ext: '.html'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/pages/club/entraineurs',
            src: ['*.hbs'],
            dest: '<%= config.temp %>/club/entraineurs',
            ext: '.html'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/pages/resultats',
            src: ['{,*/}*.{hbs,md}'],
            dest: '<%= config.temp %>/resultats',
            ext: '.html'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/pages/competitions',
            src: ['*.{hbs,md}'],
            dest: '<%= config.temp %>/competitions',
            ext: '.html'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/pages/communiques',
            src: ['*.{hbs,md}'],
            dest: '<%= config.temp %>/communiques',
            ext: '.html'
          }
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>'
          ]
        }]
      },
      temp: '<%= config.temp %>'
    }
  });

  //grunt.loadNpmTasks('assemble');


  grunt.registerTask(
    'default',
    'Run the build task',
    ['build']
  );

  grunt.registerTask(
    'temp',
    'Build the preliminary site (without minification/optimization) into the <%= config.temp %> directory',
    [
      'clean:temp',
      'handlebars',
      'concat:temp',
      'sass:temp',
      'copy:temp',
      'postcss:temp',
      'assemble',
    ]
  );

  grunt.registerTask(
    'server',
    'Build the preliminary site and serve on port <%= connect.options.port %>',
    [
      'temp',
      'connect:server',
      'watch'
    ]
  );

  grunt.registerTask(
    'build',
    'Build the scripts, stylesheets and output the site in <%= config.dist %>/',
    [
      'temp',
      'clean:dist',
      'uglify:dist',
      'copy:dist',
      'htmlmin:dist'
    ]
  );
};
