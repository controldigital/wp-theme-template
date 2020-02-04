<?php
/**  
 * Template:			modal-search.php
 * Description:			Search modal template
 */

?>

<div role="dialog"
	 aria-label="<?php _e( 'Search modal', THEME_TEXT_DOMAIN ); ?>"
	 aria-modal="true"
	 id="modal-search"
	 class="modal modal--search js-modal">
	<div class="modal__container">
		<button class="modal__close" title="<?php _e( 'Close modal', THEME_TEXT_DOMAIN ); ?>"><?php _e( 'Close', THEME_TEXT_DOMAIN ); ?></button>
		<div class="modal__content js-modal-content">

			<form role="search" method="GET" id="search-form" action="<?php echo home_url( '/' ); ?>">
				<input type="search" name="s" id="s" value="" placeholder="<?php _e( 'Search', THEME_TEXT_DOMAIN ); ?>">
				<button type="submit"><?php _e( 'Submit', THEME_TEXT_DOMAIN ); ?></button>
			</form>

		</div>
	</div>
</div>