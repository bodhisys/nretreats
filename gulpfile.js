const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
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

gulp.task('scripts', function(){
    return gulp.src('redesign/scripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('scripts'))
        .pipe(gulp.rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts'));
});

// Run everything
gulp.task('default',function() {
    gulp.watch('redesign/sass/**/*.scss',['sass']);
    gulp.watch('redesign/scripts/**/*.js',['scripts']);
});



