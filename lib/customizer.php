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

	// Retina logo setting.
	$wp_customize->add_setting(
		'retina_logo',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);

	// Retina logo input control
    $wp_customize->add_control( new WP_Customize_Media_Control(
		$wp_customize,
		'retina_logo',
		array(
			'label'				=> __( 'Retina Logo', 'control' ),
			'section'			=> 'title_tagline',
            'settings'			=> 'retina_logo',
            'mime_type'         => 'image',
			'priority'			=> 5
		)
    ) );

	// 404 thumbnail setting.
	$wp_customize->add_setting(
		'404_image',
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
    
    // 404 subtitle setting.
	$wp_customize->add_setting(
		'404_subtitle',
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
			'title'				=> __( '404 Page', 'control' ),
			'priority'			=> 250,
		)
	);

	// 404 thumbnail image input control
	$wp_customize->add_control( new WP_Customize_Media_Control(
		$wp_customize,
		'404_image',
		array(
			'label'				=> __( 'Image', 'control' ),
			'section'			=> '404_section',
            'settings'			=> '404_image',
            'mime_type'         => 'image',
			'priority'			=> 25
		)
    ) );

	// 404 title text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'404_title',
		array(
			'label'      		=> __( 'Title', 'control' ),
			'section'    		=> '404_section',
			'settings'   		=> '404_title',
			'type'				=> 'text',
	        'priority'   		=> 35
		)
    ) );
    
    // 404 subtitle text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'404_subtitle',
		array(
			'label'      		=> __( 'Subtitle', 'control' ),
			'section'    		=> '404_section',
			'settings'   		=> '404_subtitle',
			'type'				=> 'text',
	        'priority'   		=> 30
		)
	) );

	// 404 body textarea control
	$wp_customize->add_control( new WP_TinyMCE_Customize_Control(
		$wp_customize,
		'404_body',
		array(
			'label'      		=> __( 'Body', 'control' ),
			'section'    		=> '404_section',
			'settings'   		=> '404_body',
			'type'				=> 'textarea',
	        'priority'   		=> 40
		)
	) );

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
	wp_register_script( 'customizer-preview', get_template_directory_uri() . '/src/admin/js/customizer-preview.js', array( 'jquery' ), false, true );
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
	wp_register_script( 'customizer-control', get_template_directory_uri() . '/src/admin/js/customizer-control.js', array( 'jquery' ), false, true );
	wp_enqueue_script( 'customizer-control' );
}