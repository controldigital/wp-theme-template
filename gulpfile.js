const gulp = require('gulp');
const webpack = require('webpack');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/**
 * Styles gulp function
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
 * Scripts gulp function
 * 
 * Starts Webpack to bundle the JS Modules and turn
 * ES6 code into legacy code for older browsers.
 * 
 * For options check out:
 * {@link https://webpack.js.org/configuration/}
 * 
 */
function scripts(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
    	if (err) {
        	console.log(err.toString());
    	}
        console.log(stats.toString());
        callback();
    });
}; 

/**
 * Specify gulp tasks
 * 
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