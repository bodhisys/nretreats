const gulp = require('gulp');
const sass = require('gulp-sass');

// Compiles SCSS files from /scss into /css
// NOTE: This theme uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
gulp.task('sass', function() {
    return gulp.src('css/redesign/redesign.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
});

// Run everything
gulp.task('default', ['sass']);



