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

        :host {
            all: initial;
            display: contain;
            contain: content;
        }
        
    </style>

    <slot></slot>

`);