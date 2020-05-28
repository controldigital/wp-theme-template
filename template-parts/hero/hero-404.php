<?php
/**
 * Template:			hero-404.php
 * Description:			404 hero template
 */
 
$title          = get_theme_mod( '404_title' );
$subtitle       = get_theme_mod( '404_subtitle' );
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
			<p class="subtitle"><?php echo $subtitle; ?></p>
			<h1><?php echo $title; ?></h1>
		</div>
	</div>
	
</header>