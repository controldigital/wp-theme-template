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
                all: initial;
                display: block;
                contain: content;
                position: relative;
                font-size: 100%;
            }

            .container {
                display: grid;
                height: 100%;
                width: 100%;
            }

            :host([axis="horizontal"]) .container {
                grid-template-rows: 100%;
                grid-template-columns: 1fr;
                grid-template-areas: 
                    "container";
            }

            :host([axis="vertical"]) .container {
                grid-template-rows: 1fr;
                grid-template-columns: 100%;
                grid-template-areas: 
                    "container";
            }

            .wrapper {
                position: relative;
                overflow: hidden;
            }

            :host([axis="horizontal"]) .wrapper {
                grid-area: container;
            }

            :host([axis="vertical"]) .wrapper {
                grid-area: container;
            }

            .rails {
                display: flex;
                align-items: stretch;
                flex-wrap: nowrap;
                height: 100%;
                will-change: transform;
            }

            :host([axis="horizontal"]) .rails {
                flex-direction: row;
            }

            :host([axis="vertical"]) .rails {
                flex-direction: column;
            }

            ::slotted(ctrl-slide) {
                flex-grow: 0;
                flex-shrink: 0;
            }

            :host([axis="horizontal"][layout="boxed"]) ::slotted(ctrl-slide),
            :host([axis="vertical"][layout="boxed"]) ::slotted(ctrl-slide) {
                padding: 15px;
            }

            :host([amount="1"]) ::slotted(ctrl-slide) {
                width: 100%;
            }

            :host([amount="2"]) ::slotted(ctrl-slide) {
                width: 50%;
            }

            :host([amount="3"]) ::slotted(ctrl-slide) {
                width: 33.3333333333%;
            }

            :host([amount="4"]) ::slotted(ctrl-slide) {
                width: 25%;
            }

            :host([amount="5"]) ::slotted(ctrl-slide) {
                width: 20%;
            }

            :host([amount="6"]) ::slotted(ctrl-slide) {
                width: 16.6666666667%;
            }

            :host([amount="7"]) ::slotted(ctrl-slide) {
                width: 14.2857142857%;
            }

            :host([amount="8"]) ::slotted(ctrl-slide) {
                width: 12.5%;
            }

            :host([amount="9"]) ::slotted(ctrl-slide) {
                width: 11.1111111111%;
            }

            :host([amount="10"]) ::slotted(ctrl-slide) {
                width: 10%;
            }

            :host([amount="1"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 100%;
            }

            :host([amount="2"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 50%;
            }

            :host([amount="3"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 33.3333333333%;
            }

            :host([amount="4"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 25%;
            }

            :host([amount="5"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 20%;
            }

            :host([amount="6"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 16.6666666667%;
            }

            :host([amount="7"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 14.2857142857%;
            }

            :host([amount="8"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 12.5%;
            }

            :host([amount="9"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 11.1111111111%;
            }

            :host([amount="10"][axis="vertical"]) ::slotted(ctrl-slide) {
                height: 10%;
            }

        </style>

        <div class="container">
            <section class="wrapper" role="region" aria-roledescription="carousel">
                <div class="rails" 	aria-live="polite">
                    <slot name="slide"></slot>
                </div>
            </section>
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