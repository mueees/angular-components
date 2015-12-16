module.exports = {
    app: {
        cwd: '<%= src %>',
        src: ['scripts/**/*.html'],
        dest: '<%= target %>/scripts/mue-core.js',
        options: {
            htmlmin: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true
            },
            module: 'mue.helpers',
            append: true,
            bootstrap: function(module, script) {
                return [
                    '(function () {',
                    '  angular.module(\'' + module + '\').run([\'$templateCache\', function($templateCache) {',
                    script,
                    '  }]);',
                    '})();'].join('\n');
            }
        }
    }
};