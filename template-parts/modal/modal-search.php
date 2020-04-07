<?php
/**  
 * Template:			modal-search.php
 * Description:			Search modal template
 */

?>

<div role="dialog"
	 aria-label="<?php _e( 'Search modal', 'control' ); ?>"
	 aria-modal="true"
	 id="modal-search"
	 class="modal modal--search js-modal">
	<div class="modal__container">
		<button class="modal__close" title="<?php _e( 'Close modal', 'control' ); ?>"><?php _e( 'Close', 'control' ); ?></button>
		<div class="modal__content js-modal-content">

			<form role="search" method="GET" id="search-form" action="<?php echo home_url( '/' ); ?>">
				<input type="search" name="s" id="s" value="" placeholder="<?php _e( 'Search', 'control' ); ?>">
				<button type="submit"><?php _e( 'Submit', 'control' ); ?></button>
			</form>

		</div>
	</div>
</div>