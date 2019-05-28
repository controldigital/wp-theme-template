<?php
/**
 * Theme:				
 * Template:			template-slider.php
 * Description:			
 */

?>

<template id="template-slider">

	<style>

		*, 
		*::before, 
		*::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

		:host {
			display: block;
			position: relative;
			font-size: 100%;
		}

		.container {
			display: grid;
			height: 100%;
			width: 100%;
		}

		:host([axis="horizontal"]) .container {
			grid-template-rows: 1fr auto;
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 
				"prev . next"
				"prev controls next";
		}

		:host([axis="vertical"]) .container {
			grid-template-rows: auto 1fr auto;
			grid-template-columns: 1fr auto;
			grid-template-areas: 
				"prev prev"
				". controls"
				"next next";
		}

		.wrapper {
			position: relative;
			overflow: hidden;
		}

		:host([axis="horizontal"]) .wrapper {
			grid-area: 1 / 1 / 2 / 4;
		}

		:host([axis="horizontal"][layout="full"]) .wrapper {
			grid-area: 1 / 1 / 3 / 4;
		}

		:host([axis="horizontal"][layout="boxed"]) .wrapper {
			grid-area: 1 / 2 / 3 / 3;
			padding: 15px;
		}

		:host([axis="vertical"]) .wrapper {
			grid-area: 1 / 1 / 4 / 2;
		}

		:host([axis="vertical"][layout="full"]) .wrapper {
			grid-area: 1 / 1 / 4 / 3;
		}

		:host([axis="vertical"][layout="boxed"]) .wrapper {
			grid-area: 2 / 1 / 3 / 2;
			padding: 15px;
		}

		.rails {
			display: flex;
			align-items: stretch;
			flex-wrap: nowrap;
			height: 100%;
			will-change: transform;
		}

		:host([axis="horizontal"]) .rails {
			flex-direction: row;
		}

		:host([axis="vertical"]) .rails {
			flex-direction: column;
		}

		.prev,
		.next {
			display: flex;
			align-items: stretch;
			z-index: 2;
		}

		.prev {
			grid-area: prev;
		}

		.next {
			grid-area: next;
		}

		.controls {
			grid-area: controls;
			z-index: 1;
		}

		::slotted(control-slide) {
			flex-grow: 0;
			flex-shrink: 0;
		}

		:host([axis="horizontal"][layout="boxed"]) ::slotted(control-slide),
		:host([axis="vertical"][layout="boxed"]) ::slotted(control-slide) {
			padding: 15px;
		}

		:host([amount="1"]) ::slotted(control-slide) {
			width: 100%;
		}

		:host([amount="2"]) ::slotted(control-slide) {
			width: 50%;
		}

		:host([amount="3"]) ::slotted(control-slide) {
			width: 33.3333333333%;
		}

		:host([amount="4"]) ::slotted(control-slide) {
			width: 25%;
		}

		:host([amount="5"]) ::slotted(control-slide) {
			width: 20%;
		}

		:host([amount="6"]) ::slotted(control-slide) {
			width: 16.6666666667%;
		}

		:host([amount="7"]) ::slotted(control-slide) {
			width: 14.2857142857%;
		}

		:host([amount="8"]) ::slotted(control-slide) {
			width: 12.5%;
		}

		:host([amount="9"]) ::slotted(control-slide) {
			width: 11.1111111111%;
		}

		:host([amount="10"]) ::slotted(control-slide) {
			width: 10%;
		}

		:host([amount="1"][axis="vertical"]) ::slotted(control-slide) {
			height: 100%;
		}

		:host([amount="2"][axis="vertical"]) ::slotted(control-slide) {
			height: 50%;
		}

		:host([amount="3"][axis="vertical"]) ::slotted(control-slide) {
			height: 33.3333333333%;
		}

		:host([amount="4"][axis="vertical"]) ::slotted(control-slide) {
			height: 25%;
		}

		:host([amount="5"][axis="vertical"]) ::slotted(control-slide) {
			height: 20%;
		}

		:host([amount="6"][axis="vertical"]) ::slotted(control-slide) {
			height: 16.6666666667%;
		}

		:host([amount="7"][axis="vertical"]) ::slotted(control-slide) {
			height: 14.2857142857%;
		}

		:host([amount="8"][axis="vertical"]) ::slotted(control-slide) {
			height: 12.5%;
		}

		:host([amount="9"][axis="vertical"]) ::slotted(control-slide) {
			height: 11.1111111111%;
		}

		:host([amount="10"][axis="vertical"]) ::slotted(control-slide) {
			height: 10%;
		}

	</style>

	<div class="container">

		<div class="wrapper">
			<div class="rails">
				<slot name="slide"></slot>
			</div>
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