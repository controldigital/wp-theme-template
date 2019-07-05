/**
 * @module		./components/toggle/template
 */

import { createElement } from 'Utilities/element.js';

/**
 * Function that creates a template with contents for 
 * the Shadow DOM of the toggle element.
 * 
 * @function	createTemplate
 * @returns		{HTMLTemplateElement}
 */
export const createTemplate = () => createElement('template', {
	html: /* template */`

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
			}

			input {
				display: none;
			}

			label {
				cursor: pointer;
				min-width: 6rem;
				width: 100%;
				margin: 0;
				background: rgba(0, 0, 0, 0.5);
			}

			.title {
				display: inline-block;
				margin: 0 0 .5rem;
			}

			.toggle {
				display: flex;
				align-items: center;
				position: relative;
				border-radius: 5px;
				height: 2.5rem;
				overflow: hidden;
				transition: background-color 250ms ease-in-out;
			}
			
			.toggle::after {
				content: "";
				display: block;
				position: absolute;
				top: .25rem;
				left: .25rem;
				width: calc(50% - .25rem);
				height: 2rem;
				border-radius: 3px;
				background: #ffffff;
				transition: transform 250ms cubic-bezier(0.86, 0, 0.07, 1);
			}
			
			input + label .toggle::after {
				transform: translate3d(0, 0, 0);
			}

			input:checked + label .toggle::after {
				transform: translate3d(100% ,0, 0);
			}

			.value {
				flex: 1 0 0;
				padding: .5rem;
				color: #fff;
				text-align: center;
			}

		</style>

		<slot name="input"></slot>
		<label>
			<div class="title">
				<slot name="label"></slot>
			</div>
			<div class="toggle">
				<div class="value">
					<slot name="on">
						<span aria-label="On">On</span>
					</slot>
				</div>
				<div class="value">
					<slot name="off">
						<span aria-label="Off">Off</span>
					</slot>
				</div>
			</div>
		</label>
	`

});