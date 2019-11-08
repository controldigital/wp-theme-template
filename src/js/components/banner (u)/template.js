/**
 * @module      ./components/banner/template
 */

import { createTemplate } from 'Utilities/elements.js';

/**
 * Creates a template specific for the banner element.
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
            --banner-height: 4.25em;
            --banner-background-color: var(--color-light);
            --banner-sticky-top: 0;
            --banner-sticky-left: 0;
            --banner-room-transition: transform var(--duration-medium) ease-in-out;
            --banner-up-position: translate3d(0, 0, 0);
            --banner-down-position: translate3d(0, -100%, 0);
            all: initial;
            display: block;
            contain: content;
            position: relative;
            font-size: 100%;
            background-color: var(--banner-background-color);
        }

        :host([sticky]) {
            position: -webkit-sticky;
            position: sticky;
            top: var(--banner-sticky-top);
            left: var(--banner-sticky-left);
        }

        :host([room]) {
            -webkit-transition: var(--banner-room-transition);
            transition: var(--banner-room-transition);
        }

        :host([up]) {
            transform: var(--banner-up-position);
        }

        :host([down]) {
            transform: var(--banner-down-position);
        }
        
        .container {
            display: grid;
            grid-template:
                "logo sidebar toggle" auto auto var(--banner-height) / var(--banner-height);
            grid-column-gap: 1em;
            column-gap: 1em;
            padding: 0 1em;
        }

        .logo,
        .toggle {
            position: relative;
            background-color: var(--banner-background-color);
            z-index: 1;
        }

        .logo {
            grid-area: logo;
        }

        .sidebar {
            grid-area: sidebar;
            margin-left: auto;
        }

        .menu {
            grid-area: logo;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 0;
        }

        .toggle {
            grid-area: toggle;
        }

        /**
         * Tablet and above
         */
        @media screen and (calc(min-width: 64em + 1px)) {

            .container {
                grid-template:
                    "logo menu sidebar" auto auto auto / var(--banner-height);
            }

            .sidebar {
                margin-left: 0;
            }

            .menu {
                position: relative;
                margin-left: auto;
            }

            .toggle {
                display: none;
            }

        }
        
    </style>

	<div class="container">
		<div class="logo">
			<slot name="logo"></slot>
		</div>
		<div class="menu">
			<slot name="menu"></slot>
        </div>
        <div class="sidebar">
            <slot name="sidebar"></slot>
        </div>
		<div class="toggle">
			<slot name="toggle"></slot>
		</div>
	</div>

`);