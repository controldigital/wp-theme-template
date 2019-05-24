<?php
/**
 * Theme:				
 * Template:			post-query.php
 * Description:         Post query template to output and load more posts.
 */
 
global $wp;

// Get the paged query var.
$post_type		    = isset( $_GET[ 'post_type' ] ) ? explode( ',', $_GET[ 'post_type' ] ) : array( 'post' );
$post_status		= isset( $_GET[ 'post_status' ] ) ? explode( ',', $_GET[ 'post_status' ] ) : array( 'publish' );	
$posts_per_page	    = isset( $_GET[ 'posts_per_page' ] ) ? $_GET[ 'posts_per_page' ] : 8;
$paged			    = isset( $_GET[ 'paged' ] ) ? $_GET[ 'paged' ] : 1;
$offset			    = isset( $_GET[ 'offset' ] ) ? $_GET[ 'offset' ] : '';
$order 			    = isset( $_GET[ 'order' ] ) ? $_GET[ 'order' ] : 'DESC';
$orderby			= isset( $_GET[ 'orderby' ] ) ? $_GET[ 'orderby' ] : 'date';

// Create arguments for getting the post
$args = array(
	'post_type'             => $post_type,
	'post_status'			=> $post_publish,
	'posts_per_page'        => $posts_per_page,
	'paged'					=> $paged,
	'order'                 => $order,
	'orderby'               => $orderby,
	'tax_query'				=> array()
);

// Create new query
$query = new WP_Query( $args );
if ( $query->have_posts() ) { ?>

    <?php
    // This form sends all the query data to the get_posts_ajax function that is located in the ajax.php file. ?>
    <form class="js-post-query" method="GET" action="<?php echo home_url( $wp->request ); ?>">
        <input type="hidden" name="action" value="get_posts_ajax">
        <input type="hidden" name="post_type" value="<?php echo $post_type; ?>">
        <input type="hidden" name="post_status" value="<?php echo $post_status; ?>">
        <input type="hidden" name="posts_per_page" value="<?php echo $posts_per_page; ?>">
        <input type="hidden" name="paged" value="<?php echo $paged + 1; ?>">
        <input type="hidden" name="order" value="<?php echo $order; ?>">
        <input type="hidden" name="orderby" value="<?php echo $orderby; ?>">
        <input type="hidden" name="max_pages" value="<?php echo $query->max_num_pages; ?>">
        <?php while ( $query->have_posts() ) { $query->the_post(); ?>

            <?php 
            // Get the template to show te post with.
            // Modify this to your own liking.
            get_template_part( './inc/posts/post', 'card' ); ?>

        <?php } wp_reset_postdata(); ?>

        <?php
        // Check if there is more than 1 page, and if so show the load more button.
        if ( $query->max_num_pages > $paged ) { ?>
			<button type="submit" name="submit"><?php _e( 'Load more', THEME_TEXT_DOMAIN ); ?></button>
		<?php } ?>
    </form>

<?php } ?>