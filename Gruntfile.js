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
                styles: [
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
                    '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
                    '<%= distDir %>/styles.css'
                ],
                scripts: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/moment/moment.js',
                    'bower_components/lodash/lodash.js',
                    '<%= distDir %>/mue.js'
                ],
                sourceLink: true,
                editLink: true,
                editExample: true
            },
            api: {
                src: ['<%= srcDir %>/core/components/**/*.js'],
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
                tasks: ['clean:docs', 'sass:dist', 'concat:css', 'copy:dist']
            },
            js: {
                files: ['<%= srcDir %>/core/mue.module.js', jsFiles],
                tasks: ['ngtemplates:dist', 'concat:js', 'ngAnnotate:main', 'uglify:js', 'clean:temp', 'copy:dist']
            },
            html: {
                files: ['<%= srcDir %>/core/**/*.html'],
                tasks: ['ngtemplates:dist', 'concat:js', 'ngAnnotate:main', 'uglify:js', 'clean:temp', 'copy:dist']
            }
        },
        concat: {
            css: {
                src: ['<%= distDir %>/styles.css', '<%= vendorFiles.css %>'],
                dest: '<%= distDir %>/styles.css'
            },
            js: {
                src: ['<%= srcDir %>/core/template.module.js', '<%= ngtemplates.dist.dest %>', jsFiles],
                dest: '<%= distDir %>/mue.js'
            }
        },
        ngtemplates: {
            dist: {
                options: {
                    module: 'mue.template'
                },
                src: '<%= srcDir %>/core/**/**.html',
                dest: '<%= tempDir %>/templates.js'
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
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/scss',
                src: '**',
                dest: 'dist/src/scss',
                flatten: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: '**',
                        dest: '../calendar-client-angular/app/vendor/components',
                        flatten: false
                    },
                    {
                        expand: true,
                        cwd: 'dist',
                        src: '**',
                        dest: '../calendar-client-angular/build/app/vendor/components',
                        flatten: false
                    }
                ]
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('dist', [
        'clean:temp',
        'clean:dist',
        'sass:dist',
        'concat:css',
        'ngtemplates:dist',
        'concat:js',
        'ngAnnotate:main',
        'copy:main',
        'uglify:js',
        'clean:temp',
        'copy:dist'
    ]);

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