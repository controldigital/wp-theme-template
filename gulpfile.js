const gulp = require('gulp');
const webpack = require('webpack');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/**
 * Styles gulp task
 * 
 * Compiles the SCSS files to CSS and minifies
 * and autoprefixes the CSS. 
 * 
 * For options check out:
 * {@link https://github.com/postcss/autoprefixer#options}
 * 
 */
gulp.task('styles', function() {
    return gulp.src('./src/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false,
        grid: true
    }))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Scripts gulp task
 * 
 * Starts Webpack to bundle the JS Modules and turn
 * ES6 code into legacy code for older browsers.
 * 
 * For options check out:
 * {@link https://webpack.js.org/configuration/}
 * 
 */
gulp.task('scripts', function(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
      if (err) {
        console.log(err.toString());
      }
      console.log(stats.toString());
      callback();
    });
});

/**
 * Watch gulp task
 * 
 * Watch for all the SCSS and JS files and execute 'styles' 
 * and 'scripts' tasks when a change is made in the files in the paths.
 * 
 */
gulp.task('watch', () => {
	gulp.watch('./src/scss/*/*.scss', ['styles']);
	gulp.watch('./src/js/*/*.js', ['scripts']);
});

/**
 * Default gulp task
 * 
 * Run this by typing the following in the command line:
 * 
 * gulp
 * 
 * This will initiate gulp, perform the default task and continue watching
 * all of the files that are being watched.
 * 
 */
gulp.task('default', ['watch']);