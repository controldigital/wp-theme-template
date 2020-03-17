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
define( 'THEME_NAME', 'Control WP Theme' );
define( 'THEME_VERSION', 1.0 );
define( 'THEME_TEXT_DOMAIN', 'control' );

/**
 * All the templates to include
 * 
 */
$templates = array(	
	'lib/ajax.php',				// Ajax functions
	'lib/filters.php',			// Filter hooks
	'lib/helpers.php',			// Helper functions
	'lib/theme.php',			// Theme support configuration
	'lib/post-types.php',		// Post Types registration
	'lib/taxonomies.php',		// Taxonomies registration
	'lib/customizer.php',		// Customizer modifications
	'lib/enqueue.php',			// Enqueue CSS and JS
	'lib/admin.php',			// Custom admin settings
	'lib/head.php',				// wp_head functions
	'lib/body.php',				// wp_body_open functions
	'lib/rest.php',				// Rest API configuration
	'lib/widgets.php',			// Widget registration
	'lib/plugins.php',			// Plugins
);

/**
 * All the classes to include
 * 
 */
$classes = array(	
	'classes/nav-walker.php',					// Custom Navigation Walker
	'classes/widget-button.php',				// Button Widget
	'classes/widget-social.php',				// Social Widget
	'classes/widget-highlight-post.php',		// Highlight Post Widget
);

/**
 * Loop over all the paths and locate the
 * templates. This will include all files into
 * this functions.php file.
 */
foreach ( $templates as $template ) {
	locate_template( $template, true, true );
}

foreach ( $classes as $class ) {
	locate_template( $class, true, true );
}

?>