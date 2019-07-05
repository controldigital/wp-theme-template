/**
 * @module		./components/card/template
 */

import { createElement } from 'Modules/elements.js';

/**
 * Creates a template specific for the like element.
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

        </style>

        <div class="icon"></div>

	`
});