<?php
/**
 * Theme:				
 * Template:			front-page.php
 * Description:			
 */

get_header();
?>

<main id="main" class="js-ajax-container" role="main">

	<?php get_template_part( './inc/content/content', 'front' ); ?>
	
</main>

<?php
get_footer();
?>