var _ = require('lodash');

module.exports = function (grunt) {
    'use strict';

    return _.mapValues({
        debug: {
            options: {
                outputStyle: 'expanded'
            }
        },
        release: {
            options: {
                outputStyle: 'compressed'
            }
        }
    }, function (value) {
        return _.merge({
            options: {
                sourceMap: true
            },
            files: _.mapKeys({
                '<%= target %>/resources/css/mue-core.css': '<%= src %>/resources/scss/init.scss'
            }, function (value, key) {
                return grunt.config.process(key);
            })
        }, value);
    });
};