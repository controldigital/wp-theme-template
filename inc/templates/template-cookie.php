<?php
/**
 * Theme:
 * Template:			cookies-notice.php
 * Description:			Cookies notice to give user controls over cookies
 */

// Get URL of current page
global $wp;

// Cookie active?
$cookie_active = get_theme_mod( 'cookie_active' );

// Name of cookie variable
$cookie_name = get_theme_mod( 'cookie_name' );
$cookie_expiration_date = get_theme_mod( 'cookie_expiration_date' );
?>

<template id="template-cookie">
	
	<article class="wrapper">

		<slot name="thumbnail"></slot>

		<form class="form" method="POST" action="<?php echo admin_url( 'admin-post.php' ); ?>">

			<input type="hidden" name="action" value="set_cookie">
			<input type="hidden" name="cookie_name" value="<?php echo $cookie_name; ?>">
			<input type="hidden" name="cookie_expiration_date" value="<?php echo $cookie_expiration_date; ?>">
			<input type="hidden" name="_wp_nonce" value="<?php echo wp_create_nonce( 'cookie' ); ?>">
			<input type="hidden" name="_wp_referrer" value="<?php echo home_url( $wp->request ); ?>">

			<header class="header">
				<slot name="title"></slot>
			</header>

			<div class="body">
				<slot name="content"></slot>
			</div>

			<footer class="footer">
				<slot name="accept"></slot>
				<slot name="reject"></slot>
				<slot name="read-more"></slot>
			</footer>

		</form>

	</article>

</template>