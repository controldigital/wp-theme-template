<?php
/**
 * Theme:			
 * Template:		class-fields.php
 * Description:		Form class template for validating forms
 */


/**
 * Fields
 * 
 * An object for holding fields of a form.
 * 
 * @since	1.0
 * @author	control
 * @package Fields
 */
class Fields {

    /**
     * Create an array to store
     * all the entry values in.
     */
    private $entries = array();

    /**
     * Returns the collecion of all entries
     * 
     * @return  array
     */
    public function get_entries() {
        return $this->entries;
    }

    /**
     * Returns the selected field
     * 
     * @param   string $field
     * @return  any
     */
    public function get( $field ) {
        if ( isset( $this->entries[ $field ] ) )
            return $this->entries[ $field ];
        return false;
    }

    /**
     * Add key and value 
     * to instance.
     * 
     * @param   string $field
     * @param   any $value
     * @return  this
     */
    public function set( $field, $value ) {
        $this->entries[ $field ] = $value ;
        return $this;
    }

    /**
     * Remove key and value 
     * from instance.
     * 
     * @param   string $field
     * @return  this
     */
    public function remove( $field ) {
        foreach ( $this->entries as $key => $value ) {
            if ( $key === $field ) unset( $this->entries[ $key ] );
        }
        return $this;
    }

    /**
     * Returns an array with only 
     * the keys.
     * 
     * @return  array
     */
    public function keys() {
        $keys = array();
        foreach ( $this->entries as $key => $value ) {
            array_push( $keys, $key );
        }
        return $keys;
    }

    /**
     * Returns an array with only 
     * the values.
     * 
     * @return  array
     */
    public function values() {
        $values = array();
        foreach ( $this->entries as $key => $value ) {
            array_push( $values, $value );
        }
        return $values;
    }

    /**
     * Magic function to check
     * if a property isset
     * 
     * @param   string $name
     * @return  boolean
     */
    public function __isset( $name ) {
        return isset( $this->entries[ $name ] );
    }

    /**
     * Converts the entries to
     * a queryiable string
     * 
     * @return  string
     */
    public function __toString() {
        $query = array();
        foreach ( $this->entries as $key => $value ) {
            array_push( $query, "{$key}={$value}" );
        }
        return '?' + implode( '&', $query );
    }

}

/**
 * FormHandler
 * 
 * Submit and AJAX handler of the print form.
 * 
 * @since	1.0
 * @author	control
 * @package FormHandler
 */
class FormHandler {

    public function __construct( $post_action, $ajax_action )
    {
        $this->register_post_actions( $post_action, 'submit' );
		$this->register_ajax_actions( $ajax_action, 'submit' );
    }

    /**
	 * register_post_actions
	 * 
	 * Registers the form to admin_post hook so we can listen to the response.
	 * 
	 * @param	string $action Name of the form action.
	 * @param	string $method Name of response method.
	 */
    private function register_post_actions( $action, $method ) 
    {
		add_action( "admin_post_nopriv_{$action}", array( $this, $method ), 10, 0 );
		add_action( "admin_post_{$action}", array( $this, $method ), 10, 0 );
	}

	/**
	 * register_ajax_actions
	 * 
	 * Registers the form to admin_ajax hook so we can listen to the response.
	 * 
	 * @param	string $action Name of the form action.
	 * @param	string $method Name of response method.
	 */
    private function register_ajax_actions( $action, $method ) 
    {
		add_action( "wp_ajax_nopriv_{$action}", array( $this, $method ), 10, 0 );
		add_action( "wp_ajax_{$action}", array( $this, $method ), 10, 0 );
	}

    /**
     * submit
     * 
     * Submit entry point. From here we look at the submitted values and 
     * create logic based on the input.
     */
    public function submit() 
    {

        // Check security.
        if ( ! isset( $_POST[ '_wp_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_wp_nonce' ], 'print-form' ) ) {
            wp_die( __( 'Nonce is not set or invalid', THEME_TEXT_DOMAIN ) );
        }

        // Clean up fields.
        $fields = $this->sanitize_fields( $_POST );

        // Return a success response.
        $response = array(
            'status'    => 'success',
            'message'   => 'All fields are filled in correctly',
            'entries'   => $fields->get_entries()
        );

        // Return response.
        echo json_encode( $response );
        die();

    }

    /**
     * sanitize_fields
     * 
     * Check if fields are valid and filter them from potentially malicious values.
     * Stores the sanitized values into a Fields class instance.
     * 
     * @param   array $fields $_POST or $_GET array with values.
     * @return  Fields
     */
    public function sanitize_fields( $fields ) 
    {

        // Create new Fields instance.
        $form_fields = new Fields();

        // Loop over all the fields.
        foreach( $fields as $field => $value ) {

            // Sanitize your fields here.

        }

        return $form_fields;

    }

    /**
	 * validate_email
	 * 
	 * Check if string is valid email.
	 * 
	 * @param	string $value Value to check.
	 * @return	bool
	 */
    public static function validate_email( $value ) 
    {
		if ( preg_match( '/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD', $value ) ) {
            return true;
        }
		return false;
    }
    
    /**
	 * validate_phone
	 * 
	 * Check if string is valid phone number.
	 * 
	 * @param	string $value Value to check.
	 * @return	bool
	 */
    public static function validate_phone( $value ) 
    {
		if ( preg_match( '/^(\+|00|0)(31\s?)?(6[\s-]?[1-9][0-9]{7}|[1-9][0-9][\s-]?[1-9][0-9]{6}|[1-9][0-9]{2}[\s-]?[1-9][0-9]{5})$/', $value ) ) {
            return true;
        }
		return false;
    }
    
    /**
	 * send_email
	 * 
	 * Send email from this form.
	 * 
	 * @param	string $to Email addressee.
	 * @param	string $from Email from.
	 * @param	string $subject Subject of email.
	 * @param	string $message Message of email.
	 * @return	bool If message has been succesfully sent
	 */
    public function send_email( $to, $from, $subject, $message ) 
    {

		// Set headers for mail to support HTML format.
		$email_headers = array(
			"From: {$from}",
			"Reply-To: {$from}",
			'MIME-Version: 1.0',
			'Content-type: text/html; charset=utf-8'
		);

		// Send email
		$email_sent = wp_mail( $to, $subject, $message, $email_headers );
		return $email_sent;

	}

}