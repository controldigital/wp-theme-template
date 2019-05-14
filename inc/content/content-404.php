<?php
/**
 * Theme:				
 * Template:			content-default.php
 * Description:			Default template to output post content
 */

$title 		= get_option( 'theme-404-title' );
$content 	= get_option( 'theme-404-content' );
?>

<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

    <?php echo $content; ?>

<?php } } ?>