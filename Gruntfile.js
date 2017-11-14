/**
 * Created by alpipego on 09.12.2016.
 */
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            default: {
                options: {
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    "js/wield-menu.js": "assets/src/wield-menu.js"
                }
            },
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: false,
                },
                files: {
                    "js/wield-menu.js": "assets/src/wield-menu.js"
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    "css/wield-menu.css": "assets/src/wield-menu.css"
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['cssmin', 'uglify:dev']
            },
            sass: {
                files: 'assets/src/**/*.css',
                tasks: ['cssmin']
            },
            js: {
                files: 'assets/src/**/*.js',
                tasks: ['uglify:dev']
            }
        }
    });

    grunt.registerTask('dev', ['cssmin', 'uglify:dev', 'watch']);
    grunt.registerTask('default', ['cssmin', 'uglify']);
};
