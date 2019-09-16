/**
 * @module		./components/google-map/Marker
 */

/**
 * Marker element for using in a HTMLGoogleMapElement element.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLGoogleMarkerElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['clickable', 'cursor', 'draggable', 'opacity', 'longitude', 'latitude', 'visible', 'z-index'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Gets and sets the clickable attribute.
	 * @property
	 */
	get clickable() {
		return this.getAttribute('clickable');
	}

	set clickable(value) {
		if (value === true) {
			this.setAttribute('clickable', '');
		} else {
			this.removeAttribute('clickable');
		}
	}

	/**
	 * Gets and sets the cursor attribute.
	 * @property
	 */
	get cursor() {
		return this.getAttribute('cursor');
	}

	set cursor(value) {
		if ('string' === typeof value) {
			this.setAttribute('cursor', value);
		}
	}

	/**
	 * Gets and sets the draggable attribute.
	 * @property
	 */
	get draggable() {
		return this.getAttribute('draggable');
	}

	set draggable(value) {
		if (value === true) {
			this.setAttribute('draggable', '');
		} else {
			this.removeAttribute('draggable');
		}
	}

	/**
	 * Gets and sets the opacity attribute.
	 * @property
	 */
	get opacity() {
		return this.getAttribute('opacity');
	}

	set opacity(value) {
		if ('number' === typeof value) {
			this.setAttribute('opacity', value);
		}
	}

	/**
	 * Gets and sets the latitude attribute.
	 * @property
	 */
	get latitude() {
		return parseFloat(this.getAttribute('latitude'));
	}

	set latitude(value) {
		if ('number' === typeof value) {
			this.setAttribute('latitude', value);
		}
	}

	/**
	 * Gets and sets the longitude attribute.
	 * @property
	 */
	get longitude() {
		return parseFloat(this.getAttribute('longitude'));
	}

	set longitude(value) {
		if ('number' === typeof value) {
			this.setAttribute('longitude', value);
		}
	}

	/**
	 * Gets and sets the visible attribute.
	 * @property
	 */
	get visible() {
		return this.getAttribute('visible');
	}

	set visible(value) {
		if (value === true) {
			this.setAttribute('visible', '');
		} else {
			this.removeAttribute('visible');
		}
	}

	/**
	 * Gets and sets the z-index attribute.
	 * @property
	 */
	get zIndex() {
		return parseInt(this.getAttribute('z-index'));
	}

	set zIndex(value) {
		if ('number' === typeof value) {
			this.setAttribute('z-index', value);
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

		const floatValue = parseFloat(newValue);

		let boolValue;
		if (newValue === null) {
			boolValue = false;
		} else {
			boolValue = true;
		}

		switch(attrName) {
			case 'clickable':
				this.marker.setClickable(boolValue);
				break;
			case 'cursor':
				this.marker.setCursor(newValue);
				break;
			case 'draggable':
				this.marker.setDraggable(boolValue);
				break;
			case 'opacity':
				this.marker.setOpacity(floatValue);
				break;
			case 'latitude':
			case 'longitude':
				const latLng = new google.maps.latLng(
					this.latitude,
					this.longitude
				);
				this.setPosition(latLng);
				break;
			case 'visible':
				this.marker.setVisible(boolValue);
				break;
			case 'z-index':
				this.marker.setZIndex(boolValue);
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

		// Create a latLng object.
		const latLng = new google.maps.latLng(
			this.latitude,
			this.longitude
		);

		// Create the marker of this element.
		this.marker = new google.maps.Marker({
			position: latLng
		});

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

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
	 * @method	getAnimation
	 * @returns	{Animation}
	 */
	getAnimation() {
		return this.marker.getAnimation();
	}

	/**
	 * @method	setAnimation
	 * @param 	{Animation} animation 
	 * @returns	{void}
	 */
	setAnimation(animation) {
		this.marker.setAnimation(animation);
	}

	/**
	 * @method	getIcon
	 * @returns	{(string|Icon|Symbol)}
	 */
	getIcon() {
		return this.marker.getIcon();
	}

	/**
	 * @method	setIcon
	 * @param	{(string|Icon|Symbol)} icon
	 * @returns	{void}
	 */
	setIcon(icon) {
		this.marker.setIcon(icon);
	}

	/**
	 * @method	getLabel
	 * @returns	{MarkerLabel}
	 */
	getLabel() {
		return this.marker.getLabel();
	}

	/**
	 * 
	 * @method	setLabel
	 * @param 	{(string|MarkerLabel)} label 
	 * @returns	{void}
	 */
	setLabel(label) {
		this.marker.setLabel(label);
	}

	/**
	 * Returns the map specified to the marker.
	 * 
	 * @method	getMap
	 * @returns	{(Map|StreetViewPanorama)}
	 */
	getMap() {
		return this.marker.getMap();
	}

	/**
	 * Renders the marker on the specified map or panorama. 
	 * If map is set to null, the marker will be removed.
	 * 
	 * @method	setMap
	 * @param 	{(Map|StreetViewPanorama|null)} map The Map or Streeview instance to add a map. Null to remove it from a map.
	 * @returns	{void}
	 */
	setMap(map) {
		this.marker.setMap(map);
	}

	/**
	 * @method	getPosition
	 * @returns	{(LatLng|LatLngLiteral)}
	 */
	getPosition() {
		return this.marker.getPosition();
	}

	/**
	 * @method	setPosition
	 * @param	{(LatLng|LatLngLiteral)} position
	 * @returns	{void}
	 */
	setPosition(position) {
		this.marker.setPosition(position);
	}

	/**
	 * @method	getShape
	 * @returns	{MarkerShape}
	 */
	getShape() {
		return this.marker.getShape();
	}

	/**
	 * @method	setShape
	 * @param 	{MarkerShape} shape 
	 * @returns	{void}
	 */
	setShape(shape) {
		this.marker.setShape(shape);
	}

}