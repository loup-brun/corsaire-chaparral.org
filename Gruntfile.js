module.exports = function ( grunt ) {

	// Take care of all Grunt plugins in a single line
	require('load-grunt-tasks')(grunt);

	// This is the configuration object Grunt uses to give each plugin its instructions.
	grunt.initConfig({
		// We read in our `package.json` file so we can access the package name and version. It's already there, so we don't repeat ourselves here.

		pkg: grunt.file.readJSON("package.json"),

		assets_path: 'assets/',
		css_path: '<%= assets_path %>css/',
		css_src: '<%= css_path %>_src/',
		js_path: '<%= assets_path %>js/',
		lib_path: '<%= assets_path %>lib/',

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
					'<%= lib_path %>ondomready/ondomready.js',
					'<%= lib_path %>qwery/qwery.js',
					'<%= lib_path %>bean/bean.js',
					'<%= lib_path %>classie/classie.js',
					'<%= lib_path %>FastActive/FastActive.js',

					'<%= js_path %>src/custom.js'
				],
				dest: 
					'<%= js_path %>main.js'
			},
			photosRes: {
				src: [
					'<%= lib_path %>packery/dist/packery.pkgd.min.js',
							'<%= lib_path %>nanoajax/nanoajax.min.js',
							'<%= lib_path %>handlebars/handlebars.js',
							'<%= lib_path %>blazy/blazy.js',

							'<%= js_path %>src/handlebars-helpers.js',
							'<%= js_path %>src/photos-resultats.custom.js'
				],
				dest: '<%= js_path %>photos-resultats.js'
			}
		},

		// minify the sources
		uglify: {
			js: {
				files: [
					{
						// todo: could be done w/ requirejs instead
						'<%= js_path %>main.min.js': ['<%= js_path %>main.js']
					},
					// todo: ibid
					{
						'<%= js_path %>photos-resultats.min.js': ['<%= js_path %>photos-resultats.js']
					}
				]
			}
		},

		sass: {
			// compile different stylesheets to be loaded async
			main: {
				files: {
					'_includes/main.css': '<%= css_src %>main.scss'
				},
			},
			blocks: {
				files: {
					'<%= css_path %>blocks-layout.css': '<%= css_src %>blocks-layout.scss'
				}
			},
			fonts: {
				files: {
					'<%= css_path %>fonts.css': '<%= css_src %>fonts.scss'
				}
			},
			ie: {
				files: {
					'<%= css_path %>ie.css': '<%= css_src %>ie.scss'
				}
			},

			// pass in the options object for sass
			options: {
				style: 'compressed'
			}
		},

		// watch: rebuild parts of site on file change
		watch: {
			sass: {
				files: ['<%= css_src %>**/*.scss'],
				tasks: ['sass']
			},

			js: {
				files: ['<%= js_path %>src/*.js'],
				tasks: ['concat', 'uglify']
			}
		},

		jekyll: {
			options: {

			},
			build: {
				options: {
					//dest: './site', // default
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


	grunt.registerTask( 'default', [ 'concat', 'sass' ] );
	grunt.registerTask( 'build', [ 'sass', 'concat', 'uglify' ]);

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
