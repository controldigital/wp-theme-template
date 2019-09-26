<?php
/**
 * Theme:			
 * Template:			hero.php
 * Description:			Default hero template
 */

?>

<section class="hero">
	
	<?php if ( has_post_thumbnail() ) { ?>
		<div class="hero__thumbnail" style="background: url(<?php the_post_thumbnail_url(); ?>)"></div>
	<?php } ?>
	
	<div class="hero__container">
		<div class="hero__content">
			<h1><?php the_title(); ?></h1>
		</div>
	</div>
	
</section>