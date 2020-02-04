<?php
/**	
 * Template:			header.php
 * Description:			The template for displaying the header
 */

 ?>

<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>" class="no-js">
	<head>

		<?php 
		wp_head(); ?>
		
	</head>
	<body <?php body_class(); ?>>

		<?php 
		wp_body_open(); 

		get_template_part( './template-parts/splash' ); ?>		

		<header id="site-header" class="header" role="banner">
			<div class="header__container">

				<?php if ( get_the_logo() ) { ?>
					<div class="header__logo">
						<a class="logo logo--site" href="<?php echo home_url(); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home" itemprop="url">
							<img src="<?php the_logo(); ?>" alt="<?php bloginfo( 'name' ); ?>">
						</a>
					</div>
				<?php } ?>

				<div class="header__navigation" id="header-nav" aria-labelledby="menu-toggle">
					<?php $nav_menu_args = array(
						'theme_location'        => 'menu-main',
						'container'             => 'nav',
						'container_class'       => 'nav nav--default',
						'menu_class'            => 'menu menu--default',
						'menu_id'               => 'main-menu',
						'walker'                => new Custom_Walker_Nav_Menu()
					);
					wp_nav_menu( $nav_menu_args ); ?>

					<?php if ( is_active_sidebar( 'sidebar-menu' ) ) { ?>
						<div class="sidebar sidebar--menu">
							<ul>
								<?php dynamic_sidebar( 'sidebar-menu'); ?>
							</ul>
						</div>
					<?php } ?>
				</div>

				<?php if ( is_active_sidebar( 'sidebar-header' ) ) { ?>        
					<div class="header__sidebar">
						<div class="sidebar sidebar--header">
							<ul>
								<?php dynamic_sidebar( 'sidebar-header'); ?>
							</ul>
						</div>
					</div>
				<?php } ?>

				<div class="header__toggle">
					<button id="menu-toggle" 
						class="toggle js-toggle-menu" 
						aria-haspopup="true" 
						aria-controls="header-nav"
						aria-expanded="false"
						title="<?php _e( 'Toggle menu', THEME_TEXT_DOMAIN ); ?>">
						<div class="toggle__inner">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>
				</div>

			</div>
		</header>