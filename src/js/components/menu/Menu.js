/**
 * @module		./components/../..
 */

import { createMenuTemplate } from './template.js';
import EventCollection from 'Utilities/events.js';
import { onClick } from './events.js';

// Create template.
const template = createMenuTemplate();

// Types that are accepted.
const acceptedTypes = ['hamburger', 'falafel', 'kebab', 'sate'];

/**
 * Menu element
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLMenuElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['active', 'target'];
	}

	/**
	 * @constructor
	 */
	constructor() {
        super();
        
        // Create the Shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.content.cloneNode(true));
		
		// Create a list of all events and their listeners.
        this.events = new EventCollection().set(this, 'click', onClick.bind(this));

    }

    /**
	 * Gets and sets the active attribute.
	 * @property
	 */
	get active() {
		return this.getAttribute('active');
	}

	set active(value) {
		if (value === true) {
			this.setAttribute('active', '');
		} else {
			this.removeAttribute('active');
		}
	}
    
    /**
	 * Gets and sets the target attribute.
	 * @property
	 */
	get target() {
		return this.getAttribute('target');
	}

	set target(value) {
		if ('string' === typeof value) {
			this.setAttribute('target', value);
		}
    }
    
    /**
	 * Gets and sets the type attribute.
	 * @property
	 */
	get type() {
		return this.getAttribute('type');
	}

	set type(value) {
		if ('string' === typeof value && acceptedTypes.some(type => type === value)) {
			this.setAttribute('type', value);
		}
	}

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{string} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

        switch(attrName) {
            case 'active':
                if (newValue === '') {
                    const openEvent = new Event('open');
                    this.dispatchEvent(openEvent);
                    this.setAttribute('aria-expanded', true);
                } else {
                    const closeEvent = new Event('close');
                    this.dispatchEvent(closeEvent);
                    this.setAttribute('aria-expanded', false);
                }
                break;
            case 'target':
                const targetElement = document.getElementById(newValue);
                if (target !== null) {
                    this.targetElement = targetElement;
                    this.setAttribute('aria-controls', newValue);
                }
				break;
        }

    }

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Set default target value.
        if (this.target === null) {
            throw new Error('Hamburger element requires a target attribute with an id of the element it controls');
        }

		// Set default type value.
        if (this.type === null) {
            this.type = 'hamburger';
        }

        // Add all event listeners.
        this.events.add();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

        // Remove all event listeners.
        this.events.remove();

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

        // Remove and add event listeners.
        this.events.remove().add();

	}

}