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

		//Minify the sources
		uglify: {
			js: {
				files: [
					{
						'<%= js_path %>custom.min.js': [
							'<%= lib_path %>ondomready/ondomready.js',
							'<%= lib_path %>qwery/qwery.js',
							'<%= lib_path %>classie/classie.js',
							'<%= lib_path %>bean/bean.js',
							'<%= lib_path %>FastActive/FastActive.js',
							'<%= js_path %>custom.js',

						]
				},
					{
						'<%= js_path %>photo-layout.min.js': [
							'<%= lib_path %>packery/dist/packery.pkgd.js',
							'<%= lib_path %>blazy/blazy.js',
							'<%= lib_path %>nanoajax/nanoajax.min.js',
							'<%= js_path %>photo-layout.js'
						]
					}
				]
			}
		},

		sass: {
			main: {
				files: {
					'_includes/main.css': '<%= css_src %>main.scss'
				},
			},

			photo: {
				files: {
					'<%= css_path %>photo-layout.css': '<%= css_src %>photo-layout.scss'
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

			options: {
				style: 'compressed'
			}
		},

		watch: {
			sass: {
				files: ['<%= css_src %>**/*.scss'],
				tasks: ['sass']
			},

			js: {
				files: ['<%= js_path %>custom.js', '<%= js_path %>photo-layout.js'],
				tasks: ['js']
			}
		}

	});

	grunt.registerTask( 'js', [ 'uglify:js' ]);
	grunt.registerTask( 'css', [ 'sass' ]);
	grunt.registerTask( 'default', [ 'js', 'sass' ] );
	grunt.registerTask( 'build', [ 'sass', 'js' ]);

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
