/**
 * @module		./components/toggle/template
 */

import { createElement } from 'Modules/element.js';

/**
 * Function that creates a template with contents for 
 * the Shadow DOM of the toggle element.
 * 
 * @function	createTemplate
 * @returns		{HTMLTemplateElement}
 */
export const createTemplate = () => createElement('template', {
	html: /* template */`
		<slot name="input"></slot>
		<label>
			<span class="title">
				<slot name="title"></slot>
			</span>
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