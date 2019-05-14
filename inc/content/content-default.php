<?php
/**
 * Theme:				
 * Template:			content-default.php
 * Description:			Default template to output post content
 */

?>

<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

    <?php the_content(); ?>

<?php } } ?>