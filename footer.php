<?php
/**	
 * Template:			footer.php
 * Description:			The template for displaying the footer
 */

 ?>

			<footer id="site-footer" class="footer">
				<div class="footer__container">

					<?php 
					for ($x = 0; $x <= 4; $x++) {
						$sidebar = "sidebar-footer-";
						$sidebar .= $x; 
						if ( is_active_sidebar( $sidebar ) ) { ?>
							<div class="footer__column">
								<?php dynamic_sidebar( $sidebar ); ?>
							</div>
						<?php }
					}
					?>
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

		<?php wp_footer(); ?>

	</body>
</html>
