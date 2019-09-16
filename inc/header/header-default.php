<?php
/**
 * Theme:
 * Template:			header-default.php
 * Description:			Default header template
 */

?>

<header class="header header--default" role="banner">
    <ctrl-banner class="header__container">

        <a 
            slot="logo" 
            class="logo logo--site" 
            href="<?php echo home_url(); ?>" 
            rel="home" 
            itemprop="url">
            <?php the_logo(); ?>
        </a>

        <ctrl-menu 
            slot="menu" 
            class="header__nav" 
            id="header-menu" 
            aria-labelledby="menu-toggle">
            <?php get_template_part( './inc/navigation/nav', 'default' ); ?>
            <?php get_sidebar( 'nav' ); ?>
        </ctrl-menu>

        <button 
            slot="toggle"
            id="menu-toggle" 
            class="toggle js-toggle-menu" 
            aria-haspopup="true" 
            aria-controls="header-menu"
            aria-expanded="false"
            title="<?php _e( 'Toggle menu', THEME_TEXT_DOMAIN ); ?>">
            <div class="toggle__inner">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>

    </ctrl-banner>
</header>