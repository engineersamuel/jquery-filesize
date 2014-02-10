module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-mocha-test");

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("filesize.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.filesize.js"],
				dest: "dist/jquery.filesize.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["dist/jquery.filesize.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.filesize.js"],
				dest: "dist/jquery.filesize.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// CoffeeScript compilation
		coffee: {
          compileWithMaps: {
            options: {
              sourceMap: true
            },
            files: {
              'dist/jquery.filesize.js': 'src/jquery.filesize.coffee',
              'test/jquery.filesize.spec.js': 'test/jquery.filesize.spec.coffee'
            }
          }
		},

//                    require: ['coffee-script/register',"./globals.js", 'should']
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: ['coffee-script', 'should']
                },
                src: ['test/**/*.coffee']
            }
        }
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-coffee");

	grunt.registerTask("default", ["coffee", "jshint", "mochaTest", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};
