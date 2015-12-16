module.exports = function (grunt) {
    return {
        options: {
            spawn: false
        },
        'scripts-app': {
            files: '<%= src %>/scripts/**/*.js',
            tasks: ['validation-wrapper', 'tests-wrapper', 'concat', 'ngtemplates']
        },
        'templates-app': {
            files: '<%= src %>/scripts/**/*.html',
            tasks: ['tests-wrapper', 'concat', 'ngtemplates']
        },
        'resources-app': {
            files: '<%= src %>/resources/**/*',
            tasks: ['tests-wrapper', 'sync:resources']
        }
    };
};