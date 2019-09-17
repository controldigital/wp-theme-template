<?php
/**
 * Theme:
 * Template:			footer-default.php
 * Description:			Default footer template
 */

?>

<footer class="footer footer--default" role="contentinfo">
	<div class="footer__container">
		<div class="footer__row">

			<?php if ( is_active_sidebar( 'sidebar-footer-1' ) ) { ?>
				<div class="footer__column footer__column-1">
					<?php dynamic_sidebar( 'sidebar-footer-1' ); ?>
				</div>
			<?php } ?>
			<?php if ( is_active_sidebar( 'sidebar-footer-2' ) ) { ?>
				<div class="footer__column footer__column-2">
					<?php dynamic_sidebar( 'sidebar-footer-2' ); ?>
				</div>
			<?php } ?>
			<?php if ( is_active_sidebar( 'sidebar-footer-3' ) ) { ?>
				<div class="footer__column footer__column-3">
					<?php dynamic_sidebar( 'sidebar-footer-3' ); ?>
				</div>
			<?php } ?>
			<?php if ( is_active_sidebar( 'sidebar-footer-4' ) ) { ?>
				<div class="footer__column footer__column-4">
					<?php dynamic_sidebar( 'sidebar-footer-4' ); ?>
				</div>
			<?php } ?>

		</div>
	</div>
</footer>