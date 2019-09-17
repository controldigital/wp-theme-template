/**
 * @module		./components/message/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Function that creates a template with contents for 
 * the Shadow DOM of the message element.
 * 
 * @function	createTemplate
 * @returns		{HTMLTemplateElement}
 */
export const createTemplate = () => createElement('template', {
	html: /* template */`

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

			:host([position="top"]) {

			}

			:host([position="right"]) {
				
			}

			:host([position="bottom"]) {
				
			}

			:host([position="left"]) {
				
			}

			:host([type="warning"]) {
				
			}

			:host([type="info"]) {
				
			}

			:host([type="error"]) {
				
			}

		</style>

	`
});