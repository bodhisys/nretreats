const gulp = require('gulp');
const sass = require('gulp-sass');
const header = require('gulp-header');
const pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Natural Retreats Theme - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');

// Compiles SCSS files from /scss into /css
// NOTE: This theme uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
gulp.task('sass', function() {
    return gulp.src('redesign/sass/**/*.scss')
        .pipe(sass())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
});

// Run everything
gulp.task('default',function() {
    gulp.watch('redesign/sass/**/*.scss',['sass']);
});



