module.exports = {
    resources: {
        expand: true,
        flatten: false,
        cwd: '<%= src %>',
        src: [
            'resources/**'
        ],
        dest: '<%= target %>'
    }
};