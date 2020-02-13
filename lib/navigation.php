<?php
/**
 * Template:			navigation.php
 * Description:			Register navigation locations for theme
 */

 /**
 * Navigation classes to include.
 */
$navigation_classes = array(
	'./classes/custom-walker-nav.php',
);

/**
 * Loop over all the paths and locate the templates. 
 * This will include all files into this theme.php file.
 */
foreach ( $navigation_classes as $navigation_class ) {
	locate_template( $navigation_class, true, true );
}


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