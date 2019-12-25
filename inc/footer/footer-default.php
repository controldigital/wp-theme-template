<?php
/**
 * Theme:
 * Template:			footer-default.php
 * Description:			Default footer template
 */

?>

<footer class="footer" role="contentinfo">
	<div class="footer__container">

		<?php if ( is_active_sidebar( 'sidebar-footer-1' ) ) { ?>
			<div class="footer__column footer__column--one">
				<?php dynamic_sidebar( 'sidebar-footer-1' ); ?>
			</div>
		<?php } ?>
		<?php if ( is_active_sidebar( 'sidebar-footer-2' ) ) { ?>
			<div class="footer__column footer__column--two">
				<?php dynamic_sidebar( 'sidebar-footer-2' ); ?>
			</div>
		<?php } ?>
		<?php if ( is_active_sidebar( 'sidebar-footer-3' ) ) { ?>
			<div class="footer__column footer__column--three">
				<?php dynamic_sidebar( 'sidebar-footer-3' ); ?>
			</div>
		<?php } ?>
		<?php if ( is_active_sidebar( 'sidebar-footer-4' ) ) { ?>
			<div class="footer__column footer__column--four">
				<?php dynamic_sidebar( 'sidebar-footer-4' ); ?>
			</div>
		<?php } ?>

		<?php if ( is_active_sidebar( 'sidebar-footer-bottom-left' ) ) { ?>
			<div class="footer__bottom footer__bottom--left">
				<?php dynamic_sidebar( 'sidebar-footer-bottom-left' ); ?>
			</div>
		<?php } ?>
		<?php if ( is_active_sidebar( 'sidebar-footer-bottom-right' ) ) { ?>
			<div class="footer__bottom footer__bottom--right">
				<?php dynamic_sidebar( 'sidebar-footer-bottom-right' ); ?>
			</div>
		<?php } ?>
		
	</div>
</footer>