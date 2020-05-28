<?php
/**
 * Template: 		404.php
 * Description:		The template for displaying the 404 template.
 *
 */

get_header();

$body = get_theme_mod( '404_body' ); 
?>

<main id="site-content" class="main role="main">

	<article class="content" id="post-<?php the_ID(); ?>">

		<?php
		get_hero( '404' );
		?>

		<section class="section">
			<?php echo $body; ?> 
		</section>

	</article>

</main>

<?php
get_footer();
