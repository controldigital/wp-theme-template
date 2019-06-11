<?php
/**
 * Theme:			    
 * Template:			footer.php
 * Description:			Scripts and tags for in the footer
 */


/**
 * footer_cookie_notice
 * 
 * Outputs the cookie notice at the bottom
 * of the page.
 * 
 * @since   1.0
 * @link    https://developer.wordpress.org/reference/functions/wp_footer/
 */
add_action( 'wp_footer', 'footer_cookie_notice', 10, 0 );
function footer_cookie_notice() {

    // Cookie notice template
    get_template_part( './inc/cookies/cookies', 'notice' );
}

/**
 * footer_theme_templates
 * 
 * Add templates that have to be included
 * at the bottom of the page.
 * 
 * @since   1.0
 * @link    https://developer.wordpress.org/reference/functions/wp_footer/
 */
add_action( 'wp_footer', 'footer_theme_templates', 11, 0 );
function footer_theme_templates() {
    
    // JS polyfill scanner
    get_template_part( './inc/footer/footer', 'polyfill' );
    
    // Default footer template
    get_template_part( './inc/footer/footer', 'default' );
}