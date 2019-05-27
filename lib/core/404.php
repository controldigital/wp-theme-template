<?php
/**
 * Theme:
 * Template:			404.php
 * Description:			Functions performed on init
 */

/**
 * theme_cookie_customizer_register
 * 
 * This functions adds a whole new section
 * in the customizer with settings for cookies.
 * 
 * @since   1.0
 * 
 * For help check out these links below
 * @link    https://codex.wordpress.org/Theme_Customization_API
 * @link    https://css-tricks.com/getting-started-wordpress-customizer/
 */
add_action( 'customize_register', 'theme_cookie_customizer_register' );
function theme_cookie_customizer_register( WP_Customize_Manager $wp_customize ) {

	$wp_customize->add_setting(
		'404_active',
		array(
			'transport'		=> 'refresh',
			'capability'	=> 'edit_theme_options',
			'type'			=> 'theme_mod'
		)
	);

	// 404 panel
	$wp_customize->add_panel(
		'404_panel',
		array(
			'priority'       => 5,
			'capability'     => 'edit_theme_options',
			'theme_supports' => '',
			'title'          => __( '404', THEME_TEXT_DOMAIN ),
			'description'    => __( '404 Settings', THEME_TEXT_DOMAIN ),
		)
	);

}