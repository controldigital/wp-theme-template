/**
 * @module      ./components/map/template
 */

import { createTemplate } from 'Utilities/elements.js';

/**
 * Creates a template specific for the map element.
 * 
 * @function        createMapTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createMapTemplate = () => createTemplate(/*template*/`

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

        <div class="map"></div>

    `
);