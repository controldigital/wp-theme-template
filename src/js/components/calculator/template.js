/**
 * @module		./components/calculator/template
 */

import { createElement } from 'Utilities/elements.js';

/**
 * Creates a template specific for the card element.
 * 
 * @function        createTemplate
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

			:host,
			.screen,
			.keys,
			.operators,
			.numbers,
			.controls {
				display: grid;
			}

			:host {
				all: initial;
				display: block;
				contain: content;
				width: 100%;
				height: 100%;
			}

			.screen {

			}

			.keys {
				grid-template-rows: 1fr 4fr;
				grid-template-columns: 4fr 1fr;
			}

			.operators {
				grid-area: 1 / 1 / 2 / 3;
				grid-template-rows: 1fr;
				grid-template-columns: repeat(4, 1fr);
			}

			.numbers {
				grid-area: 2 / 1 / 3 / 2;
				grid-template-rows: repeat(4, 1fr);
				grid-template-columns: repeat(4, 1fr);
			}

			.controls {
				grid-area: 2 / 2 / 3 / 3;
				grid-template-rows: 1fr;
				grid-template-columns: 1fr;
			}

			.operator {
				grid-rows: 1 / 2;
				grid-columns: span 1;
			}

			.number {
				
			}

			.equals {
				grid-area: 1 / 1 / 2 / 2;
			}

		</style>

		<div class="screen"></div>
		<div class="keys">
			<div class="operators">
				<button class="operator" data-action="add">+</button>
				<button class="operator" data-action="subtract">-</button>
				<button class="operator" data-action="multiply">&times;</button>
				<button class="operator" data-action="divide">&divide;</button>
			</div>
			<div class="numbers">
				<button class="number" data-value ="7">7</button>
				<button class="number" data-value ="8">8</button>
				<button class="number" data-value ="9">9</button>
				<button class="number" data-value ="9">4</button>
				<button class="number" data-value ="9">5</button>
				<button class="number" data-value ="9">6</button>
				<button class="number" data-value ="9">1</button>
				<button class="number" data-value ="9">2</button>
				<button class="number" data-value ="9">3</button>
				<button class="number" data-value ="9">0</button>
				<button class="number" data-action="decimal">.</button>
				<button class="number" data-action="clear">AC</button>
			</div>
			<div class="controls">
				<button class="equal" data-action="equals">&equals;</button>
			</div>
		</div>
	`
});