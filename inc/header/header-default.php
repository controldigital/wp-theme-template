<?php
/**
 * Theme:
 * Template:			header-default.php
 * Description:			Default header template
 */

?>

<header class="header header--default">
    <div class="header__container">

        <div class="header__logo">
            <a class="logo logo--site" href="<?php echo home_url(); ?>" rel="home" itemprop="url">
                <?php the_logo(); ?>
            </a>
        </div>

        <div id="header-nav" class="header__nav js-header-nav" aria-labelledby="menu-toggle">
            <?php get_template_part( './inc/navigation/nav', 'default' ); ?>
            <?php get_sidebar( 'nav' ); ?>
        </div>

        <div class="header__mobile">
			<button id="menu-toggle" 
				class="menu-toggle js-toggle-menu" 
				aria-haspopup="true" 
				aria-controls="header-nav"
				aria-expanded="false"
				title="<?php _e( 'Toggle menu', THEME_TEXT_DOMAIN ); ?>">
				<div class="menu-toggle__inner">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
        </div>

    </div>
</nav>