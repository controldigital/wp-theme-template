/**
 * @module		./components/google-maps/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Creates a template specific for the card element.
 * 
 * @function        createTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createTemplate = () => createElement('template', {
	html: /*template*/`
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
			}

			.google-map {
				display: block;
				width: 100%;
				height: 100%;
			}			

		</style>

		<div class="google-map"></div>
	`
});