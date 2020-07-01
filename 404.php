<?php
/**
 * Template: 		404.php
 * Description:		The template for displaying the 404 template.
 *
 */

get_header();

$body = get_theme_mod( '404_body' ); 
?>

<main id="site-main" class="main">

	<?php get_hero( '404' ); ?>

	<section class="section">
		<?php echo $body; ?> 
	</section>

</main>

<?php get_footer(); ?>
