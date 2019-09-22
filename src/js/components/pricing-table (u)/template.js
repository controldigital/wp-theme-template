/**
 * @module      ./components/pricing-table/template
 */

import { createTemplate } from 'Utilities/elements.js';

/**
 * Creates a template specific for the pricing table element.
 * 
 * @function        createTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createPricingTableTemplate = () => createTemplate(/*template*/`

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
                contain: content;
            }

        </style>

        
    `
);