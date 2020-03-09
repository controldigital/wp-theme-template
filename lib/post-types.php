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
// 		'name'                  => _x( 'Post Types', 'Post Type General Name', THEME_TEXT_DOMAIN ),
// 		'singular_name'         => _x( 'Post Type', 'Post Type Singular Name', THEME_TEXT_DOMAIN ),
// 		'menu_name'             => __( 'Post Types', THEME_TEXT_DOMAIN ),
// 		'name_admin_bar'        => __( 'Post Type', THEME_TEXT_DOMAIN ),
// 		'archives'              => __( 'Item Archives', THEME_TEXT_DOMAIN ),
// 		'attributes'            => __( 'Item Attributes', THEME_TEXT_DOMAIN ),
// 		'parent_item_colon'     => __( 'Parent Item:', THEME_TEXT_DOMAIN ),
// 		'all_items'             => __( 'All Items', THEME_TEXT_DOMAIN ),
// 		'add_new_item'          => __( 'Add New Item', THEME_TEXT_DOMAIN ),
// 		'add_new'               => __( 'Add New', THEME_TEXT_DOMAIN ),
// 		'new_item'              => __( 'New Item', THEME_TEXT_DOMAIN ),
// 		'edit_item'             => __( 'Edit Item', THEME_TEXT_DOMAIN ),
// 		'update_item'           => __( 'Update Item', THEME_TEXT_DOMAIN ),
// 		'view_item'             => __( 'View Item', THEME_TEXT_DOMAIN ),
// 		'view_items'            => __( 'View Items', THEME_TEXT_DOMAIN ),
// 		'search_items'          => __( 'Search Item', THEME_TEXT_DOMAIN ),
// 		'not_found'             => __( 'Not found', THEME_TEXT_DOMAIN ),
// 		'not_found_in_trash'    => __( 'Not found in Trash', THEME_TEXT_DOMAIN ),
// 		'featured_image'        => __( 'Featured Image', THEME_TEXT_DOMAIN ),
// 		'set_featured_image'    => __( 'Set featured image', THEME_TEXT_DOMAIN ),
// 		'remove_featured_image' => __( 'Remove featured image', THEME_TEXT_DOMAIN ),
// 		'use_featured_image'    => __( 'Use as featured image', THEME_TEXT_DOMAIN ),
// 		'insert_into_item'      => __( 'Insert into item', THEME_TEXT_DOMAIN ),
// 		'uploaded_to_this_item' => __( 'Uploaded to this item', THEME_TEXT_DOMAIN ),
// 		'items_list'            => __( 'Items list', THEME_TEXT_DOMAIN ),
// 		'items_list_navigation' => __( 'Items list navigation', THEME_TEXT_DOMAIN ),
// 		'filter_items_list'     => __( 'Filter items list', THEME_TEXT_DOMAIN ),
// 	);
//
// 	$args = array(
// 		'label'                 => __( 'Post Type', THEME_TEXT_DOMAIN ),
// 		'description'           => __( 'Post Type Description', THEME_TEXT_DOMAIN ),
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
