<?php
/**
 * Template Name: Front 
 * Template Post Type: post, page
 */

get_header();
?>

<main id="site-main" class="main">

	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

		<?php get_hero(); ?>
	
		<section class="section">
			<?php the_content(); ?>
		</section>
				
	<?php } } ?>

</main>

<?php get_footer(); ?>
