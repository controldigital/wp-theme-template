const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const criticalCSS = require('gulp-penthouse');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat-util');

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
gulp.task('styles', () => 
	 gulp.src('./src/scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			cascade: false,
			grid: true
		}))
		.pipe(gulp.dest('./dist/css/'))
);

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
gulp.task('scripts', callback => {
    webpack(require('./webpack.config.js'), function(err, stats) {
    	if (err) {
        	console.log(err.toString());
    	}
      	console.log(stats.toString());
      	callback();
    });
});

/**
 * Critical CSS gulp task
 * 
 * Creates a critical CSS file.
 * The source of the file can be changed if needed
 * 
 * How it works
 * 
 * For options check out:
 * {@link https://www.npmjs.com/package/penthouse}
 * 
 */
gulp.task('critical', () => {

	/**
	 * List of URLs to check and create critical CSS files for.
	 * Add your own URL and filename to the array to create
	 * multiple critical CSS files
	 * 
	 * @type		{Object[]} An array of objects with an url and out parameter
	 * @property	{String} object.url The URL to get the critical styles from
	 * @property	{String} object.fileName The name and type of the output file
	 */
	const criticalPaths = [
		{
			url: '', // url from where we want penthouse to extract critical styles
			fileName: '', // output file name
		},
	];
	
	return criticalPaths.forEach((path) => {
		gulp.src('./dist/css/style.css')

			/**
			 * @property	{String} url The URL to extract the critical CSS from
			 * @property	{String} out The file that the function outputs
			 * @property	{Number} width Maximum width of page to check
			 * @property	{Number} height Maximum height of page to check
			 * @property	{String} userAgent Useragent to check the page with
			 */
			.pipe(criticalCSS({
				url: path.url,
				out: path.fileName,
				width: 1400,
				height: 900,
				userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' // pretend to be googlebot when grabbing critical page styles.
			}))
			.pipe(cleanCSS({compatibility: 'ie10+'}))
			.pipe(concat.header('<style>'))
			.pipe(concat.footer('</style>'))
			.pipe(gulp.dest('./dist/critical/'));
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