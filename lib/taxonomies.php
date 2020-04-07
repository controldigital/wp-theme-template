<?php
/**
 * Template:			taxonomies.php
 * Description:			Register custom taxonomies for posts or custom post type
 */


/**
 * Register Custom Taxonomy
 * Uncomment to create the post type
 * 
 * @since	1.0
 */
// add_action( 'init', 'custom_taxonomy', 0 );
// function custom_taxonomy() {
//
// 	$labels = array(
// 		'name'                       => _x( 'Taxonomies', 'Taxonomy General Name', 'control' ),
// 		'singular_name'              => _x( 'Taxonomy', 'Taxonomy Singular Name', 'control' ),
// 		'menu_name'                  => __( 'Taxonomy', 'control' ),
// 		'all_items'                  => __( 'All Items', 'control' ),
// 		'parent_item'                => __( 'Parent Item', 'control' ),
// 		'parent_item_colon'          => __( 'Parent Item:', 'control' ),
// 		'new_item_name'              => __( 'New Item Name', 'control' ),
// 		'add_new_item'               => __( 'Add New Item', 'control' ),
// 		'edit_item'                  => __( 'Edit Item', 'control' ),
// 		'update_item'                => __( 'Update Item', 'control' ),
// 		'view_item'                  => __( 'View Item', 'control' ),
// 		'separate_items_with_commas' => __( 'Separate items with commas', 'control' ),
// 		'add_or_remove_items'        => __( 'Add or remove items', 'control' ),
// 		'choose_from_most_used'      => __( 'Choose from the most used', 'control' ),
// 		'popular_items'              => __( 'Popular Items', 'control' ),
// 		'search_items'               => __( 'Search Items', 'control' ),
// 		'not_found'                  => __( 'Not Found', 'control' ),
// 		'no_terms'                   => __( 'No items', 'control' ),
// 		'items_list'                 => __( 'Items list', 'control' ),
// 		'items_list_navigation'      => __( 'Items list navigation', 'control' ),
// 	);
// 	$args = array(
// 		'labels'                     => $labels,
// 		'hierarchical'               => false,
// 		'public'                     => true,
// 		'show_ui'                    => true,
// 		'show_admin_column'          => true,
// 		'show_in_nav_menus'          => true,
// 		'show_tagcloud'              => true,
// 	);
// 	register_taxonomy( 'taxonomy', array( 'post' ), $args );
//
// }
