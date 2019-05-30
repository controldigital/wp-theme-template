<?php
/**
 * Theme:			    
 * Template:			body.php
 * Description:			Scripts and tags for in the body
 */


/**
 * body_web_components
 * 
 * Adds the <template> elements to the beginning of the
 * body. These templates can be used for Web Components.
 * 
 * @since   1.0
 * @link    https://developer.wordpress.org/reference/functions/wp_body_open/
 */
add_action( 'wp_body_open', 'body_web_components' );
function body_web_components() {

    // Card
    get_template_part( './inc/templates/template', 'card' );

    // Slider
    get_template_part( './inc/templates/template', 'slider' );

    // Slide
    get_template_part( './inc/templates/template', 'slide' );

    // Tabs
    get_template_part( './inc/templates/template', 'tabs' );

    // Modal
    get_template_part( './inc/templates/template', 'modal' );
}


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

    // Splash screen
    get_template_part( './inc/loader/splash' );

    // Default header
    get_template_part( './inc/header/header', 'default' );

    // Default hero
    get_template_part( './inc/hero/hero', 'default' );
}