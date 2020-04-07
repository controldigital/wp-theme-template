<?php
/**
 * Template:       		widget-social.php
 * Description:    		Social Widget class
 */


class Social_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 * 
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' 					=> 'social-widget',
			'description' 					=> __( 'Social media buttons widget', 'control' ),
			'customize_selective_refresh' 	=> true,
		);
		parent::__construct( 'social_widget', __( 'Social', 'control' ), $widget_ops );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
		$title 			= apply_filters( 'widget_title', $instance[ 'title' ] );
		$facebook 		= isset( $instance[ 'facebook' ] ) ? esc_attr( $instance[ 'facebook' ] ) : '';
		$twitter 		= isset( $instance[ 'twitter' ] ) ? esc_attr( $instance[ 'twitter' ] ) : '';
		$instagram 		= isset( $instance[ 'instagram' ] ) ? esc_attr( $instance[ 'instagram' ] ) : '';
		$pinterest 		= isset( $instance[ 'pinterest' ] ) ? esc_attr( $instance[ 'pinterest' ] ) : '';
		$google 		= isset( $instance[ 'google' ] ) ? esc_attr( $instance[ 'google' ] ) : '';
		$linkedin 		= isset( $instance[ 'linkedin' ] ) ? esc_attr( $instance[ 'linkedin' ] ) : '';
		$youtube 		= isset( $instance[ 'youtube' ] ) ? esc_attr( $instance[ 'youtube' ] ) : '';
		$show_labels 	= isset( $instance[ 'show_labels' ] ) ? $instance[ 'show_labels' ] === 'on' ? true : false : false;
		
		echo $args['before_widget'];
		
			if ( !empty( $instance[ 'title' ] ) ) {
				echo $args[ 'before_title' ] . $title . $args[ 'after_title' ];
			}
		
			echo '<div class="socials">';
				echo '<ul class="socials__list">';
					
					if( $facebook ) { echo '<li class="socials__item"><a class="socials__link" href="' . $facebook . '" rel="external" target="_blank" title="Facebook"><div class="socials__icon"><i aria-label="Facebook" class="fab fa-facebook-f"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Facebook</span>' : '' ) . '</a></li>'; }
					if( $twitter ) { echo '<li class="socials__item"><a class="socials__link" href="' . $twitter . '" rel="external" target="_blank" title="Twitter"><div class="socials__icon"><i aria-label="Twitter" class="fab fa-twitter"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Twitter</span>' : '' ) . '</a></li>'; }
					if( $instagram ) { echo '<li class="socials__item"><a class="socials__link" href="' . $instagram . '" rel="external" target="_blank" title="Instagram"><div class="socials__icon"><i aria-label="Instagram" class="fab fa-instagram"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Instagram</span>' : '' ) . '</a></li>'; }
					if( $pinterest ) { echo '<li class="socials__item"><a class="socials__link" href="' . $pinterest . '" rel="external" target="_blank" title="Pinterest"><div class="socials__icon"><i aria-label="Pinterest" class="fab fa-pinterest"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Pinterest</span>' : '' ) . '</a></li>'; }
					if( $google ) { echo '<li class="socials__item"><a class="socials__link" href="' . $google . '" rel="external" target="_blank" title="Google+"><div class="socials__icon"><i aria-label="Google+" class="fab fa-google-plus"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Google+</span>' : '' ) . '</a></li>'; }
					if( $linkedin ) { echo '<li class="socials__item"><a class="socials__link" href="' . $linkedin . '" rel="external" target="_blank" title="LinkedIn"><div class="socials__icon"><i aria-label="Linkedin" class="fab fa-linkedin-in"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">LinkedIn</span>' : '' ) . '</a></li>'; }
					if( $youtube ) { echo '<li class="socials__item"><a class="socials__link" href="' . $youtube . '" rel="external" target="_blank" title="Youtube"><div class="socials__icon"><i aria-label="Youtube" class="fab fa-youtube"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Youtube</span>' : '' ) . '</a></li>'; }
	
				echo '</ul>';
			echo '</div>';
		echo $args['after_widget'];
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title 			= ! empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : '';
		$facebook 		= ! empty( $instance[ 'facebook' ] ) ? $instance[ 'facebook' ] : '';
		$twitter 		= ! empty( $instance[ 'twitter' ] ) ? $instance[ 'twitter' ] : '';
		$instagram 		= ! empty( $instance[ 'instagram' ] ) ? $instance[ 'instagram' ] : '';
		$pinterest 		= ! empty( $instance[ 'pinterest' ] ) ? $instance[ 'pinterest' ] : '';
		$google 		= ! empty( $instance[ 'google' ] ) ? $instance[ 'google' ] : '';
		$linkedin 		= ! empty( $instance[ 'linkedin' ] ) ? $instance[ 'linkedin' ] : '';
		$youtube 		= ! empty( $instance[ 'youtube' ] ) ? $instance[ 'youtube' ] : '';
		$show_labels 	= ! empty( $instance[ 'show_labels' ] ) ? 'on' : ''; ?>
		
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', 'control' ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'facebook' ); ?>">Facebook:</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'facebook' ); ?>" name="<?php echo $this->get_field_name( 'facebook' ); ?>" value="<?php echo esc_attr( $facebook ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'twitter' ); ?>">Twitter:</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'twitter' ); ?>" name="<?php echo $this->get_field_name( 'twitter' ); ?>" value="<?php echo esc_attr( $twitter ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'instagram' ); ?>">Instagram:</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'instagram' ); ?>" name="<?php echo $this->get_field_name( 'instagram' ); ?>" value="<?php echo esc_attr( $instagram ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'pinterest' ); ?>">Pinterest:</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'pinterest' ); ?>" name="<?php echo $this->get_field_name( 'pinterest' ); ?>" value="<?php echo esc_attr( $pinterest ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'google' ); ?>">Google+:</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'google' ); ?>" name="<?php echo $this->get_field_name( 'google' ); ?>" value="<?php echo esc_attr( $google ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'linkedin' ); ?>">LinkedIn:</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'linkedin' ); ?>" name="<?php echo $this->get_field_name( 'linkedin' ); ?>" value="<?php echo esc_attr( $linkedin ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'youtube' ); ?>">Youtube:</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'youtube' ); ?>" name="<?php echo $this->get_field_name( 'youtube' ); ?>" value="<?php echo esc_attr( $youtube ); ?>" />
		</p>
		<p>
			<label for"<?php echo $this->get_field_id( 'show_labels' ); ?>"><?php _e( 'Show labels of social links', 'control' ); ?></label>
			<input type="checkbox" class="checkbox" id="<?php echo $this->get_field_id( 'show_labels' ); ?>" name="<?php echo $this->get_field_name( 'show_labels' ); ?>" <?php checked( esc_attr( $show_labels ), 'on' ); ?> />
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
		$instance = $old_instance;
		$instance[ 'title' ] 		= strip_tags( $new_instance[ 'title' ] );
		$instance[ 'facebook' ] 	= strip_tags( $new_instance[ 'facebook' ] );
		$instance[ 'twitter' ] 		= strip_tags( $new_instance[ 'twitter' ] );
		$instance[ 'instagram' ] 	= strip_tags( $new_instance[ 'instagram' ] );
		$instance[ 'pinterest' ] 	= strip_tags( $new_instance[ 'pinterest' ] );
		$instance[ 'google' ] 		= strip_tags( $new_instance[ 'google' ] );
		$instance[ 'linkedin' ] 	= strip_tags( $new_instance[ 'linkedin' ] );
		$instance[ 'youtube' ] 		= strip_tags( $new_instance[ 'youtube' ] );
		$instance[ 'show_labels' ] 	= strip_tags( $new_instance[ 'show_labels' ] );
		return $instance;
	}
}