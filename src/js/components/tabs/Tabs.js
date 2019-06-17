/**
 * @module		./components/tabs/Tabs
 */

import { attachShadowToElement } from 'Components/shadow.js';
import {
	onClick,
	onKeyDown,
	onSlotChange
} from './events';

// ID of HTML template for Shadow DOM.
const templateId = 'template-tabs';

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
		attachShadowToElement.call(this, templateId);

		// Bind the event handlers.
		this.onClick = onClick.bind(this);
		this.onKeyDown = onKeyDown.bind(this);
		this.onSlotChange = onSlotChange.bind(this);

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

		// Get the tab an panel slot
		const tab = this.shadowRoot.querySelector('slot[name=tab]');
		const panel = this.shadowRoot.querySelector('slot[name=panel]');

		// Add event listeners for when a slot is used.
		tab.addEventListener('slotchange', this.onSlotChange);
		panel.addEventListener('slotchange', this.onSlotChange);

		// Add event listeners to the tabs element.
		this.addEventListener('click', this.onClick);
		this.addEventListener('keydown', this.onKeyDown);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove event listeners to the tabs element.
		this.removeEventListener('click', this.onClick);
		this.removeEventListener('keydown', this.onKeyDown);

	}

	/**
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

	nextTab() {
		this.selected += 1;
	}

	prevTab() {
		this.selected -= 1;
	}

	firstTab() {
		this.selected = 0;
	}

	lastTab() {
		this.selected = this.tabs.length - 1;
	}

	reset() {

		// Get the tabs and panels.
		const tabs = this.tabs;
		const panels = this.panels;
  
		// Hide them all.
		tabs.forEach(tab => tab.selected = false);
		panels.forEach(panel => panel.hidden = true);

	  }

}