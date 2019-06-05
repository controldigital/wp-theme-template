<?php
/**
 * Theme:
 * Template:			template-cookie.php
 * Description:			
 */

// Get URL of current page
global $wp;

// Name of cookie variable
$cookie_name = get_theme_mod( 'cookie_name' );
$cookie_expiration_date = get_theme_mod( 'cookie_expiration_date' );
?>

<template id="template-cookie">

	<style>

		*, 
		*::before, 
		*::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

		:host {
			all: initial;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			contain: content;
			position: relative;
			font-size: 100%;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.wrapper {
			width: 100%;
			max-width: 20rem;
			height: auto;
		}

		.form {
			display: grid;
			grid-template-rows: auto auto auto;
			grid-template-columns: 1fr;
			grid-template-areas: 
				"header"
				"body"
				"footer";
		}

		.header {
			grid-area: header;
		}

		.body {
			grid-area: body;
		}

		.footer {
			grid-area: footer;
		}

	</style>
	
	<article class="wrapper">

		<form class="form" method="POST" action="<?php echo admin_url( 'admin-post.php' ); ?>">

			<input type="hidden" name="action" value="set_cookie">
			<input type="hidden" name="cookie_name" value="<?php echo $cookie_name; ?>">
			<input type="hidden" name="cookie_expiration_date" value="<?php echo $cookie_expiration_date; ?>">
			<input type="hidden" name="_wp_nonce" value="<?php echo wp_create_nonce( 'cookie' ); ?>">
			<input type="hidden" name="_wp_referrer" value="<?php echo home_url( $wp->request ); ?>">

			<header class="header">
				<slot name="thumbnail"></slot>
				<slot name="title">
					<h3><?php _e( 'Cookie consent', THEME_TEXT_DOMAIN ); ?></h3>
				</slot>
			</header>

			<div class="body">
				<slot name="content">
					<p><?php _e( 'This site uses cookies to ensure that it works properly.', THEME_TEXT_DOMAIN ); ?></p>
				</slot>
			</div>

			<footer class="footer">
				<slot name="accept"></slot>
				<slot name="reject"></slot>
				<slot name="read-more"></slot>
			</footer>

		</form>

	</article>

</template>