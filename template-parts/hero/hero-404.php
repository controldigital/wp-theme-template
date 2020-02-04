<?php
/**
 * Template:			hero-404.php
 * Description:			404 hero template
 */
 
$title	 	= get_option( 'theme-404-title' ); 
$thumbnail	= get_option( 'theme-404-thumbnail' ); 
?>

<header class="hero">
	
	<?php if ($thumbnail ) { ?>
		<div class="hero__thumbnail" style="background-image: url(<?php echo $thumbnail[ 'sizes' ][ 'full' ]?>)"></div>
	<?php } ?>
	
	<div class="hero__container">
		<div class="hero__content">
			<h1><?php echo $title; ?></h1>
		</div>
	</div>
	
</header>