<?php
/**
 * Theme:
 * Template:			ajax.php
 * Description:			Ajax related functions
 */


/**
 * load_ajax
 * 
 * Generic boilerplate function for handling
 * an AJAX request 
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_nopriv_(action)
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_(action)
 */
// add_action( 'wp_ajax_nopriv_load_ajax', 'load_ajax') ;
// add_action( 'wp_ajax_load_ajax', 'load_ajax' );
// function load_ajax() {
// 	header( 'Content-Type: text/html' );
// 	global $post;
	
// 	// Do something

// 	die();
// }

/**
 * load_ajax
 * 
 * Generic boilerplate function for handling
 * an AJAX request 
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_nopriv_(action)
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_(action)
 */
add_action( 'wp_ajax_nopriv_get_post_part_ajax', 'get_post_part') ;
add_action( 'wp_ajax_get_post_part_ajax', 'get_post_part' );
function get_post_content() {
	header( 'Content-Type: text/html' );

	// Get id of post.
	$query_p = isset( $_REQUEST[ 'p' ] ) ? $_REQUEST[ 'p' ] : '';
	$query_part = isset( $_REQUEST[ 'part' ] ) ? $_REQUEST[ 'part' ] : false;

	// Send a message when no part is given.
	if ($query_part === false) {
		echo 'No part specified. Please specify the name of the part';
	}
	
	// Create the arguments.
	$args = array(
		'post_type'			=> 'any',
		'post_status'		=> array( 'publish' ),
		'posts_per_page'	=> 1,
		'p'					=> $query_p
	);

	// Create a new query.
	$query = new WP_Query( $args );

	// Loop over the query.
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();

			// Return the requested template.
			get_template_part( './inc/content/content', $query_part );

		} wp_reset_postdata();
	}
	
	die();
}

/**
 * get_posts_ajax
 * 
 * Generic HTTP GET response that processes
 * all the parameters put through the query
 * to get the posts requested.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_nopriv_(action)
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_(action)
 * @return	string
 */
add_action( 'wp_ajax_nopriv_get_posts_ajax', 'get_posts_ajax') ;
add_action( 'wp_ajax_get_posts_ajax', 'get_posts_ajax' );
function get_posts_ajax() {
	header( 'Content-Type: text/html' );

	// Get the variables from the GET Request
	$query_post_type		= isset( $_REQUEST[ 'post_type' ] ) ? $_REQUEST[ 'post_type' ] : array( 'post' );
	$query_post_status		= isset( $_REQUEST[ 'post_status' ] ) ? $_REQUEST[ 'post_status' ] : array( 'publish' );	
	$query_posts_per_page	= isset( $_REQUEST[ 'posts_per_page' ] ) ? $_REQUEST[ 'posts_per_page' ] : -1;
	$query_paged			= isset( $_REQUEST[ 'paged' ] ) ? $_REQUEST[ 'paged' ] : 1;
	$query_offset			= isset( $_REQUEST[ 'offset' ] ) ? $_REQUEST[ 'offset' ] : '';
	$query_order 			= isset( $_REQUEST[ 'order' ] ) ? $_REQUEST[ 'order' ] : 'DESC';
	$query_orderby			= isset( $_REQUEST[ 'orderby' ] ) ? $_REQUEST[ 'orderby' ] : 'date';
	$query_p				= isset( $_REQUEST[ 'p' ] ) ? $_REQUEST[ 'p' ] : '';
	$query_s				= isset( $_REQUEST[ 's' ] ) ? $_REQUEST[ 's' ] : '';
	$query_cat				= isset( $_REQUEST[ 'cat' ] ) ? $_REQUEST[ 'cat' ] : '';
	$query_tag				= isset( $_REQUEST[ 'tag' ] ) ? str_replace( ' ', ',', $_REQUEST[ 'tag' ] ) : '';
	$query_post__in			= isset( $_REQUEST[ 'post__in'] ) ? $_REQUEST[ 'post__in' ] : array();
	$query_post__not_in		= isset( $_REQUEST[ 'post__not_in' ] ) ? $_REQUEST[ 'post__not-in' ] : array();
	$query_meta_key			= isset( $_REQUEST[ 'meta_key' ] ) ? $_REQUEST[ 'meta_key' ] : '';
	$query_meta_value		= isset( $_REQUEST[ 'meta_value' ] ) ? $_REQUEST[ 'meta_value' ] : '';

	// Set arguments for query
	$args = array(
		'post_type'			=> $query_post_type,
		'post_status'		=> $query_post_status,
		'posts_per_page'	=> $query_posts_per_page,
		'paged'				=> $query_paged,
		'offset'			=> $query_offset,
		'order'				=> $query_order,
		'orderby'			=> $query_orderby,
		'p'					=> $query_p,
		's'					=> $query_s,
		'cat'				=> $query_cat,
		'tag'				=> $query_tag,
		'post__in'			=> $query_post__in,
		'post__not_in'		=> $query_post__not_in,
		'meta_key'			=> $query_meta_key,
		'meta_value'		=> $query_meta_value,
		'tax_query'			=> array(),
		'meta_query'		=> array()
	);

	// Fields to ignore for taxonomies
	$excludes = array(
		'action',
		'post_type',
		'posts_per_page',
		'post_status',
		'paged',
		'offset',
		'order',
		'orderby',
		'p',
		's',
		'cat',
		'tag',
		'post__in',
		'post__not_in',
		'meta_key',
		'meta_value',
		'_wp_nonce',
		'_wp_referrer'
	);

	// Get all registered taxonomies
	$taxonomies = get_taxonomies();

	// Loop over remaining query items and pass them as taxonomy filters
	// Or when the keys are not in the taxonomies and also not in the ignores
	// add them to the meta_query array.
	if ( ! empty( $_REQUEST ) ) {
		foreach( $_REQUEST as $item => $value ) {
			$value_array = explode( ',', $value ); // Turn the string from "value,value" to array( "value", "value" )
			if ( in_array( $item, $taxonomies ) ) {
				$args[ 'tax_query' ][] = array(
					'taxonomy'			=> $item,
					'field'				=> 'slug',
					'terms'				=> $value_array
				);		
			} else if ( ! in_array( $item, $excludes ) ) {
				$args[ 'meta_query' ][] = array(
					'key'				=> $item,
					'value'				=> $value_array
				);
			}
		}
	}

	// Create a new query.
	$query = new WP_Query( $args );

	// Loop over the query.
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			$post_type = get_post_type();

			// Change the output to what you prefer.
			// The response is send as text.
			the_content();

		} wp_reset_postdata();
	} else {

		// Display error message when no posts are found.
		get_template_part( './inc/messages/message', 'no-posts-found' );

	}

	// End connection
	die();
}

