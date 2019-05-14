<?php
/**
 * Theme:
 * Template:			cookie.php
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

    // Cookie active setting
	$wp_customize->add_setting(
		'cookie_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie name setting
	$wp_customize->add_setting(
		'cookie_name',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
			'default'			=> 'wp-cookie-consent'
		)
	);
	
	// Cookie title setting
	$wp_customize->add_setting(
		'cookie_title',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie body setting
	$wp_customize->add_setting(
		'cookie_body',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie expiration date setting
	$wp_customize->add_setting(
		'cookie_expiration_date',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
			'default'			=> 365
		)
	);

    // Cookie accept button setting
	$wp_customize->add_setting(
		'cookie_accept_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie refuse button setting
	$wp_customize->add_setting(
		'cookie_refuse_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

    // Cookie refuse button setting
	$wp_customize->add_setting(
		'cookie_refuse_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie read more label setting
	$wp_customize->add_setting(
		'cookie_read_more_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

    // Cookie read more label setting
	$wp_customize->add_setting(
		'cookie_read_more_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

	// Cooke read more link setting
	$wp_customize->add_setting(
		'cookie_read_more_page',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
			'default'			=> '0'
		)
	);

	// Cooke read more link setting
	$wp_customize->add_setting(
		'cookie_revoke_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);

	// Cooke read more link setting
	$wp_customize->add_setting(
		'cookie_revoke_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);
	
	// Cookie code head setting
	$wp_customize->add_setting(
		'cookie_code_head',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie code head setting
	$wp_customize->add_setting(
		'cookie_code_body',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie panel
	$wp_customize->add_panel(
		'cookie_panel',
		array(
			'priority'       => 10,
			'capability'     => 'edit_theme_options',
			'theme_supports' => '',
			'title'          => __( 'Cookies', THEME_TEXT_DOMAIN ),
			'description'    => __( 'Cookie Settings', THEME_TEXT_DOMAIN ),
		)
	);

	// Cookies general section
	$wp_customize->add_section(
		'cookie_general_section',
		array(
			'title'				=> __( 'General', THEME_TEXT_DOMAIN ),
			'priority'			=> 10,
			'panel'				=> 'cookie_panel'
		)
	);

	// Cookies refuse section
	$wp_customize->add_section(
		'cookie_refuse_section',
		array(
			'title'				=> __( 'Refuse', THEME_TEXT_DOMAIN ),
			'priority'			=> 20,
			'panel'				=> 'cookie_panel'
		)
	);

	// Cookies privacy section
	$wp_customize->add_section(
		'cookie_privacy_section',
		array(
			'title'				=> __( 'Privacy policy', THEME_TEXT_DOMAIN ),
			'priority'			=> 30,
			'panel'				=> 'cookie_panel'
		)
	);

	// Cookies revoke section
	$wp_customize->add_section(
		'cookie_revoke_section',
		array(
			'title'				=> __( 'Revoke', THEME_TEXT_DOMAIN ),
			'priority'			=> 40,
			'panel'				=> 'cookie_panel'
		)
	);
	
	// Cookies script section
	$wp_customize->add_section(
		'cookie_scripts_section',
		array(
			'title'				=> __( 'Scripts', THEME_TEXT_DOMAIN ),
			'priority'			=> 50,
			'panel'				=> 'cookie_panel'
		)
	);
    
    // Cookie active checkbox control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_active',
		array(
			'label'      		=> __( 'Cookie active?', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Set the state of the cookie.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );
	
	// Cookie title text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_name',
		array(
			'label'      		=> __( 'Name', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The name of the cookie that will be stored in the browser. Only needs to be changed in case of a conflicting cookie name.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_name',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );
	
	// Cookie title text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_title',
		array(
			'label'      		=> __( 'Title', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The title of the cookie message.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_title',
			'type'				=> 'text',
	        'priority'   		=> 30
		)
	) );
	
	// Cookie body textarea control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_body',
		array(
			'label'      		=> __( 'Body', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The main content of the cookie message.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_body',
			'type'				=> 'textarea',
	        'priority'   		=> 40
		)
	) );
	
	// Cookie expiration date select controls
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_expiration_date',
		array(
			'label'      		=> __( 'Expiration period', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The amount of time that the cookie will be stored', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_expiration_date',
			'type'				=> 'select',
			'choices'			=> array(
				1					=> __( '1 day', THEME_TEXT_DOMAIN ),
				7					=> __( '1 week', THEME_TEXT_DOMAIN ),
				30					=> __( '1 month', THEME_TEXT_DOMAIN ),
				91					=> __( '3 months', THEME_TEXT_DOMAIN ),
				182					=> __( '6 months', THEME_TEXT_DOMAIN ),
				365					=> __( '1 year', THEME_TEXT_DOMAIN ),

			),
	        'priority'   		=> 50
		)
	) );
    
    // Cookie accept label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_accept_label',
		array(
			'label'      		=> __( 'Accept button', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Label of the accept button.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_accept_label',
			'type'				=> 'text',
	        'priority'   		=> 60
		)
	) );

	// Cookie refuse active input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_refuse_active',
		array(
			'label'      		=> __( 'Refuse active?', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Set the state of the refuse button.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_refuse_section',
			'settings'   		=> 'cookie_refuse_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );
    
    // Cookie refuse label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_refuse_label',
		array(
			'label'      		=> __( 'Refuse button', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Label of the refuse button.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_refuse_section',
			'settings'   		=> 'cookie_refuse_label',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );
	
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_read_more_active',
		array(
			'label'      		=> __( 'Privacy policy active?', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Set the state of the privacy policy button.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_privacy_section',
			'settings'   		=> 'cookie_read_more_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );
    
    // Cookie read more label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_read_more_label',
		array(
			'label'      		=> __( 'Privacy policy button', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Label of the privacy policy button.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_privacy_section',
			'settings'   		=> 'cookie_read_more_label',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );

	// Get all pages for the select control
	// Create a new array with a default option
	$read_more_pages = get_pages();
	$read_more_choices = array(
		'0'			=> __( '-Select-', THEME_TEXT_DOMAIN )
	);

	// Add all the pages with their ID's and titles to the array
	foreach( $read_more_pages as $page ) {
		$read_more_choices[ $page->ID ] = $page->post_title;
	}

	// Cookie read more label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_read_more_page',
		array(
			'label'      		=> __( 'Privacy policy page', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Selecteer the page of the privacy policy.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_privacy_section',
			'settings'   		=> 'cookie_read_more_page',
			'type'				=> 'select',
			'priority'   		=> 30,
			'choices'			=> $read_more_choices
		)
	) );

	// Cookie revoke active checkbox control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_revoke_active',
		array(
			'label'      		=> __( 'Revoke active?', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Set the state of the ability to change the cookie settings after accepting or refusing the cookies.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_revoke_section',
			'settings'   		=> 'cookie_revoke_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );

	// Cookie revoke label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_revoke_label',
		array(
			'label'      		=> __( 'Revoke button', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Label of the revoke button.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_revoke_section',
			'settings'   		=> 'cookie_revoke_label',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );

	// Cookie code head textarea control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_code_head',
		array(
			'label'      		=> __( 'Head scripts', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Place scripts that have to be appended to the head when the cookie is accepted', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_scripts_section',
			'settings'   		=> 'cookie_code_head',
			'type'				=> 'textarea',
	        'priority'   		=> 10
		)
	) );
	
	// Cookie code body textarea control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_code_body',
		array(
			'label'      		=> __( 'Body scripts', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Place scripts that have to be appended to the start of the body when the cookie is accepted', THEME_TEXT_DOMAIN ),
			'section'    		=> 'cookie_scripts_section',
			'settings'   		=> 'cookie_code_body',
			'type'				=> 'textarea',
	        'priority'   		=> 20
		)
    ) );
	
}

/**
 * get_cookie
 * 
 * Retrieves the cookie value if it is found.
 * Returns an array or string
 * 
 * @since	1.0
 * @param	string $cookie_name
 * @return	array|string The value of the cookie if it is found
 */
