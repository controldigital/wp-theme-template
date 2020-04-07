<?php
/**			
 * Template:			widgets.php
 * Description:			Create custom widgets and sidebars
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
		'name'          => __( 'Menu Sidebar', 'control' ),
		'description'   => __( 'Widget area after the main menu', 'control' ),
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '<li id="%1$s">',
		'after_widget'  => '</li>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-header',
		'class'         => 'header',
		'name'          => __( 'Header Sidebar', 'control' ),
		'description'   => __( 'Widget area in the header', 'control' ),
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '<li id="%1$s">',
		'after_widget'  => '</li>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-1',
		'class'         => 'footer-column-1',
		'name'          => __( 'First footer column', 'control' ),
		'description'   => __( 'First column in the footer at the end of the page.', 'control' ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-2',
		'class'         => 'footer-column-2',
		'name'          => __( 'Second footer column', 'control' ),
		'description'   => __( 'Second column in the footer at the end of the page.', 'control' ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-3',
		'class'         => 'footer-column-3',
		'name'          => __( 'Third footer column', 'control' ),
		'description'   => __( 'Third column in the footer at the end of the page.', 'control' ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-4',
		'class'         => 'footer-column-4',
		'name'          => __( 'Fourth footer column', 'control' ),
		'description'   => __( 'Fourth column in the footer at the end of the page.', 'control' ),
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-bottom-left',
		'class'         => 'footer-bottom-left',
		'name'          => __( 'Bottom left footer column', 'control' ),
		'description'   => __( 'Bottom left area in the footer at the end of the page.', 'control' ),
		'before_title'  => '<h6>',
		'after_title'   => '</h6>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

	$args = array(
		'id'            => 'sidebar-footer-bottom-right',
		'class'         => 'footer-bottom-right',
		'name'          => __( 'Bottom right footer column', 'control' ),
		'description'   => __( 'Bottom right area in the footer at the end of the page.', 'control' ),
		'before_title'  => '<h6>',
		'after_title'   => '</h6>',
		'before_widget' => '<div class="widget" id="%1$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );

}

/**
 * unregister_default_widgets
 * 
 * Uncomment a rule to unregister a widget.
 * This includes all default widgets of WordPress.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/widgets_init/
 */
add_action( 'widgets_init', 'unregister_default_widgets' );
function unregister_default_widgets() {
	// unregister_widget( 'WP_Widget_Pages' );
	// unregister_widget( 'WP_Widget_Calendar' );
	// unregister_widget( 'WP_Widget_Archives' );
	// unregister_widget( 'WP_Widget_Links' );
	// unregister_widget( 'WP_Widget_Meta' );
	// unregister_widget( 'WP_Widget_Search' );
	// unregister_widget( 'WP_Widget_Text' );
	// unregister_widget( 'WP_Widget_Categories' );
	// unregister_widget( 'WP_Widget_Recent_Posts' );
	// unregister_widget( 'WP_Widget_Recent_Comments' );
	// unregister_widget( 'WP_Widget_RSS' );
	// unregister_widget( 'WP_Widget_Tag_Cloud' );
	// unregister_widget( 'WP_Nav_Menu_Widget' );
}

/**
 * register_custom_widgets
 * 
 * Custom widget registration.
 * These widgets are defined later in this file.
 * 
 * Uncomment the widgets to include them
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/widgets_init/
 */
add_action( 'widgets_init', 'register_custom_widgets' );
function register_custom_widgets() {
	register_widget( 'Button_Widget' );
	register_widget( 'Social_Widget' );
	register_widget( 'Highlight_Post_Widget' );
}

/**
 * Add the custom nav walker to the widget navigation.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/widget_nav_menu_args/
 */
add_action( 'widget_nav_menu_args', 'set_widget_nav_menu_walker', 10, 1 );
function set_widget_nav_menu_walker( $nav_menu_args ) {
	$nav_menu_args[ 'container' ] 		= 'nav';
    $nav_menu_args[ 'container_class' ] = 'menu menu--widget';
    $nav_menu_args[ 'menu_class' ] 		= 'menu__list menu__list--widget';
	$nav_menu_args[ 'walker' ] 			= new Custom_Walker_Nav_Menu();
	return $nav_menu_args;
}