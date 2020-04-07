const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js')
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/**
 * Styles gulp 
 * 
 * Compiles the SCSS files to CSS and minifies
 * and autoprefixes the CSS. 
 * 
 * For options check out:
 * {@link https://github.com/postcss/autoprefixer#options}
 * 
 */
function styles(done) {
    gulp.src('./src/scss/style.scss', { sourcemaps: true })
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(gulp.dest('./dist/'))
        done();
};

/**
 * Scripts gulp 
 * 
 * Starts Webpack to bundle the JS Modules and turn
 * ES6 code into legacy code for older browsers.
 * 
 * For options check out:
 * {@link https://webpack.js.org/configuration/}
 * 
 */
function scripts(callback) {
    webpack(webpackConfig, function(err, stats) {
    	if (err) {
        	console.log(err.toString());
    	}
        console.log(stats.toString());
        callback();
    });
}; 

/**
 * Add the above functions to a specific gulp task
 * 
 */

gulp.task('default', () => {

  gulp.watch('./src/scss/*/*.scss', styles);
  gulp.watch('./src/scss/*.scss', styles);
  gulp.watch('./src/js/*/*.js', scripts);
  gulp.watch('./src/js/*.js', scripts);

});

gulp.task('styles', styles);
gulp.task('scripts', scripts);