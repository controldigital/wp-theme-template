/**
 * @module      ./component/banner/template
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
            --banner-sticky-top: 0;
            --banner-sticky-left: 0;
            all: initial;
            display: block;
            contain: content;
            position: relative;
            font-size: 100%;
        }

        :host([sticky]) {
            position: -webkit-sticky;
            position: sticky;
            top: var(--banner-sticky-top);
            left: var(--banner-sticky-left);
        }

        /*
        .container {
            display: grid;
            grid-template:
                "logo toggle" 1fr / 
        } */
        
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