<?php
/**
 * Theme:
 * Template:			header.php
 * Description:			Default header template
 */

?>

<header class="header" role="banner">
    <div class="header__container">

        <?php if ( get_the_logo() ) { ?>
            <div class="header__logo">
                <a class="logo logo--site" href="<?php echo home_url(); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home" itemprop="url">
                    <img src="<?php the_logo(); ?>" alt="<?php bloginfo( 'name' ); ?>">
                </a>
            </div>
        <?php } ?>

        <div class="header__navigation" id="header-nav" aria-labelledby="menu-toggle">
            <?php get_template_part( './inc/navigation/navigation', 'default' ); ?>
            <?php get_template_part( './inc/sidebar/sidebar', 'menu' ); ?>
        </div>

        <div class="header__mobile">
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