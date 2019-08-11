<?php
/**
 * Theme:
 * Template:			cookies-body-end.php
 * Description:			Cookies body output script
 */


// Cookie active?
$cookie_active			= get_theme_mod( 'cookie_active' );

// Name of cookie variable
$cookie_name			= get_theme_mod( 'cookie_name' );

// Cookie code body
$cookie_code_body_end 	= get_theme_mod( 'cookie_code_body_end' );

if ( $cookie_active && isset( $_COOKIE[ $cookie_name ] ) && $_COOKIE[ $cookie_name ] === 'true' ) {
	echo $cookie_code_body_end;
}
?>