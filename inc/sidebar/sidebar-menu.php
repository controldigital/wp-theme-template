<?php
/**
 * Theme:
 * Template:			sidebar-menu.php
 * Description:			Sidebar menu template
 */

?>

<?php if ( is_active_sidebar( 'sidebar-menu' ) ) { ?>
    <div class="sidebar sidebar--menu">
        <ul>
            <?php dynamic_sidebar( 'sidebar-menu'); ?>
        </ul>
    </div>
<?php } ?>