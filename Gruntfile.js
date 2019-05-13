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
                    "js/wield-menu.min.js": "js/wield-menu.dev.js"
                }
            },
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: {
                    "js/wield-menu.js": "js/wield-menu.dev.js"
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    "css/wield-menu.min.css": "css/wield-menu.css"
                }
            }
        },

        wp_readme_to_markdown: {
            dist: {
                files: {
                    'README.md': 'readme.txt'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['cssmin', 'uglify:dev']
            },
            sass: {
                files: 'css/wield-menu.css',
                tasks: ['cssmin']
            },
            js: {
                files: 'js/*.dev.js',
                tasks: ['uglify:dev']
            }
        }
    });

    grunt.registerTask('dev', ['cssmin', 'uglify', 'watch']);
    grunt.registerTask('default', ['cssmin', 'uglify', 'wp_readme_to_markdown']);
};
