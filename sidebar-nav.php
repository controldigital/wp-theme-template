<?php
/**
 * Theme:				
 * Template:			sidebar-nav.php
 * Description:			Navigation sidebar
 */

?>

<?php if ( is_active_sidebar( 'sidebar-nav' ) ) { ?>
    <div class="sidebar sidebar--nav">
        <ul>
            <?php dynamic_sidebar( 'sidebar-nav'); ?>
        </ul>
    </div>
<?php } ?>