/**
 * Get markers of a certain post type
 * 
 * @return JSON 
 */
add_action( 'wp_ajax_nopriv_get_markers_ajax', 'get_markers_ajax' );
add_action( 'wp_ajax_get_markers_ajax', 'get_markers_ajax' );
function get_markers_ajax() {
	header( 'Content-Type: text/html' );

	// This template can be used to get JSON data for maps.
	// Fill in the variables below to get the markers of the post type you want.
	$post_type              = isset( $_GET[ 'post_type' ] ) ? explode( ',', $_GET[ 'post_type' ] ) : array( 'post' ); // Change POST_TYPE
	$posts_per_page         = isset( $_GET[ 'posts_per_page' ] ) ? $_GET[ 'posts_per_page' ] : -1;         // Change -1 to desired amount of posts

	// Arguments for the Query
	// These can be modified according to the WP_Query Arguments
	$args = array(
		'post_type'			=> $post_type,
		'post_status'		=> 'publish',
		'posts_per_page'	=> $posts_per_page,
		'tax_query'			=> array(
			'relationship'		=> 'AND',
		)
	);

	/**
	 * Uncomment the code below to unlock the ability to filter.
	 * The fields containing uppercase letters like TAXONOMY are to be replaced with 
	 * the desired taxonomies to filter on.
	 * 
	 * If more filters are needed, simply copy the entire if statement and modify the taxonomy.
	 * 
	 * @example 
	 * GET: http://website.com/wp-admin/admin-ajax.php?action=get_markers&TAXONOMY=VALUE
	 * $_GET[ 'TAXONOMY' ] === VALUE
	 * 
	 */
	// Fields to ignore for taxonomies
	$excludes = array(
		'action',
		'post_type',
		'posts_per_page',
		'paged',
		'offset',
		'order',
		'orderby',
		'p',
		's',
		'post__in',
		'post__not_in',
		'_wp_nonce',
		'_wp_referrer'
	);

	// Loop over remaining query items and pass them as taxonomy filters
	if ( ! empty( $_GET ) ) {
		foreach( $_GET as $item => $value ) {
			if ( ! in_array( $item, $excludes ) ) {
				$args[ 'tax_query' ][] = array(
					'taxonomy'			=> $item,
					'field'				=> 'slug',
					'terms'				=> $value
				);		
			}
		}
	}

	// Create a results array for storing all the markers.
	// We only want a few very specific field for the markers like location and title.
	$markers = array();

	// We create the query and start looping through all of the posts.
	// Every post that is a hit will be stored in our $markers array.
	$query = new WP_Query( $args );
	if ( $query->have_posts() ) { 
		while ( $query->have_posts() ) { 
			$query->the_post();
		
			/**
			 * Here we add the results to the array with the fields we want.
			 * 
			 * @example
			 * title
			 * content
			 * location
			 * thumbnail
			 * permalink
			 * 
			 * More fields can be added in the same way.
			 * Also ACF Fields with the get_field() function.
			 */
			array_push( $markers, array(
				'id'			=> get_the_id(),
				'title'			=> get_the_title(),
				'content'		=> get_the_content(),
				'thumbnail'		=> get_the_post_thumbnail(),
				'permalink'		=> get_the_permalink(),
				// 'location'		=> get_field( 'ACF_GOOGLE_MAPS_FIELD' )
			) );
		
		} wp_reset_postdata(); 
	}

	// We convert the markers into JSON so that it is readable for JavaScript.
	// Finally we echo the $json_result and send it to the client.
	$json_result = json_encode( $markers );
	echo $json_result;

	die();
}

/**
 * Post JSON Ajax
 * 
 * Send and receive JSON file through POST request
 * 
 * @since	1.0
 */
add_action( 'wp_ajax_nopriv_post_json_ajax', 'post_json_ajax' );
add_action( 'wp_ajax_post_json_ajax', 'post_json_ajax' );
function post_json_ajax() {
	header( 'Content-Type: text/html' );
	
	// Get the JSON file that is sent
	$data = file_get_contents( 'php://input' );

	// Decode the JSON to workable PHP
	$json = json_decode( $data );

	/**
	 * Check security of request
	 * 
	 * The first parameter is the name of
	 * the nonce it has to check.
	 * The second parameter is the name 
	 * of the $_POST argument
	 * 
	 * @example 
	 * $_POST[ 'wp_rest' ] is the name to check
	 */
	check_ajax_referer( 'wp_rest', $json->nonce );

	/**
	 * Do some thing here with the $json data
	 */
	
	// Send back a response
	wp_send_json( $json );
}