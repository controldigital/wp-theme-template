<?php
/**
 * The default template for displaying content
 *
 */

?>

<article class="content" id="post-<?php the_ID(); ?>">

	<?php
	get_hero();
	?>

	<section class="section">
		<?php the_content(); ?>
	</section>

</article>
