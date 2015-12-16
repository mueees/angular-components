module.exports = function (grunt) {
    'use strict';

    return {
        options: {
            globals: {},
            esprimaOptions: {},
            verbose: false
        },
        targetName: {
            files: [
                '<%= src %>/scripts/**/*.js'
            ]
        }
    }
};