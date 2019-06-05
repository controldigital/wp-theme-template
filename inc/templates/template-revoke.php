<?php
/**
 * Theme:
 * Template:			template-revoke.php
 * Description:			
 */

// Get URL of current page
global $wp;

// Name of cookie variable
$cookie_name = get_theme_mod( 'cookie_name' );
?>

<template id="template-revoke">
	
	<div class="wrapper">

		<form class="form" method="POST" action="<?php echo admin_url( 'admin-post.php' ); ?>">

			<input type="hidden" name="action" value="revoke_cookie">
			<input type="hidden" name="cookie_name" value="<?php echo $cookie_name; ?>">
			<input type="hidden" name="_wp_nonce" value="<?php echo wp_create_nonce( 'cookie' ); ?>">
			<input type="hidden" name="_wp_referrer" value="<?php echo home_url( $wp->request ); ?>">

			<div class="footer">
				<slot name="revoke"></slot>
			</div>

		</form>

	</div>

</template>