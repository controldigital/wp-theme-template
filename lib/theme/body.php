<?php
/**
 * Theme:			    
 * Template:			body.php
 * Description:			Scripts and tags for in the body
 */


/**
 * body_cookie_scripts
 * 
 * Add templates that have to be included
 * at the start of the page.
 * 
 * @since   1.0
 * @link    https://developer.wordpress.org/reference/functions/wp_body_open/
 */
add_action( 'wp_body_open', 'body_cookie_scripts' );
function body_cookie_scripts() {

    // Cookie body
    get_template_part( './inc/cookies/cookies', 'body' );
}

/**
 * body_open_theme_templates
 * 
 * Add templates that have to be included
 * at the start of the page.
 * 
 * @since   1.0
 * @link    https://developer.wordpress.org/reference/functions/wp_body_open/
 */
add_action( 'wp_body_open', 'body_open_theme_templates' );
function body_open_theme_templates() {

    // Browser Check
    get_template_part( './inc/browser/browser-check' );

    // Splash screen
    get_template_part( './inc/loader/splash' );

    // Default header
    get_template_part( './inc/header/header', 'default' );

}