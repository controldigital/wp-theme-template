<?php
/**
 * Theme:			
 * Template:			hero-default.php
 * Description:			Default hero template
 */

?>

<header class="hero hero--default">
	
	<?php if ( has_post_thumbnail() ) { ?>
		<div class="hero__thumbnail" style="background: url(<?php the_post_thumbnail_url(); ?>)"></div>
	<?php } ?>
	
	<div class="hero__container">
		<h1><?php the_title(); ?></h1>
	</div>
	
</header>