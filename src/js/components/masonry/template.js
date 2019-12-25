/**
 * @module      ./components/masonry/template
 */

import { createTemplate } from 'Utilities/elements.js';

/**
 * Creates a template specific for the masonry element.
 * 
 * @function        createMasonryTemplate
 * @returns         {HTMLTemplateElement}
 */
const createMasonryItemTemplate = () => createTemplate(/*template*/`
    
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
            position: relative;
            font-size: 100%;
        }

	</style>

	<div class="content">
		<slot></slot>
	</div>

`);

export default createMasonryItemTemplate;