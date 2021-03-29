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
			<div class="container">
				<div class="row justify-center">
					<div class="box-md-8">
						<?php the_content(); ?>
					</div>
				</div>
			</div>
		</section>
				
	<?php } } ?>

</main>

<?php get_footer(); ?>
