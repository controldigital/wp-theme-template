/**
 * @module      ./component/slider/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Creates a template specific for the slider element.
 * 
 * @function        createSliderTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createSliderTemplate = () => createElement('template', {
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
                contain: content;
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

            slot[name="slide"] ::slotted(*) {
                flex-grow: 0;
                flex-shrink: 0;
                padding: var(--slide-padding);
            }

            :host([axis="horizontal"]) slot[name="slide"] ::slotted(*) {
                width: var(--slide-size);
                --slide-padding: 0 15px;
            }

            :host([axis="vertical"]) slot[name="slide"] ::slotted(*) {
                height: var(--slide-size);
                --slide-padding: 15px 0;
            }

            :host([amount="1"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 100%;
            }

            :host([amount="2"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 50%;
            }

            :host([amount="3"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 33.3333333333%;
            }

            :host([amount="4"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 25%;
            }

            :host([amount="5"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 20%;
            }

            :host([amount="6"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 16.6666666667%;
            }

            :host([amount="7"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 14.2857142857%;
            }

            :host([amount="8"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 12.5%;
            }

            :host([amount="9"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 11.1111111111%;
            }

            :host([amount="10"]) slot[name="slide"] ::slotted(*) {
                --slide-size: 10%;
            }

        </style>

        <div class="container">
            <div class="prev">
                <slot name="prev"></slot>
            </div>
            <section class="wrapper" role="region" aria-roledescription="carousel">
                <div class="rails" 	aria-live="polite">
                    <slot name="slide"></slot>
                </div>
            </section>
            <div class="next">
                <slot name="next"></slot>
            </div>
        </div>

    `
});

/**
 * Creates a template specific for the slide element.
 * 
 * @function        createSlideTemplate
 * @returns         {HTMLTemplateElement}
 */
export const createSlideTemplate = () => createElement('template', {
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
                position: relative;
                font-size: 100%;
                height: 100%;
            }

            .wrapper {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
            }
            
        </style>

        <article class="wrapper" role="group" aria-roledescription="slide">
            <slot></slot>
        </article>
    `
});