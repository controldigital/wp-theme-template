<?php
/**
 * Theme:				
 * Template:			sidebars.php
 * Description:			Create locations for widgets
 */


/**
 * theme_sidebars
 * 
 * Register custom sidebar locations.
 * Repeat the code in the function to register
 * multiple sidebars.
 * 
 * @since	1.0
 */
add_action( 'widgets_init', 'theme_sidebars' );
function theme_sidebars() {

	$args = array(
		'id'            => 'sidebar-nav',
		'class'         => 'nav',
		'name'          => __( 'Navigation Sidebar', THEME_TEXT_DOMAIN ),
		'description'   => __( 'Widget area after the main navigation', THEME_TEXT_DOMAIN ),
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '<li id="%1$s>',
		'after_widget'  => '</li>',
	);
	register_sidebar( $args );

	// $args = array(
	// 	'id'            => '',
	// 	'class'         => '',
	// 	'name'          => __( '', THEME_TEXT_DOMAIN ),
	// 	'description'   => __( '', THEME_TEXT_DOMAIN ),
	// 	'before_title'  => '',
	// 	'after_title'   => '',
	// 	'before_widget' => '<div id="%1$s>',
	// 	'after_widget'  => '</div>',
	// );
	// register_sidebar( $args );

}
