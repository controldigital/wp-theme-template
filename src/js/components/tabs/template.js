/**
 * @module      ./components/tabs/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Creates a template specific for the tabs element.
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
                width: 100%;
                height: 100%;
            }

        </style>

        <div role="tablist">
            <slot name="tab"></slot>
        </div>

        <slot name="panel"></slot>

    `
});