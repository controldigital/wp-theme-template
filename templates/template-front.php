<?php
/**
 * Template Name: Front 
 * Template Post Type: post, page
 */

get_header();
?>

<main id="site-content" role="main">

	<?php

	if ( have_posts() ) {

		while ( have_posts() ) {
			the_post();

			get_hero();
			
			?>

			<article class="content" id="post-<?php the_ID(); ?>">
			
				<section class="section">
					<?php the_content(); ?>
				</section>

			</article>
				
		<?php }
	}

	?>

</main>

<?php get_footer(); ?>
