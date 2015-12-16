module.exports = {
    app: {
        options: {
            sourceMap: '<%= target %>/scripts/mue-core.min.map.js'
        },
        src: '<%= target %>/scripts/mue-core.js',
        dest: '<%= target %>/scripts/mue-core.min.js'
    }
};