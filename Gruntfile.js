/**
 * Created by alpipego on 09.12.2016.
 */
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            files: {
                "assets/wield-menu.js": "assets/src/wield-menu.js"
            }
        },
        cssmin: {
            target: {
                files:
                    {
                        "assets/wield-menu.css": "assets/src/wield-menu.css"
                    }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['cssmin', 'uglify']
            },
            sass: {
                files: 'assets/src/**/*.css',
                tasks: ['cssmin']
            },
            js: {
                files: 'assets/src/**/*.js',
                tasks: ['uglify']
            }
        }
    });

    grunt.registerTask('default', ['cssmin', 'uglify']);
};
