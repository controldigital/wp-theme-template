/**
 * @module		./components/google-map/Map
 */

import { createMapTemplate } from './template.js';
import { 
	addMarkersToMap, 
	removeMarkersFromMap 
} from './functions.js';

// ID of HTML template for Shadow DOM.
const template = createMapTemplate();

/**
 * Google Map custom element.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLGoogleMapElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['bounds', 'center', 'clickable-icons', 'heading', 'map-type', 'options', 'tilt', 'zoom'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.content.cloneNode(true));

		// Get the map element from the Shadow DOM.
		const mapContainer = shadow.querySelector('.google-map');
		this.map = new google.maps.Map(mapContainer, {
			center: {
				lat: 52.3935744, 
				lng: 4.8944151
			}, 
			zoom: 8
		});
		
	}

	/**
	 * Gets and sets the bounds attribute.
	 * @property
	 */
	get bounds() {
		const value = this.getAttribute('bounds');
		if (value !== null) {
			return true;
		}
		return false;
	}

	set bounds(value) {
		if (value === true) {
			this.setAttribute('bounds', '');
		} else {
			this.removeAttribute('bounds');
		}
	}

	/**
	 * Gets and sets the center attribute.
	 * @property
	 */
	get center() {
		const attr = this.getAttribute('center');
		if (attr === null) {
			return attr;
		}
		return JSON.parse(attr);
	}

	set center(value) {
		if ('object' === typeof value) {
			this.setAttribute('center', JSON.stringify(value));
		} 
	}

	/**
	 * Gets and sets the clickable-icons attribute.
	 * @property
	 */
	get clickableIcons() {
		const value = this.getAttribute('clickable-icons');
		if (value !== null) {
			return true;
		}
		return false;
	}

	set clickableIcons(value) {
		if (value === true) {
			this.setAttribute('clickable-icons', '');
		} else {
			this.removeAttribute('clickable-icons');
		}
	}

	/**
	 * Gets and sets the heading attribute.
	 * @property
	 */
	get heading() {
		return parseFloat(this.getAttribute('heading'));
	}

	set heading(value) {
		if ('number' === typeof value) {
			this.setAttribute('heading', value);
		} else {
			this.removeAttribute('heading');
		}
	}

	/**
	 * Gets and sets the map-type-id attribute.
	 * @property
	 */
	get mapTypeId() {
		return this.getAttribute('map-type-id');
	}

	set mapTypeId(value) {
		if ('string' === typeof value) {
			this.setAttribute('map-type-id', value);
		} 
	}

	/**
	 * Gets and sets the tilt attribute.
	 * @property
	 */
	get tilt() {
		return parseFloat(this.getAttribute('tilt'));
	}

	set tilt(value) {
		if ('number' === typeof value) {
			this.setAttribute('tilt', value);
		} else {
			this.removeAttribute('tilt');
		}
	}

	/**
	 * Gets and sets the zoom attribute.
	 * @property
	 */
	get zoom() {
		return parseFloat(this.getAttribute('zoom'));
	}

	set zoom(value) {
		if ('number' === typeof value) {
			this.setAttribute('zoom', value);
		} else {
			this.removeAttribute('zoom');
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

		// Number formatted value.
		const numberValue = parseInt(newValue);

		// Boolean formatted value.
		let boolValue;
		if (newValue === null) {
			boolValue = false;
		} else {
			boolValue = true;
		}

		switch(attrName) {
			case 'center':
				this.map.setCenter(newValue);
				break;
			case 'clickable-icons':
				this.map.setClickableIcons(boolValue);
				break;
			case 'heading':
				this.map.setHeading(numberValue);
				break;
			case 'map-type-id':
				this.map.setMapTypeId(newValue);
				break;
			case 'tilt':
				this.map.setTitle(numberValue);
				break;
			case 'zoom':
				this.map.setZoom(numberValue);
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

		/**
		 * Callback for the Mutation Observer.
		 * Adds newly added markers to the map when elements are added 
		 * and removes markers when the elements are removed.
		 * 
		 * @function	onObserve
		 * @param 		{MutationRecord[]} mutations 
		 * @returns		{void}
		 */
		const onObserve = (mutations) => {
			mutations.forEach(mutation => {

				// Add new markers to the map.
				if (mutation.addedNodes.length) {
					addMarkersToMap(mutation.addedNodes, this.map);
				}

				// Reset the markers and add the remaining ones to the map.
				if (mutation.removedNodes.length) {
					let allMarkers = [...mutation.removedNodes, ...this.children];
					removeMarkersFromMap(allMarkers);
					addMarkersToMap(this.children, this.map);
				}

			});
		};

		// Observe changes in the children of the element.
		const observer = new MutationObserver(onObserve);
		observer.observe(this, {
			childList: true
		});

		// Add the markers to the map.
		addMarkersToMap(this.children, this.map);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove all markers from map.
		removeMarkersFromMap(this.children);

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

		this.disconnectedCallback();
		this.connectedCallback();

	}

	/**
	 * Sets the viewport to contain the given bounds. 
	 * Note: When the map is set to display: none, the fitBounds function reads 
	 * the map's size as 0x0, and therefore does not do anything. To change 
	 * the viewport while the map is hidden, set the map to visibility: hidden, 
	 * thereby ensuring the map div has an actual size.
	 * 
	 * @method	fitBounds
	 * @param 	{(LatLngBounds|LatLngBoundsLiteral)} bounds 
	 * @param 	{(number|Padding)} padding
	 * @returns	{void} 
	 */
	fitBounds(bounds, padding = 0) {
		this.map.fitBounds(bounds, padding);
	}

	/**
	 * Get the map div.
	 * 
	 * @method	getDiv
	 * @returns	{HTMLElement}
	 */
	getDiv() {
		return this.map.getDiv();
	}

	/**
	 * Changes the center of the map by the given distance in pixels. 
	 * If the distance is less than both the width and height of the map, 
	 * the transition will be smoothly animated. 
	 * Note that the map coordinate system increases from west to east (for x values) 
	 * and north to south (for y values).
	 * 
	 * @method	panBy
	 * @param 	{number} x 
	 * @param 	{number} y 
	 */
	panBy(x, y) {
		this.map.panBy(x, y);
	}

	/**
	 * Changes the center of the map to the given LatLng. 
	 * If the change is less than both the width and height of the map, 
	 * the transition will be smoothly animated.
	 * 
	 * @method	panTo
	 * @param 	{(LatLng|LatLngLiteral)} latLng
	 * @returns	{void} 
	 */
	panTo(latLng) {
		this.map.panTo(latLng);
	}

	/**
	 * Pans the map by the minimum amount necessary to contain the given LatLngBounds. 
	 * It makes no guarantee where on the map the bounds will be, except that the map 
	 * will be panned to show as much of the bounds as possible 
	 * inside {currentMapSizeInPx} - {padding}.
	 * 
	 * @method	panToBounds
	 * @param 	{(LatLngBounds|LatLngBoundsLiteral)} latLngBounds
	 * @param	{(number|Padding)} bounds
	 * @returns	{void} 
	 */
	panToBounds(latLngBounds, padding = 0) {
		this.map.panToBounds(latLngBounds, padding);
	}

	/**
	 * Sets the options of the current Map instance.
	 * 
	 * @method	setOptions
	 * @param 	{MapOptions} options 
	 * @returns	{void}
	 */
	setOptions(options) {
		if (typeof options === 'object') {
			this.map.setOptions(options);
		}
	}

	/**
	 * Returns the default StreetViewPanorama bound to the map, which may be a default 
	 * panorama embedded within the map, or the panorama set using setStreetView(). 
	 * Changes to the map's streetViewControl will be reflected in the display of 
	 * such a bound panorama.
	 * 
	 * @method	getStreetView
	 * @returns	{StreetViewPanorama}
	 */
	getStreetView() {
		return this.map.getStreetView();
	}

	/**
	 * Binds a StreetViewPanorama to the map. This panorama overrides the default 
	 * StreetViewPanorama, allowing the map to bind to an external panorama 
	 * outside of the map. Setting the panorama to null binds the default embedded 
	 * panorama back to the map.
	 * 
	 * @method	setStreetView
	 * @param 	{StreetViewPanorama} panorama
	 * @returns	{void} 
	 */
	setStreetView(panorama) {
		if (panorama instanceof StreetViewPanorama) {
			this.map.setStreetView(panorama);
		}
	}

}