<?php
/**
 * Theme:				
 * Template:			content-default.php
 * Description:			Default template to output post content
 */

?>

<article class="content js-ajax-post">
    <?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

        <?php the_content(); ?>

    <?php } } ?>
</article>