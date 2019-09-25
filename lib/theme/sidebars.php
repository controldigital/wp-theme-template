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
		'id'            => 'sidebar-menu',
		'class'         => 'menu',
		'name'          => __( 'Menu Sidebar', THEME_TEXT_DOMAIN ),
		'description'   => __( 'Widget area after the main menu', THEME_TEXT_DOMAIN ),
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '<li id="%1$s">',
		'after_widget'  => '</li>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-header',
		'class'         => 'header',
		'name'          => __( 'Header Sidebar', THEME_TEXT_DOMAIN ),
		'description'   => __( 'Widget area in the header', THEME_TEXT_DOMAIN ),
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '<li id="%1$s">',
		'after_widget'  => '</li>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-1',
		'class'         => 'footer-column-1',
		'name'          => __( 'First footer column', THEME_TEXT_DOMAIN ),
		'description'   => __( 'First column in the footer at the end of the page.', THEME_TEXT_DOMAIN ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-2',
		'class'         => 'footer-column-2',
		'name'          => __( 'Second footer column', THEME_TEXT_DOMAIN ),
		'description'   => __( 'Second column in the footer at the end of the page.', THEME_TEXT_DOMAIN ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-3',
		'class'         => 'footer-column-3',
		'name'          => __( 'Third footer column', THEME_TEXT_DOMAIN ),
		'description'   => __( 'Third column in the footer at the end of the page.', THEME_TEXT_DOMAIN ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-4',
		'class'         => 'footer-column-4',
		'name'          => __( 'Fourth footer column', THEME_TEXT_DOMAIN ),
		'description'   => __( 'Fourth column in the footer at the end of the page.', THEME_TEXT_DOMAIN ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

}
