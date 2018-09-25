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
          'assets/scripts/vendor.js': [
            '<%= bowerrc.directory %>/qwery/qwery.js',
            '<%= bowerrc.directory %>/bean/bean.js',
            '<%= bowerrc.directory %>/classie/classie.js',
            '<%= bowerrc.directory %>/FastActive/FastActive.js',
            '<%= bowerrc.directory %>/blazy/blazy.js',
            '<%= bowerrc.directory %>/nanoajax/nanoajax.min.js',
            '<%= bowerrc.directory %>/velocity/velocity.js',
            '<%= bowerrc.directory %>/swipe-js/swipe.js'
          ],

//          'assets/scripts/main.js': ['<%= config.src %>/scripts/*.js'],

          'assets/scripts/photos.custom.js': ['<%= config.src %>/scripts/handlebars/*.js', '<%= config.src %>/scripts/photos/*.js'],

          'assets/scripts/photos.vendor.js': [
            '<%= bowerrc.directory %>/packery/dist/packery.pkgd.min.js',
            '<%= bowerrc.directory %>/handlebars/handlebars.runtime.js',
            '<%= bowerrc.directory %>/imagesloaded/imagesloaded.pkgd.js',
          ],

          'assets/scripts/ie.js': ['<%= config.src %>/scripts/ie/*.js'],

          'assets/scripts/inscription.js': [
            //'<%= bowerrc.directory %>/nanoajax/nanoajax.min.js',
            '<%= config.src %>/scripts/inscription/*.js'
          ]

        },
      },
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.temp %>/static/scripts',
          src: ['*.js'],
          dest: '<%= config.dist %>/static/scripts'
        }]
      }
    },

    // watch: rebuild parts of site on file change
    watch: {
      concat: {
        files: ['<%= config.src %>/scripts/**/*.js'],
        tasks: ['concat:temp']
      },
      handlebars: {
        files: ['<%= config.src %>partials/*.hbs'],
        tasks: ['handlebars']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

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
      'concat:temp'
    ]
  );

  grunt.registerTask(
    'server',
    'Build the preliminary site and serve on port <%= connect.options.port %>',
    [
      'temp',
      'watch'
    ]
  );

  grunt.registerTask(
    'build',
    'Build the scripts, stylesheets and output the site in <%= config.dist %>/',
    [
      'temp',
      'uglify:dist'
    ]
  );
};
