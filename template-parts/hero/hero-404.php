<?php
/**
 * Template:			hero-404.php
 * Description:			404 hero template
 */
 
$title          = get_theme_mod( '404_title' );
$heading        = get_theme_mod( '404_heading' );
$image_id	    = get_theme_mod( '404_image' );
$image_alt 		= get_post_meta( $image_id, '_wp_attachment_image_alt', true );
$image_src 		= wp_get_attachment_image_src( $image_id , 'full' );

?>

<header class="hero">
	
	<?php if ($image_src ) { ?>
		<div class="hero__thumbnail" style="background-image: url(<?php echo $image_src[0]; ?>)"></div>
	<?php } ?>
	
	<div class="hero__container">
		<div class="hero__content">
			<p class="hero__title"><?php echo $title; ?></p>
			<h1 class="hero__heading"><?php echo $heading; ?></h1>
		</div>
	</div>
	
</header>