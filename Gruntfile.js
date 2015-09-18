module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var userConfig = require('./build.config.js');

    var jsFiles = [
        'src/core/**/*.module.js',
        'src/core/**/*.config.js',
        'src/core/**/*.routes.js',
        'src/core/**/*.constant.js',
        'src/core/**/*.value.js',
        'src/core/**/*.run.js',
        'src/core/**/*.service.js',
        'src/core/**/*.class.js',
        'src/core/**/*.directive.js',
        'src/core/**/*.controller.js',
        'src/core/**/*.resource.js',
        'src/core/**/*.filter.js'
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
                src: ['<%= srcDir %>/core/**/*.js'],
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
            js: {
                files: ['<%= srcDir %>/core/mue.module.js', jsFiles],
                tasks: ['ngtemplates:dist', 'concat:js', 'ngAnnotate:main', 'uglify:js', 'clean:temp']
            },
            html: {
                files: ['<%= srcDir %>/core/**/*.html'],
                tasks: ['ngtemplates:dist', 'concat:js', 'ngAnnotate:main', 'uglify:js', 'clean:temp']
            }
        },
        concat: {
            css: {
                src: ['<%= distDir %>/styles.css', '<%= vendorFiles.css %>'],
                dest: '<%= distDir %>/styles.css'
            },
            js: {
                src: ['<%= srcDir %>/core/mue.module.js', '<%= ngtemplates.dist.dest %>', jsFiles],
                dest: '<%= distDir %>/mue.js'
            }
        },
        ngtemplates: {
            dist: {
                options: {
                    module: 'mue'
                },
                src: '<%= srcDir %>/core/**/**.html',
                dest: '<%= srcTemp %>/templates.js'
            }
        },
        uglify: {
            js: {
                files: {
                    '<%= distDir %>/mue.min.js': '<%= distDir %>/mue.js'
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            main: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '.',
                        src: '<%= distDir %>/mue.js'
                    }
                ]
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('dist', ['clean:temp', 'clean:dist', 'sass:dist', 'concat:css', 'ngtemplates:dist', 'concat:js', 'ngAnnotate:main', 'uglify:js', 'clean:temp']);

    grunt.registerTask('dev', function () {
        grunt.task.run('dist');
        grunt.task.run('watch');
    });

    grunt.registerTask('builddoc', ['clean:docs', 'ngdocs']);

    grunt.registerTask('doc', function () {
        grunt.task.run('dist');
        grunt.task.run('builddoc');
    });
};