module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var userConfig = require('./build.config.js');

    var jsFiles = [
        'src/components/**/*.js'
    ];

    var taskConfig = {
        clean: {
            docs: '<%= docsDir %>',
            dist: '<%= distDir %>',
            temp: '<%= tempDir %>'
        },
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                styles: [],
                scripts: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    '<%= distDir %>/mue.js'
                ],
                sourceLink: true,
                editLink: true,
                editExample: true
            },
            api: {
                src: ['<%= srcDir %>/components/**/*.js'],
                title: 'API Documentation'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= distDir %>/styles.css': '<%= srcDir %>/scss/init.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['<%= srcDir %>/scss/**/*.scss'],
                tasks: ['clean:docs', 'sass:dist', 'concat:css']
            },
            html: {
                files: ['src/components/**/*.html'],
                tasks: ['ngtemplates:development', 'concat:js', 'clean:temp']
            }
        },
        concat: {
            css: {
                src: ['<%= distDir %>/styles.css', '<%= vendorFiles.css %>'],
                dest: '<%= distDir %>/styles.css'
            },
            js: {
                src: ['src/components/mue.module.js', '<%= ngtemplates.dist.dest %>', jsFiles],
                dest: '<%= distDir %>/mue.js'
            }
        },
        ngtemplates: {
            dist: {
                options: {
                    module: 'mue'
                },
                src: '<%= srcDir %>/components/**/**.html',
                dest: '<%= srcTemp %>/templates.js'
            },
            development: {
                options: {
                    module: 'mue'
                },
                src: '<%= srcDir %>/components/**/**.html',
                dest: '<%= developmentDir %>/templates.js'
            }
        },
        uglify: {
            js: {
                files: {
                    '<%= distDir %>/mue.min.js': '<%= distDir %>/mue.js'
                }
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('dev', ['clean:temp', 'clean:dist', 'sass:dist', 'concat:css', 'ngtemplates:development', 'watch']);

    grunt.registerTask('dist', ['clean:temp', 'clean:dist', 'sass:dist', 'concat:css', 'ngtemplates:dist', 'concat:js', 'uglify:js', 'clean:temp']);

    grunt.registerTask('builddoc', ['clean:docs', 'ngdocs']);

    grunt.registerTask('doc', function () {
        grunt.task.run('dist');
        grunt.task.run('builddoc');
    });
};