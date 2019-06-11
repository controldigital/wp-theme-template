<?php
/**
 * Theme:				
 * Template:			content-search.php
 * Description:			search results content template
 */

// Get the queried values
$s = get_search_query();

// Create arguments for query
$args = array(
	's'	=> $s
);

// Create a new query
$query = new WP_Query( $args );
?>

<article class="content js-ajax-post">
    <?php if ( $query->have_posts() ) { while ( $query->have_posts() ) { $query->the_post(); ?>

        <?php the_content(); ?>

	<?php } } else { ?>

		<?php _e( 'No results have been found.', THEME_TEXT_DOMAIN ); ?>
		
	<?php } ?>
</article>