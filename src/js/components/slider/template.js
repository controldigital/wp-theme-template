/**
 * @module      ./component/slider/template
 */

import { createTemplate } from 'Utilities/elements.js';

/**
 * Creates a template specific for the slider element.
 * 
 * @function        createSliderTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createSliderTemplate = () => createTemplate(/*template*/`

    <style>

        *, 
        *::before, 
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :host {
            --container-layout:
                "prev container next" 100% / auto 1fr auto;
            --wrapper-area: 1 / 1 / span 1 / span 3;
            --rails-direction: row;
            --slide-size: 100%;
            --slide-padding: 15px;
            --prev-area: prev;
            --next-area: next;

            all: initial;
            display: block;
            position: relative;
            font-size: 100%;
        }

        .container {
            display: grid;
            grid-template: var(--container-layout);
            height: 100%;
            width: 100%;
        }

        :host([axis="horizontal"]) .container {
            --container-layout:
                "prev container next" 100% / auto 1fr auto;
        }

        :host([axis="vertical"]) .container {
            --container-layout:
                "prev" auto
                "container" 1fr
                "next" auto / 100%;
        }

        .prev {
            grid-area: var(--prev-area);
        }

        .next {
            grid-area: var(--next-area);
        }

        .wrapper {
            grid-area: var(--wrapper-area);
            position: relative;
            overflow: hidden;
        }

        :host([axis="horizontal"]) .wrapper {
            --wrapper-area: 1 / 1 / span 1 / span 3;
        }

        :host([axis="vertical"]) .wrapper {
            --wrapper-area: 1 / 1 / span 3 / span 1;
        }

        .rails {
            display: flex;
            align-items: stretch;
            flex-wrap: nowrap;
            flex-direction var(--rails-direction);
            height: 100%;
            will-change: transform;
        }

        :host([axis="horizontal"]) .rails {
            --rails-direction: row;
        }

        :host([axis="vertical"]) .rails {
            --rails-direction: column;
        }

        ::slotted([slot="slide"]) {
            flex-grow: 0;
            flex-shrink: 0;
            padding: var(--slide-padding);
        }

        :host([axis="horizontal"]) ::slotted([slot="slide"]) {
            width: var(--slide-size);
            --slide-padding: 0 15px;
        }

        :host([axis="vertical"]) ::slotted([slot="slide"] {
            height: var(--slide-size);
            --slide-padding: 15px 0;
        }

        :host([amount="1"]) ::slotted([slot="slide"] {
            --slide-size: 100%;
        }

        :host([amount="2"]) ::slotted([slot="slide"] {
            --slide-size: 50%;
        }

        :host([amount="3"]) ::slotted([slot="slide"] {
            --slide-size: 33.3333333333%;
        }

        :host([amount="4"]) ::slotted([slot="slide"] {
            --slide-size: 25%;
        }

        :host([amount="5"]) ::slotted([slot="slide"] {
            --slide-size: 20%;
        }

        :host([amount="6"]) ::slotted([slot="slide"] {
            --slide-size: 16.6666666667%;
        }

        :host([amount="7"]) ::slotted([slot="slide"] {
            --slide-size: 14.2857142857%;
        }

        :host([amount="8"]) ::slotted([slot="slide"] {
            --slide-size: 12.5%;
        }

        :host([amount="9"]) ::slotted([slot="slide"] {
            --slide-size: 11.1111111111%;
        }

        :host([amount="10"]) ::slotted([slot="slide"] {
            --slide-size: 10%;
        }

    </style>

    <div class="container">
        <div class="prev">
            <slot name="prev"></slot>
        </div>
        <section class="wrapper" role="region" aria-roledescription="carousel">
            <div class="rails" 	aria-live="polite" draggable>
                <slot name="slide"></slot>
            </div>
        </section>
        <div class="next">
            <slot name="next"></slot>
        </div>
    </div>

`);

/**
 * Creates a template specific for the slide element.
 * 
 * @function        createSlideTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createSlideTemplate = () => createTemplate(/*template*/`
    
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