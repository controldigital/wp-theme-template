/**
 * @module      ./components/modal/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Creates a template specific for the modal element.
 * 
 * @function        createElement
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
                contain: content;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                /* transition: opacity var(--duration-long) ease-in-out, visibility var(--duration-long) ease-in-out; */
            }

            .wrapper {
                display: grid;
                position: relative;
                width: 100%;
                height: 100%;
            }

            .toggle {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                font-size: 1em;
                font-weight: 400;
                line-height: 1.5;
                text-transform: uppercase;
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                width:  4.25em;
                height: 4.25em;
                padding: 0 1.25em;
                border: 0;
                cursor: pointer;
                background: var(--color-background);
                z-index: 1;
            }

            .toggle:focus {
                outline: 0;
            }

            .toggle__inner {
                position: relative;
            }

            .toggle__inner > span {
                display: block;
                position: absolute;
                width: 100%;
                height: 2px;
                background: var(--color-accent);
                left: 0;
            }

            .toggle__inner > span:first-of-type {
                top: -15px;
                transform: translate3d(0, 14px, 0) rotate(45deg);
            }

            .toggle__inner > span:last-of-type {
                bottom: -15px;
                transform: translate3d(0, -14px, 0) rotate(-45deg);
            }

        </style>

        <button class="toggle js-toggle-modal" aria-expanded="false" title="Close modal">
            <div class="toggle__inner">
                <span></span>
                <span></span>
            </div>
        </button>
        <div class="wrapper">
            <slot></slot>
        </div>
    `
});