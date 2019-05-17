<?php
/**
 * Theme:			    
 * Template:			modal-default.php
 * Description:			Default modal template
 */

?>

<div role="dialog"
	 aria-label="<?php _e( 'Modal', THEME_TEXT_DOMAIN ); ?>"
	 aria-modal="true"
	 id="modal"
	 class="modal modal--default js-modal">
	<div class="modal__container">
		<button class="modal__close" title="<?php _e( 'Close modal', THEME_TEXT_DOMAIN ); ?>"><?php _e( 'Close', THEME_TEXT_DOMAIN ); ?></button>
		<div class="modal__content js-modal-content">

		</div>
	</div>
</div>