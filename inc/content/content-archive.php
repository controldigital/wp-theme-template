<?php
/**
 * Theme:				
 * Template:			content-default.php
 * Description:			Default template to output post content
 */


$title 		= get_option( 'theme-archives-title' );
$content 	= get_option( 'theme-archives-content' );
?>

<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

    <?php echo $content; ?>

<?php } } ?>