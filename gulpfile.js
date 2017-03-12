const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const order = require('gulp-order');
const pkg = require('./package.json');

/*******************************************************/
// Generating JS files per folder
var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var scriptsPath = 'redesign/scripts';

function getFolders(dir){
    return fs.readdirSync(dir)
        .filter(function(file){
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('folderscripts', function(){
    var folders = getFolders(scriptsPath);

    // folders.map - executes the function once per folder, and returns the async stream
    var tasks = folders.map(function(folder){
        return gulp.src(path.join(scriptsPath, folder, '/**/*.js'))
            .pipe(concat(folder + '.js'))
            .pipe(gulp.dest('scripts'))
            .pipe(uglify())
            .pipe(rename(folder + '.min.js'))
            .pipe(gulp.dest('scripts/min'));
    });

    // process all remaining files in scriptsPath root into main.js and main.min.js files
    var root = gulp.src(path.join(scriptsPath, '/*.js'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('scripts'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('scripts/min'));

    // merge - combines the streams and ends only when all streams emitted end
    return merge(tasks, root);
});
/*******************************************************/

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

gulp.task('scripts', ['folderscripts'], function(){
    return gulp.src(['redesign/scripts/lib.js', 'redesign/scripts/components.js', 'redesign/scripts/page.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('scripts'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts/min'));
});

// Run everything
gulp.task('default', ['sass', 'scripts'], function() {
    gulp.watch('redesign/sass/**/*.scss',['sass']);
    gulp.watch('redesign/scripts/**/*.js',['scripts']);
});



