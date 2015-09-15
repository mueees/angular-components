var gulp = require('gulp');

gulp.task('ngdocs', [], function () {
    var gulpDocs = require('gulp-ngdocs');

    var options = {
        html5Mode: false,
        title: "Mue components"
    };

    return gulp.src('src/components/**/*.js')
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
});
