<?php
/**
 * Theme:				
 * Template:			template-slide.php
 * Description:			
 */

?>

<template id="template-slide">

	<style>

		*, 
		*::before, 
		*::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

		:host {
			all: initial;
			display: block;
			contain: content;
			position: relative;
			font-size: 100%;
			height: 100%;
		}

		.wrapper {
			display: grid;
			grid-template-rows: 1fr;
			grid-template-columns: 1fr;
			grid-template-areas: "wrapper";
			height: 100%;
		}

		.thumbnail,
		.inner {
			grid-area: wrapper;
		}

		.inner {
			padding: 1em;
		}
		
	</style>

	<article class="wrapper" role="group" aria-roledescription="slide">
		
		<div class="thumbnail">
			<slot name="thumbnail"></slot>
		</div>

		<div class="inner">
			<header class="header">
				<slot name="title"></slot>
			</header>

			<div class="body">
				<slot name="body"></slot>
			</div>
		</div>

	</article>
</template>