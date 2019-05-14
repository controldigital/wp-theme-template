<?php
/**
 * Theme:
 * Template:			nav-default.php
 * Description:			Default navigation template
 */

// Create arguments for navigation
$nav_menu_args = array(
    'theme_location'        => 'menu-main',
    'container'             => 'nav',
    'container_class'       => 'nav nav--default',
    'menu_class'            => 'menu menu--default',
    'menu_id'               => 'main-menu',
    'walker'                => new Custom_Walker_Nav_Menu()
);

?>

<?php wp_nav_menu( $nav_menu_args ); ?>