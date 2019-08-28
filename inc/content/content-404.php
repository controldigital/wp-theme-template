<?php
/**
 * Theme:				
 * Template:			content-default.php
 * Description:			Default template to output post content
 */

$title 		= get_option( 'theme-404-title' );
$content 	= get_option( 'theme-404-content' );
?>

<div class="content js-ajax-post">

	<?php echo $content; ?>

</div>