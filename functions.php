<?php
/**
 * Template:			functions.php
 * Description:			Overview of all theme functionality
 * 
 * @package 	WordPress
 * @subpackage	Control Theme Template
 *
 * Control WP Theme boilerplate
 * 
 * Use this theme to kickstart yourself into development.
 * Start off by defining these constants here below.
 */
define( 'THEME_NAME', 'Control Twenty Twenty' );
define( 'THEME_VERSION', 1.0 );
define( 'THEME_TEXT_DOMAIN', 'control' );

/**
 * All the files and definitions should be placed
 * in the LIB folder and be called here below.
 * 
 */
$templates = array(
	
	'lib/ajax.php',				// Ajax functions
	'lib/filters.php',			// Filter hooks
	'lib/helpers.php',			// Helper functions
	'lib/theme-support.php',	// Theme support configuration
	'lib/post-types.php',		// Post Types registration
	'lib/taxonomies.php',		// Taxonomies registration
	'lib/navigation.php',		// Navigation registration and Nav Walkers
	'lib/customizer.php',		// Customizer modifications
	'lib/enqueue.php',			// Enqueue CSS and JS
	'lib/admin.php',			// Custom admin settings
	'lib/head.php',				// wp_head functions
	'lib/body.php',				// wp_body_open functions
	'lib/rest.php',				// Rest API configuration
	'lib/sidebars.php',			// Sidebars registration
	'lib/widgets.php',			// Widget registration
	'lib/plugins.php',			// Plugins
	'lib/translations.php',		// Translation settings

);

/**
 * Loop over all the paths and locate the
 * templates. This will include all files into
 * this functions.php file.
 */
foreach ( $templates as $template ) {
	locate_template( $template, true, true );
}

?>
