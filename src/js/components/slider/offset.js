/**
 * @module      ./components/slider/offset
 */

/**
 * Returns the offset position of the rails.
 * 
 * @function  	getRailsOffset
 * @returns		{Object} Height and width times the index.
 */
export const getRailsOffset = function getRailsOffset() {
	return {
		x: (this.rails.offsetWidth / this.amount) * this.index,
		y: (this.rails.offsetHeight / this.amount) * this.index
	};
};