/**
 * @module		./components/tabs/Tabs
 */

import EventCollection from 'Utilities/events.js';
import { isIndexBetween } from 'Utilities/tools.js';
import { createTemplate } from './template.js';
import {
	onClick,
	onKeyDown,
	onSlotChange
} from './events';

// Template for Shadow DOM.
const template = createTemplate();

/**
 * Tabs
 * @class
 * @extends	HTMLElement
 */
export default class HTMLTabsElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['selected'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.content.cloneNode(true));

		// Bind the event handlers.
		this.events = new EventCollection();
		this.events.set(this, 'click', onClick.bind(this));
		this.events.set(this, 'keydown', onKeyDown.bind(this));

		// Get the tab an panel slot
		const tab = this.shadowRoot.querySelector('slot[name=tab]');
		const panel = this.shadowRoot.querySelector('slot[name=panel]');

		// Add event listeners for when a slot is used.
		tab.addEventListener('slotchange', onSlotChange.call(this));
		panel.addEventListener('slotchange', onSlotChange.call(this));

	}

	/**
	 * Gets the tabs.
	 * @property
	 */
	get tabs() {
		const tabs = this.querySelectorAll('[slot=tab]');
		return [...tabs];
	}

	/**
	 * Gets the panels.
	 * @property
	 */
	get panels() {
		const panels = this.querySelectorAll('[slot=panel]');
		return [...panels];
	}

	/**
	 * Gets and sets the selected attribute.
	 * @property
	 */
	get selected() {
		return parseInt(this.getAttribute('selected'));
	}

	set selected(value) {
		if (value !== Number.isNaN(value)) {
			if (isIndexBetween(value, 0, this.tabs.length)) {
				this.setAttribute('selected', value);
			}
		} 
	}

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{String} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

		if (attrName === 'selected') {
			if (newValue !== null) {

			}
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Add event listeners to the tabs element.
		this.events.add();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove event listeners to the tabs element.
		this.events.remove();

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

	/**
	 * @method	nextTab
	 * @returns	{HTMLTabElement}
	 */
	nextTab() {
		this.selected += 1;
		return this.tabs[this.selected];
	}

	/**
	 * @method	prevTab
	 * @returns	{HTMLTabElement}
	 */
	prevTab() {
		this.selected -= 1;
		return this.tabs[this.selected];
	}

	/**
	 * @method	firstTab
	 * @returns	{HTMLTabElement}
	 */
	firstTab() {
		this.selected = 0;
		return this.tabs[this.selected];
	}

	/**
	 * @method	lastTab
	 * @returns	{HTMLTabElement}
	 */
	lastTab() {
		this.selected = this.tabs.length - 1;
		return this.tabs[this.selected];
	}

	/**
	 * @method	reset
	 * @returns	{this}
	 */
	reset() {

		// Get the tabs and panels.
		const tabs = this.tabs;
		const panels = this.panels;
  
		// Hide them all.
		tabs.forEach(tab => tab.selected = false);
		panels.forEach(panel => panel.hidden = true);

		return this;

	}

}