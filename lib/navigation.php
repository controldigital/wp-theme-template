<?php
/**
 * Template:			navigation.php
 * Description:			Register navigation locations for theme
 */

/**
 * theme_menus
 * 
 * Register navigation menus. Repeat the 
 * register_nav_menu function to register
 * multiple menu's.
 * 
 * @since	1.0
 */
add_action( 'after_setup_theme', 'theme_menus' );
function theme_menus() {

    // Create default menu
	register_nav_menu( 'menu-main', __( 'Main Menu', THEME_TEXT_DOMAIN ) );

}