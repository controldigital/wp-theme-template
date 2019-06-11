<?php
/**
 * Theme:				
 * Template:			post-card.php
 * Description:         Post card template for displaying a single post in a overview layout.
 */

?>

<article class="card">
    <a href="<?php the_permalink(); ?>" class="card__link" title="<?php the_title(); ?>">
        <header class="card__header">
            <h3><?php the_title(); ?>
        </header>
        <div class="card__body">
            <?php the_excerpt(); ?>
        </div>
    </a>
</article>