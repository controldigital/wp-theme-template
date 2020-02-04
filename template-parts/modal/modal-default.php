<?php
/**		    
 * Template:			modal-default.php
 * Description:			Default modal template
 */

?>

<div role="dialog"
	 aria-label="<?php _e( 'Modal', 'control' ); ?>"
	 aria-modal="true"
	 id="modal"
	 class="modal modal--default js-modal">
	<div class="modal__container">
		<button class="modal__close" title="<?php _e( 'Close modal', 'control' ); ?>"><?php _e( 'Close', 'control' ); ?></button>
		<div class="modal__content js-modal-content">

		</div>
	</div>
</div>