function get_cookie( $cookie_name ) {
	$cookie = isset( $_COOKIE[ $cookie_name ] ) ? explode( ',', $_COOKIE[ $cookie_name ] ) : '';
	return $cookie;
}

/**
 * delete_cookie
 * 
 * Sets the cookie expiration date
 * to an invalid date. Because of this
 * the cookie will be invalid and removed.
 * 
 * @since	1.0
 * @param	string $cookie_name
 * @return	string The value of the cookie if it is found
 */
function delete_cookie( $cookie_name ) {
	$cookie = setcookie( $cookie_name , '', time() - 3600, '/' );
	return $cookie;
}

/**
 * set_cookie
 * 
 * Form handler for setting the cookie
 * Sets the cookie through php and redirects
 * the user back to the page.
 * 
 * @since	1.0
 */
add_action( 'admin_post_set_cookie', 'set_cookie' );
add_action( 'admin_post_nopriv_set_cookie', 'set_cookie' );
function set_cookie() {

	// If nonce is not there or invalid
	if ( ! isset( $_POST[ '_wp_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_wp_nonce' ], 'cookie' ) ) wp_die();

	// Expiration date of cookie
	$cookie_expiration_date = intval( get_theme_mod( 'cookie_expiration_date' ) );

	// Value of cookie
	$cookie_value = '';
	
	// If cookie is accepted
	if ( isset( $_POST[ 'accept' ] ) ) {
		$cookie_value = 'true';
	}

	// If cookie is refused
	if ( isset( $_POST[ 'refuse' ] ) ) {
		$cookie_value = 'false';
	}

	// Referrer URL
	$referrer = esc_url( $_POST[ '_wp_referrer' ] );

	// Set the cookie if a POST is sent with the cookie name.
	if ( isset( $_POST[ 'cookie_name' ] ) ) {
		setcookie( $_POST[ 'cookie_name' ], $cookie_value, ( time() + 60 * 60 * 24 * $cookie_expiration_date ), '/' );
	}

	// Redirect to thank you page
	wp_redirect( $referrer );
	exit;

}

/**
 * revoke_cookie
 * 
 * Form handler for setting the cookie
 * Sets the cookie through php and redirects
 * the user back to the page.
 * 
 * @since	1.0
 */
add_action( 'admin_post_revoke_cookie', 'revoke_cookie' );
add_action( 'admin_post_nopriv_revoke_cookie', 'revoke_cookie' );
function revoke_cookie() {

	// If nonce is not there or invalid
	if ( ! isset( $_POST[ '_wp_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_wp_nonce' ], 'revoke' ) ) wp_die();

	// Referrer URL
	$referrer = esc_url( $_POST[ '_wp_referrer' ] );

	// Remove the cookie
	if ( isset( $_POST[ 'cookie_name' ] ) ) {
		delete_cookie( $_POST[ 'cookie_name' ] );
	}

	// Redirect to thank you page
	wp_redirect( $referrer );
	exit;

}