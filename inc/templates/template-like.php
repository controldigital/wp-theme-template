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

	<form class="form" method="GET" action="<?php echo home_url( $wp->request ); ?>">
		<input id="like-<?php the_id(); ?>" type="checkbox" name="liked" value="<?php the_id(); ?>">
		<label for="like-<?php the_id(); ?>" class="like">
			<span class="icon"></span>
		</label>
	</form>

</template>