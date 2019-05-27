<?php
/**
 * Theme:				
 * Template:			template-slider.php
 * Description:			
 */

?>

<template id="template-slider">

	<style>

		.container {
			display: grid;
			height: 100%;
			width: 100%;
			overflow: hidden;
		}

		:host[axis="horizontal"] .container {
			grid-template-rows: 1fr auto;
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 
				"prev . next"
				"prev controls next";
		}

		:host[axis="vertical"] .container {
			grid-template-rows: auto 1fr auto;
			grid-template-columns: 1fr auto;
			grid-template-areas: 
				"prev prev"
				". controls"
				"next next";
		}

		.rails {
			grid-area: 1 / 1 / 3 / 4;
			display: flex;
			align-items: stretch;
			flex-wrap: nowrap;
		}

		:host[axis="horizontal"] .rails {
			flex-direction: row;
		}

		:host[axis="vertical"] .rails {
			flex-direction: column;
		}

		.prev {
			grid-area: prev;
		}

		.next {
			grid-area: next;
		}

		.controls {
			grid-area: controls;
		}

		::slotted(*) {
			flex-grow: 0;
			flex-shrink: 0;
		}

		:host[amount="1"] .rails ::slotted(*) {
			flex-basis: 100%
		}

		:host[amount="2"] .rails ::slotted(*) {
			flex-basis: 50%
		}

		:host[amount="3"] .rails ::slotted(*) {
			flex-basis: 33.3%
		}

		:host[amount="4"] .rails ::slotted(*) {
			flex-basis: 25%
		}

	</style>

	<div class="container">

		<div class="rails">
			<slot name="slide"></slot>
		</div>

		<div class="prev">
			<slot name="prev"></slot>
		</div>
		<div class="next">
			<slot name="next"></slot>
		</div>

		<div class="controls">
			<slot name="dots"></slot>
		</div>

	</div>

</template>