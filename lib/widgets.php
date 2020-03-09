<?php
/**			
 * Template:			widgets.php
 * Description:			Create custom widgets to use in sidebars
 */


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