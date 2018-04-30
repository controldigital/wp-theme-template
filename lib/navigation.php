<?php
/**
 *	Theme:
 *	Template:			navigation.php
 *	Description:		Register navigation locations for theme
*/

/**
 *  Register Navigation Menus
 * 
 */
add_action( 'after_setup_theme', 'navigation_menus' );
function navigation_menus() {

	// register_nav_menu( '', __( '', 'text_domain' ) );

}


/**
 * Custom Nav Walker for main menu
 * 
 */
class Custom_Walker_Nav_Menu extends Walker_Nav_Menu {

	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		$output .= '<ul class="menu__submenu">';
	}

	public function end_lvl( &$output, $depth = 0, $args = array() ) {
		$output .= '</ul>';
	}

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		
		// Has sub menu class
		$has_submenu = '';
		if ( $args->walker->has_children ) $has_submenu = ' menu__item--has-sub';
		
		// Is sub or not
		$depth_class = '';
		$depth_link_class = '';
		if ( $depth > 0 ) {
			$depth_class = ' menu__item--sub';
			$depth_link_class = ' menu__link--sub';
		}
		
		$output .= '<li class="menu__item' . $depth_class . $has_submenu . '">';
		$output .= '<a class="menu__link' . $depth_link_class . '" href="' . $item->url . '" title="' . $item->title . '">' . $item->title;
		$output .= '</a>';
	}

	public function end_el( &$output, $item, $depth = 0, $args = array() ) {
		$output .= '</li>';
	}

}