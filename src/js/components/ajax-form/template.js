/**
 * @module		./components/ajax-form/template
 */

import { createTemplate } from 'Utilities/element.js';

/**
 * Creates a template specific for the ajax form element.
 * 
 * @function        createFormTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createFormTemplate = () => createTemplate(/*template*/`
    
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
            position: relative;
            font-size: 100%;
        }
        
    </style>

    <slot></slot>

`);