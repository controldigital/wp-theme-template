<?php
/**
 * Template:			post-types.php
 * Description:			Register custom post types to use in the page
 */


/**
 * Register custom post type
 * Uncomment to create the post type
 * 
 * @since	1.0
 */
// add_action( 'init', 'custom_post_type', 0 );
// function custom_post_type() {
//
// 	$labels = array(
// 		'name'                  => _x( 'Post Types', 'Post Type General Name', 'control' ),
// 		'singular_name'         => _x( 'Post Type', 'Post Type Singular Name', 'control' ),
// 		'menu_name'             => __( 'Post Types', 'control' ),
// 		'name_admin_bar'        => __( 'Post Type', 'control' ),
// 		'archives'              => __( 'Item Archives', 'control' ),
// 		'attributes'            => __( 'Item Attributes', 'control' ),
// 		'parent_item_colon'     => __( 'Parent Item:', 'control' ),
// 		'all_items'             => __( 'All Items', 'control' ),
// 		'add_new_item'          => __( 'Add New Item', 'control' ),
// 		'add_new'               => __( 'Add New', 'control' ),
// 		'new_item'              => __( 'New Item', 'control' ),
// 		'edit_item'             => __( 'Edit Item', 'control' ),
// 		'update_item'           => __( 'Update Item', 'control' ),
// 		'view_item'             => __( 'View Item', 'control' ),
// 		'view_items'            => __( 'View Items', 'control' ),
// 		'search_items'          => __( 'Search Item', 'control' ),
// 		'not_found'             => __( 'Not found', 'control' ),
// 		'not_found_in_trash'    => __( 'Not found in Trash', 'control' ),
// 		'featured_image'        => __( 'Featured Image', 'control' ),
// 		'set_featured_image'    => __( 'Set featured image', 'control' ),
// 		'remove_featured_image' => __( 'Remove featured image', 'control' ),
// 		'use_featured_image'    => __( 'Use as featured image', 'control' ),
// 		'insert_into_item'      => __( 'Insert into item', 'control' ),
// 		'uploaded_to_this_item' => __( 'Uploaded to this item', 'control' ),
// 		'items_list'            => __( 'Items list', 'control' ),
// 		'items_list_navigation' => __( 'Items list navigation', 'control' ),
// 		'filter_items_list'     => __( 'Filter items list', 'control' ),
// 	);
//
// 	$args = array(
// 		'label'                 => __( 'Post Type', 'control' ),
// 		'description'           => __( 'Post Type Description', 'control' ),
// 		'labels'                => $labels,
// 		'supports'              => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
// 		'taxonomies'            => array( ),
// 		'hierarchical'          => false,
// 		'public'                => true,
// 		'show_ui'               => true,
// 		'show_in_menu'          => true,
// 		'menu_position'         => 5,
//		'menu_icon'				=> '',
// 		'show_in_admin_bar'     => true,
// 		'show_in_nav_menus'     => true,
//		'show_in_rest'			=> false,
// 		'can_export'            => true,
// 		'has_archive'           => true,
// 		'exclude_from_search'   => false,
// 		'publicly_queryable'    => true,
// 		'capability_type'       => 'page',
// 	);
//
// 	register_post_type( 'post_type', $args );
//
// }
