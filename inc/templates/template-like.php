<?php
/**
 * Theme:
 * Template:			template-cookie.php
 * Description:	
 * TODO: Needs testing!		
 */

global $wp;
?>

<template id="template-like">

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
			display: block;
			contain: content;
		}

		input {
			display: none;
		}

	</style>

	<form class="form" method="GET" action="<?php echo home_url( $wp->request ); ?>">
		<label class="like">
			<input type="checkbox" name="liked" value="">
			<span class="icon"></span>
		</label>
	</form>

</template>