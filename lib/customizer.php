<?php
/**		
 * Template:			customizer.php
 * Description:			Customizer modifications
 */


/**
 * Customizer customizations
 * 
 * Use this hook to create new sections, settings and
 * fields for the customizer section.
 * 
 * @since   1.0
 * 
 * For help check out these links below
 * @link    https://codex.wordpress.org/Theme_Customization_API
 * @link    https://css-tricks.com/getting-started-wordpress-customizer/
 */
add_action( 'customize_register', 'theme_customizer_register' );
function theme_customizer_register( WP_Customize_Manager $wp_customize ) {
}

/**
 * customizer_preview_js
 * 
 * Add JavaScript preview controls
 * for the customizer.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/customize_preview_init
 * 
 * Tutorial
 * @link	https://code.tutsplus.com/tutorials/customizer-javascript-apis-getting-started--cms-26838
 */
add_action( 'customize_preview_init', 'customizer_preview_scripts' );
function customizer_preview_scripts() {
	wp_register_script( 'customizer-preview', get_template_directory_uri() . '/assets/admin/js/customizer-preview.js', array( 'jquery' ), false, true );
    wp_enqueue_script( 'customizer-preview' );
}

/**
 * customizer_control_js
 * 
 * Add JavaScript controls for 
 * the customizer
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/customize_controls_enqueue_scripts
 * 
 * Tutorial
 * @link	https://code.tutsplus.com/tutorials/customizer-javascript-apis-getting-started--cms-26838
 */
add_action( 'customize_controls_enqueue_scripts', 'customizer_control_scripts' );
function customizer_control_scripts() {
	wp_register_script( 'customizer-control', get_template_directory_uri() . '/assets/admin/js/customizer-control.js', array( 'jquery' ), false, true );
	wp_enqueue_script( 'customizer-control' );
}

/**
 * theme_404_customizer_register
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
	
	// 404 general section
	$wp_customize->add_section(
		'404_section',
		array(
			'title'				=> __( '404 Page Settings', THEME_TEXT_DOMAIN ),
			'description' 		=> __( 'Add the content that will be displayed on the 404 - page not found Page' ),
			'capability'     	=> 'edit_theme_options',
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