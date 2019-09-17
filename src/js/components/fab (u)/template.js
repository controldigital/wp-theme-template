/**
 * @module      ./components/fab/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Creates a template specific for the fab element.
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
                display: block;
                contain: content;
                position: fixed;

            }

            :host([position="top-left"]) {
                top: 45px;
                left: 24px;
            }

            :host([position="top-right"]) {
                top: 45px;
                right: 24px;
            }

            :host([position="bottom-right"]) {
                bottom: 45px;
                right: 24px;
            }

            :host([position="bottom-left"]) {
                bottom: 45px;
                left: 24px;
            }

            :host([axis="horizontal"]) {
                
            }

            :host([axis="vertical"]) {

            }

            .menu {
                position: absolute;
                opacity: 0;
                visibility: hidden;
                transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
            }

            :host([position="top-left"][axis="horizontal"]) .menu,
            :host([position="bottom-left"][axis="horizontal"]) .menu {
                top: 0;
                left: 64px;
                height: 100%;
            }

            :host([position="top-right"][axis="horizontal"]) .menu,
            :host([position="bottom-right"][axis="horizontal"]) .menu {
                top: 0;
                right: 64px;
                height: 100%;
            }

            :host([position="top-left"][axis="vertical"]) .menu,
            :host([position="top-right"][axis="vertical"]) .menu {
                top: 64px;
                left: 0px;
                width: 100%;
            }

            :host([position="bottom-right"][axis="vertical"]) .menu,
            :host([position="bottom-left"][axis="vertical"]) .menu {
                bottom: 64px;
                left: 0px;
                width: 100%;
            }
            
            :host([open]) .menu {
                opacity: 1;
                visibility: visible;
            }

            .menu-list {
                display: flex;
                align-items: stretch;
                flex-wrap: nowrap;
            }

            :host([axis="horizontal"]) .menu-list {
                flex-direction: row;
            }

            :host([axis="vertical"]) .menu-list {
                flex-direction: column;
            }

        </style>

        <div class="icon">
            <slot name="icon"></slot>
        </div>
        <nav class="menu">
            <div class="menu-list">
                <slot name="menu-item"></slot>
            </div>
        </nav>

    `
});