<?php
/**
 * Template Name: Front 
 * Template Post Type: post, page
 */

get_header();
?>

<main id="site-content" class="main">

	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

		<article class="content" id="post-<?php the_ID(); ?>">

			<?php get_hero(); ?>
		
			<section class="section">
				<?php the_content(); ?>
			</section>

		</article>
				
	<?php } } ?>

</main>

<?php get_footer(); ?>
