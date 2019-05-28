/**
 * @module		./components/slider/Collection
 */


/**
 * HTMLSlidesCollection
 * A Collection object to store the slides in.
 * Holds a couple of methods to manipulate the slides.
 * 
 * @class
 */
export default function HTMLSlidesCollection(...slides) {

	// Add the slides to the instance.
	// First filter the ones that arent proper HTMLElement instances.
	const filtered = slides.filter(slide => slide instanceof HTMLElement);
	const attached = filtered.map((slide, index) => this[index.toString()] = slide);

	// Define read only property length.
	Object.defineProperty(this, 'length', {
        get: function () {
            return slides.length;
        }
	});
	
	// Make this instance immutable.
	Object.freeze(this);

}

/**
 * Returns the specific node at the given zero-based index into the list. 
 * Returns null if the index is out of range.
 * 
 * @method		item
 * @param		{number} index
 * @returns		{(Slide|null)}
 */
HTMLSlidesCollection.prototype.item = function(index) {
	return this[index] != null ? this[index] : null;
}

/**
 * Returns the specific node whose ID or, as a fallback, name matches the string specified by name. 
 * 
 * @method		namedItem
 * @param		{String} index
 * @returns		{(Slide|null)}
 */
HTMLSlidesCollection.prototype.namedItem = function(name) {
	for (let i = 0; i < this.length; i += 1) {
		if (this[i].id === name || this[i].name === name) {
			return this[i];
		}
	}
	return null;
}

/**
 * Loop over all the slides.
 * 
 * @callback	forEachCallback
 * @param		{HTMLslideElement} slide The current slide element.
 * @param		{number} index The current index.
 * @param		{HTMLSlidesCollection} collection The collection that is being looped.
 * @returns		{void}
 * 
 * @method		forEach
 * @param 		{forEachCallback} callback Callback with three arguments.
 * @returns		{void}
 */
HTMLSlidesCollection.prototype.forEach = function(callback) {
	for (let i = 0; i < this.length; i += 1) {
		callback(this[i], i, this);
	}
};

/**
 * Sets the selected slide to active.
 * 
 * @method		setActive
 * @param 		{Number} index 
 * @returns		{void}
 */
HTMLSlidesCollection.prototype.setActive = function(index) {
	this.item(index).active = true;
};

/**
 * Sets the selected slide to active.
 * 
 * @method		setActive
 * @param 		{Number} index 
 * @returns		{void}
 */
HTMLSlidesCollection.prototype.setInactive = function(index) {
	this.item(index).active = false;
};

/**
 * Deactivates all slides.
 * 
 * @method		setInactiveAll
 * @returns		{void}
 */
HTMLSlidesCollection.prototype.setInactiveAll = function() {
	this.forEach((slide) => {
		slide.active = false;
	});
};