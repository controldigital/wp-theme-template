<?php
/**
 * Theme:				
 * Template:			template-modal.php
 * Description:			
 */

?>

<template id="template-modal">

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
			display: grid;
			grid-template-rows: 1fr;
			grid-template-columns: 1fr;
			align-items: center;
			justify-content: center;
			contain: content;
			position: fixed;
			top: 0;
			left: 0;
            width: 100%;
            height: 100%;
			opacity: 0;
			visibility: hidden;
			background-color: rgba(0, 0, 0, 0.5);
			transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
        }

		:host([open]) {
			opacity: 1;
			visibility: visible;
		}

		.wrapper {
			grid-area: 1 / 1 / 2 / 2;
			position: relative;
			display: grid;
			grid-template-rows: 1.75rem 1fr;
			grid-template-columns: 1fr 1.75rem;
			height: auto;
			width: 20rem;
			max-width: 100%;
			background: #ffffff;
			color: #000000;
			box-shadow: 0 2px 1rem 0 rgba(0, 0, 0, 0.5);
		}

		button {
			grid-area: 1 / 2 / 2 / 3;
			-webkit-appearance: none;
       		-moz-appearance: none;
            appearance: none;
			font-size: 100%;
			font-family: inherit;
			padding: 0;
			border: 0;
			background: #ffffff;
		}

		svg {
			display: block;
			width: 100%;
			height: 100%;
		}

		.container {
			grid-area: 1 / 1 / 3 / 3;
			padding: 3.5rem;
		}

    </style>

    <div class="wrapper">
		<button type="button" aria-label="<? _e( 'Close modal', THEME_TEXT_DOMAIN ); ?>">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
				<g fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10">
					<line x1="5" y1="5" x2="23" y2="23"></line>
					<line x1="5" y1="23" x2="23" y2="5"></line>
				</g>
			</svg>
		</button>
		<div class="container">
			<slot name="label"></slot>
			<slot name="description"></slot>
			<slot name="content"></slot>
		</div>
	</div>

</template>