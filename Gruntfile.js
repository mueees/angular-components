module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        clean: {
            docs: 'docs'
        },
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                styles: [
                    'assets/mue.css'
                ],
                scripts: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'src/mue.module.js',
                    'src/components/tag/tag.directive.js'
                ],
                sourceLink: true,
                editLink: true,
                editExample: true
            },
            api: {
                src: ['src/components/**/*.js'],
                title: 'API Documentation'
            }
        },
        watch: {
            src: {
                files: ['src/**/*.js'],
                tasks: ['clean:docs', 'ngdocs']
            }
        }
    });

    grunt.registerTask('default', ['clean:docs', 'ngdocs', 'watch:src']);
};