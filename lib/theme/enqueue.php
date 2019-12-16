<?php
/**
 * Theme:
 * Template:       		enqueue.php
 * Description:    		Add CSS and Javascript to the page
 */


/**
 * Add attributes to the style tag
 * 
 * Set the rel attribute on the css file to preload.
 * This is a the modern way of async loading files.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/style_loader_tag/
 * @return	string
 */
add_filter( 'style_loader_tag', 'custom_style_attributes', 10, 4 );
function custom_style_attributes( $html, $handle, $href, $media ) {
    // Handles to perform the task on
    $handles = array( 'style' );
    if ( in_array( $handle, $handles) ) {
        return '<link id="' . $handle . '-css" href="' . $href . '" rel="stylesheet" media="none" onload="this.media=\'' . $media . '\'">';
    }
    return $html;
}

/**
 * Add attributes to the script tag
 * 
 * Can be used to add a 'async' or 'defer' attribute 
 * to a script tag
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/script_loader_tag/
 * @return	string
 */
add_filter( 'script_loader_tag', 'custom_script_attributes', 10, 3 );
function custom_script_attributes( $tag, $handle, $src ) {

	// Script that load async
	$async_attr = 'async';
	$async_handles = array();
	if ( in_array( $handle, $async_handles ) ) {
		return '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript" ' . $async_attr . '></script>';
	}

	// Scripts that load defer
	$defer_attr = 'defer';
	$defer_handles = array( 'script' );
	if ( in_array( $handle, $defer_handles ) ) {
		return '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript" ' . $defer_attr . '></script>';
	}

	// Scripts that are ES6 Modules
	$module_attr = 'module';
	$module_handles = array();
	if ( in_array( $handle, $module_handles ) ) {
		return '<script id="' . $handle . '-js" src="' . $src . '" type="' . $module_attr . '"></script>';
	}

	return $tag;
}

 /**
 * Theme styles
 * Add styles for the theme
 * 
 * @since	1.0
 */
add_action( 'wp_enqueue_scripts', 'theme_styles' );
function theme_styles() {

	/**
	 * Unregister gutenberg blocks
	 */
	wp_deregister_style( 'wp-block-library' );
	wp_deregister_style( 'wp-block-library-theme' );

	/**
	 * Swiper
	 * @link	http://idangero.us/swiper/api/
	 */
	// wp_register_style( 'swiper', '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/css/swiper.min.css', false, '4.2.6', 'all' );
	// wp_enqueue_style( 'swiper' );

	/**
	 * Style
	 * 
	 * Main stylesheet of this theme
	 */
	wp_register_style( 'style', get_template_directory_uri() . '/dist/css/style.css', false, false, 'all' );
	wp_enqueue_style( 'style' );

}

/**
 * Theme scripts
 * Add scripts to the head or body
 * 
 * @since	1.0
 */
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
function theme_scripts() {

	wp_deregister_script( 'wp-embed' );
	wp_deregister_script( 'jquery' );

	/**
	 * WebfontLoader
	 * @link	https://github.com/typekit/webfontloader
	 */
	wp_enqueue_script( 'webfontLoader', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', false, false, true );
	wp_add_inline_script( 'webfontLoader', "WebFont.load({google: {families: ['Open+Sans:300,400,500,600,700?display=swap']},custom:{families:['FontAwesome'],urls:['//use.fontawesome.com/releases/v5.1.0/css/all.css?display=swap']}});" );

	/**
	 * jQuery 
	 * @link	http://api.jquery.com/
	 */
	wp_register_script( 'jquery', '//code.jquery.com/jquery-3.3.1.min.js', false, '3.3.1', false );
	// wp_enqueue_script( 'jquery' );

	/**
	 * Swiper
	 * @link	http://idangero.us/swiper/api/
	 */
	// wp_register_script( 'swiper', '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/js/swiper.min.js', false, '4.2.6', true );
	// wp_enqueue_script( 'swiper' );

	/**
	 * Script
	 * 
	 * This file includes the general script of handling
	 * interactions and DOM modifications
	 */
	wp_register_script( 'script', get_template_directory_uri() . '/dist/js/script.js', false, false, true );
	wp_localize_script( 'script', 'wp', array( 
		'ajax' 			=> admin_url( 'admin-ajax.php' ), 
		'theme' 		=> get_template_directory_uri(),
		'post'			=> array(
			'id'			=> get_the_id(),
			'title'			=> get_the_title(),
			'type'			=> get_post_type(),
			'template'		=> basename( get_page_template() )
		),
		'rest'			=> esc_url( get_rest_url() ),
		'nonce'			=> wp_create_nonce( 'wp_rest' ),
		'cookie'		=> array(
			'active'			=> get_theme_mod( 'cookie_active' ),
			'name'				=> get_theme_mod( 'cookie_name' ),
			'expire'			=> get_theme_mod( 'cookie_expiration_date' ),
			'scripts'			=> array(
				'head'				=> get_theme_mod( 'cookie_code_head' ),
				'bodyStart'			=> get_theme_mod( 'cookie_code_body_start' ),
				'bodyEnd'			=> get_theme_mod( 'cookie_code_body_end' )
			)
		)
	) );
	wp_enqueue_script( 'script' );

}
