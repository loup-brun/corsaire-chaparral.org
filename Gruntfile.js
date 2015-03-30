module.exports = function ( grunt ) {

	// Take care of all Grunt plugins in a single line
	require('load-grunt-tasks')(grunt);

	// This is the configuration object Grunt uses to give each plugin its instructions.
	grunt.initConfig({
		// We read in our `package.json` file so we can access the package name and version. It's already there, so we don't repeat ourselves here.

		pkg: grunt.file.readJSON("package.json"),

		// Setup paths
		paths: {
			assets: 'assets/',
			src: '_src/',
			lib: '<%= paths.assets %>lib/',
			css: {
				dist: '<%= paths.assets %>css/',
				src: '<%= paths.src %>css/'
			},
			js: {
				dist: '<%= paths.assets %>js/',
				src: '<%= paths.src %>js/'
			},
			html: {
				src: '<%= paths.src %>html/'
			}
		},

		handlebars: {
			compile: {
				options: {
					namespace: 'Handlebars.templates',
					
					// trim url and extension from template name
					processName: function(filePath) {
						var pieces = filePath.split("/");
						return pieces[pieces.length - 1].replace(/\.html$/, '');
					}
				},
				files: {
					'<%= paths.js.src %>handlebars-templates.js': [
						'<%= paths.html.src %>*.html'
					] 
				}
			}
		},

		concat: {
			options: {
				separator: ';',
				banner:
				'/**' +
				' * @author <%= pkg.author %> \n' +
				' * @version <%= pkg.version %> \n' +
				' * @description <% pkg.description %> \n' +
				' * @license <% pkg.license %> \n' +
				' */ '
			},
			main: {
				// concatenate libraries with general.js > main.js
				src: [
					'<%= paths.lib %>ondomready/ondomready.js',
					'<%= paths.lib %>qwery/qwery.js',
					'<%= paths.lib %>bean/bean.js',
					'<%= paths.lib %>classie/classie.js',
					'<%= paths.lib %>FastActive/FastActive.js',

					'<%= paths.js.src %>/custom.js'
				],
				dest: 
				'<%= paths.js.dist %>main.js'
			},
			photosRes: {
				src: [
					'<%= paths.lib %>packery/dist/packery.pkgd.min.js',
					'<%= paths.lib %>nanoajax/nanoajax.min.js',
					'<%= paths.lib %>handlebars/handlebars.runtime.js',
					'<%= paths.lib %>blazy/blazy.js',

					'<%= paths.js.src %>/handlebars-helpers.js',
					'<%= paths.js.src %>/handlebars-templates.js',
					'<%= paths.js.src %>/photos-resultats.custom.js'
				],
				dest: '<%= paths.js.dist %>photos-resultats.js'
			}
		},

		// minify the sources
		uglify: {
			js: {
				files: [
					{
						'<%= paths.js.dist %>main.min.js': [
							'<%= paths.js.dist %>main.js'
						]
					},
					{
						'<%= paths.js.dist %>photos-resultats.min.js': [
							'<%= paths.js.dist %>photos-resultats.js'
						]
					}
				]
			}
		},

		sass: {
			// compile different stylesheets to be loaded async
			main: {
				files: {
					'<%= paths.css.dist %>main.css': '<%= paths.css.src %>main.scss'
				},
			},
			blocks: {
				files: {
					'<%= paths.css.dist %>blocks-layout.css': '<%= paths.css.src %>blocks-layout.scss'
				}
			},
			fonts: {
				files: {
					'<%= paths.css.dist %>fonts.css': '<%= paths.css.src %>fonts.scss'
				}
			},
			ie: {
				files: {
					'<%= paths.css.dist %>ie.css': '<%= paths.css.src %>ie.scss'
				}
			},

			// pass in the options object for sass
			options: {
				style: 'compressed'
			}
		},

		copy: {
			main: {
				files: [
					{ // copy inline css files into `_includes` directory
						expand: true,
						flatten: true,
						src: [
							'<%= paths.css.dist %>main.css'
						],
						dest: '_includes/'
					}
				]
			}
		},

		// watch: rebuild parts of site on file change
		watch: {
			sass: {
				files: ['<%= paths.css.src %>**/*.scss'],
				tasks: ['sass']
			},

			js: {
				files: ['<%= paths.js.src %>/*.js'],
				tasks: ['concat', 'uglify']
			},

			html: {
				files: ['<%= paths.html.src %>/*.html'],
				tasks: ['handlebars']
			}
		},

		jekyll: {
			options: {

			},
			build: {
				options: {
					//dest: './_site', // default
					config: '_config.yml'
				}
			},
			serve: {
				options: {	
					serve: true
				}
			}
		}
	});


	grunt.registerTask(
		'default',
		'Run the build task',
		['build']
	);
	grunt.registerTask(
		'build',
		'Build the scripts and stylesheets',
		['handlebars', 'concat', 'uglify', 'sass']
	);

	// A utility function to get all app JavaScript sources.
	function filterForJS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.js$/ );
		});
	}

	// A utility function to get all app CSS sources.
	function filterForCSS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.css$/ );
		});
	}


};
