/**
 * @module      ./component/slider/template
 */

import { createTemplate } from 'Utilities/elements.js';

/**
 * Creates a template specific for the slide element.
 * 
 * @function        createSlideTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createBannerTemplate = () => createTemplate(/*template*/`
    
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

	<div class="container">
		<div class="logo">
			<slot name="logo">
		</div>
		<div class="menu">
			<slot name="menu">
		</div>
		<div class="toggle">
			<slot name="toggle"></slot>
		</div>
	</div>

`);