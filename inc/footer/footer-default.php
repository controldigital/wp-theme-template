<?php
/**
 * Theme:
 * Template:			footer-default.php
 * Description:			Default footer template
 */

?>

<footer class="footer footer--default" role="contentinfo">
	<div class="container">
		<div class="row">

			<div class="box-sm-6 box-md-3">
				<?php dynamic_sidebar( 'sidebar-footer-1' ); ?>
			</div>

			<div class="box-sm-6 box-md-3">
				<?php dynamic_sidebar( 'sidebar-footer-2' ); ?>
			</div>

			<div class="box-sm-6 box-md-3">
				<?php dynamic_sidebar( 'sidebar-footer-3' ); ?>
			</div>

			<div class="box-sm-6 box-md-3">
				<?php dynamic_sidebar( 'sidebar-footer-4' ); ?>
			</div>

		</div>
	</div>
</footer>