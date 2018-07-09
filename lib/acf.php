<?php
/**
 * Theme:
 * Template:			acf.php
 * Description:			Advanced Custom Fields options and settings
 */


/**
 * Add options and sub options pages to theme
 * 
 * Here we can add fields that are 
 * globally available throughout the theme.
 * 
 * @since	1.0
 */
if ( function_exists( 'acf_add_options_page' ) ) {

	// Main options page
	$parent = acf_add_options_page( array(
		'page_title' 	=> 'Theme settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	) );

	// 404
	acf_add_options_sub_page( array(
		'page_title'	=> '404 Page',
		'menu_title'	=> '404',
		'parent_slug'	=> $parent[ 'menu_slug' ]
	) );

	// Cookies
	acf_add_options_sub_page( array(
		'page_title'	=> 'Cookies',
		'menu_title'	=> 'Cookies',
		'parent_slug'	=> $parent[ 'menu_slug' ]
	) );

}

/**
 * Google Maps API key
 * Adds Google Map functionality to ACF
 * 
 * Change the $google_maps_api_key value to
 * the API Key generated by Google
 * 
 * @since	1.0
 */
add_action( 'acf/init', 'my_acf_init' );
function my_acf_init() {

	// Google maps API Key
	$google_maps_api_key = '';

	// Update setting
	acf_update_setting( 'google_api_key', $google_maps_api_key );
}
