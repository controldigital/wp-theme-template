<?php
/**
 * Theme:
 * Template:			sidebar-header.php
 * Description:			Sidebar header template
 */

?>

<?php if ( is_active_sidebar( 'sidebar-header' ) ) { ?>
    <div class="sidebar sidebar--header">
        <ul>
            <?php dynamic_sidebar( 'sidebar-header'); ?>
        </ul>
    </div>
<?php } ?>