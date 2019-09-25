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
add_action( 'customize_register', 'theme_404_customizer_register' );
function theme_404_customizer_register( WP_Customize_Manager $wp_customize ) {

	// 404 thumbnail setting.
	$wp_customize->add_setting(
		'404_thumbnail',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);

	// 404 title setting.
	$wp_customize->add_setting(
		'404_title',
		array(
			'transport'		=> 'refresh',
			'capability'	=> 'edit_theme_options',
			'type'			=> 'theme_mod'
		)
	);

	// 404 body setting.
	$wp_customize->add_setting(
		'404_body',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

	// 404 panel.
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

	// Cookies general section
	$wp_customize->add_section(
		'404_general_section',
		array(
			'title'				=> __( 'General', THEME_TEXT_DOMAIN ),
			'priority'			=> 10,
			'panel'				=> '404_panel'
		)
	);

	// Cookie thumbnail image input control
	$wp_customize->add_control( new WP_Customize_Image_Control(
		$wp_customize,
		'404_thumbnail',
		array(
			'label'				=> __( 'Thumbnail', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The thumbnail image of the 404 page.', THEME_TEXT_DOMAIN ),
			'section'			=> '404_general_section',
			'settings'			=> '404_thumbnail',
			'priority'			=> 25
		)
	) );

	// Cookie title text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'404_title',
		array(
			'label'      		=> __( 'Title', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The title of the 404 page.', THEME_TEXT_DOMAIN ),
			'section'    		=> '404_general_section',
			'settings'   		=> '404_title',
			'type'				=> 'text',
	        'priority'   		=> 30
		)
	) );

	// Cookie body textarea control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'404_body',
		array(
			'label'      		=> __( 'Body', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The main content of the 404 page.', THEME_TEXT_DOMAIN ),
			'section'    		=> '404_general_section',
			'settings'   		=> '404_body',
			'type'				=> 'textarea',
	        'priority'   		=> 40
		)
	) );

}