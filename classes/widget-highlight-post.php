<?php
/**
 * Template:       		widget-highlight-post.php
 * Description:    		Highlight Post Widget class
 */


class Highlight_Post_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 * 
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' 					=> 'highlight-post-widget',
			'description' 					=> __( 'Pick a highlighted post', 'control' ),
			'customize_selective_refresh' 	=> true,
		);
		parent::__construct( 'highlight_post_widget', __( 'Highlight Post', 'control' ), $widget_ops );
	}
	
	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		
		// outputs the content of the widget
		$title 		= apply_filters( 'widget_title', $instance[ 'title' ] );
		$highlight 	= isset( $instance[ 'highlight' ] ) ? esc_attr( $instance[ 'highlight' ] ) : '';
		
		echo $args[ 'before_widget' ];
		
			// Only output the title if it is set
			if ( ! empty( $instance[ 'title' ] ) ) {
				echo $args[ 'before_title' ] . $title . $args[ 'after_title' ];
			}
			
			// If a highlight is selected
			if ( $highlight !== '') {
				
				// Arguments for query
				$query_args = array(
					'post_type'			=> 'post',
					'post__in'			=> $highlight,
					'post_status'		=> 'publish'
				);
				
				// Create a new query
				$query = new WP_Query( $query_args );

				// Loop through the results
				if ( $query->have_posts() ) { 
					while ( $query->have_posts() ) { 
						$query->the_post(); 
					
						// Customize the output here
					
					} wp_reset_postdata(); 
				}
				
			}
			
		echo $args[ 'after_widget' ];
		
	}
	
	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title 		= ! empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : '';
		$highlight 	= ! empty( $instance[ 'highlight' ] ) ? $instance[ 'highlight' ] : false; 

		// Set arguments for query
		$args = array(
			'post_type'			=> 'post',
			'post_status'		=> 'publish',
			'posts_per_page'	=> '-1'
		);

		// Create a new query
		$query = new WP_Query( $args );
		?>
		
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', 'control' ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'highlight' ); ?>"><?php _e( 'Post to highlight', 'control' ); ?>:</label>
			<select class="widefat" id="<?php echo $this->get_field_id( 'highlight' ); ?>" name="<?php echo $this->get_field_name( 'highlight' ); ?>">
				<option value="">Pick a post</option>
				<?php if ( $query->have_posts() ) { while ( $query->have_posts() ) { $query->the_post(); ?>
					<option value="<?php the_id(); ?>" <?php selected( $highlight, get_the_id() ); ?>><?php the_title(); ?></option>
				<?php } wp_reset_postdata(); } ?>
			</select>
		</p>
		
		<?php
		
	}
	
	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
		$instance 					= $old_instance;
		$instance[ 'title' ] 		= strip_tags( $new_instance[ 'title' ] );
		$instance[ 'highlight' ] 	= strip_tags( $new_instance[ 'highlight' ] );
		return $instance;
	}
	
}