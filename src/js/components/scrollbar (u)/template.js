/**
 * @module      ./components/scrollbar/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Creates a template specific for the scrollbar element.
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

			:host(axis="horizontal") .bar {
				transform: translate3d(-100%, 0, 0);
			}

			:host(axis="vertical") .bar {
				transform: translate3d(0, -100%, 0);
			}

			.bar {
				display: block;
				height: 100%;
				width: 100%;
				will-change: transform;
			}

        </style>

        <div class="bar"></div>
    `
});