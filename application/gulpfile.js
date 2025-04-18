var gulp = require('gulp');
var less = require('gulp-less');



gulp.task('less', function() {
    console.log('Starting LESS compilation...');
    gulp.src('less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./public/static/css'));
    console.log('...done');
});

/* Task to watch less changes */
gulp.task('watch', function() {
    gulp.watch('less/**/*.less' , ['less']);
});

gulp.task('default', gulp.series(['watch']));
gulp.task('build', gulp.series(['less']));