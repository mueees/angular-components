module.exports = function (grunt) {
    'use strict';

    // Set configuration
    (function () {
        var defaultOptions = {
            'livereload-port': '39001',
            'skip-tests': '',
            'skip-validation': ''
        };

        for (var optionName in defaultOptions) {
            var defaultValue = defaultOptions[optionName],
            // cmd --api-host -> env RX_API_HOST
                envName = 'MUE_CORE_' + optionName.toUpperCase().replace(/-/g, '_'),
                value = process.env[envName];

            // command-line option || environment variable || default
            if (grunt.option(optionName) === undefined) {
                grunt.option(optionName, value !== undefined ? value : defaultValue);
            }
        }
    })();

    var _ = require('lodash'),
        path = require('path');

    var config = require('./package.json').config;

    _.forEach(config, function (value, key) {
        grunt.config(key, value);
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    global.getScripts = require(grunt.config.process('<%= dependencies %>/get-scripts'));

    // Vendor code
    global.vendor = grunt.config.process(grunt.file.readJSON('vendors.list.json'));

    grunt.registerTask('validation-wrapper', function () {
        if (!grunt.option('skip-validation')) {
            grunt.task.run(['jshint', 'jsvalidate']);
        } else {
            grunt.log.warn('Skipping validation'.toUpperCase());
        }
    });

    grunt.registerTask('tests-wrapper', function () {
        if (!grunt.option('skip-tests')) {
            grunt.task.run('karma');
        } else {
            grunt.log.warn('Skipping tests'.toUpperCase());
        }
    });

    grunt.registerTask('debug', 'Main task for development', [
        'validation-wrapper',
        'sass:debug',
        'tests-wrapper',
        'sync:resources',
        'concat',
        'ngtemplates',
        'watch'
    ]);

    grunt.registerTask('dev', 'Fastest development task skips tests, jshint and js validation', function () {
        grunt.option('skip-tests', 1);
        grunt.option('skip-validation', 1);
        grunt.task.run('debug');
    });

    grunt.registerTask('default', ['dev']);

    // Load all tasks
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        mergeFunction: require('recursive-merge'),
        data: config,
        loadGruntTasks: {
            pattern: ['grunt-*'],
            config: require('./package.json'),
            scope: 'devDependencies'
        }
    });
};