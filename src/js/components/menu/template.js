/**
 * @module      ./components/menu/template
 */

import { createTemplate } from 'Utilities/elements.js';

/**
 * Creates a template specific for the menu element.
 * 
 * @function        createSlideTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createMenuTemplate = () => createTemplate(/*template*/`
    
    <style>

        *, 
        *::before, 
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :host {
            --menu-color: var(--color-light);
            --menu-background-color: var(--color-dark);
            --menu-bar-height: 0.125em;
            --menu-bar-width: 1.5em;
            --menu-bar-margin: 0.25em;

            all: initial;
            display: block;
            contain: content;
            position: relative;
            font-size: 100%;
        }

        .icon {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            position: relative;
        }

        .bar {
            background-color: var(--menu-color);
            margin: var(--menu-bar-margin);
        }

        :host([type="hamburger"]) .icon,
        :host([type="kebab"]) .icon {
            flex-direction: column;
        }

        :host([type="falafel"]) .icon,
        :host([type="sate"]) .icon {
            flex-direction: row;
        }

        :host([type="hamburger"]) .bar {
            height: var(--menu-bar-height);
            width: var(--menu-bar-width);
        }

        :host([type="sate"]) .bar {
            height: var(--menu-bar-width);
            width: var(--menu-bar-height);
        }

        :host([type="falafel"]) .bar,
        :host([type="kebab"]) .bar {
            border-radius: 50%;
            height: var(--menu-bar-height);
            width: var(--menu-bar-height);
        }

    </style>

    <div class="icon">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </div>

`);