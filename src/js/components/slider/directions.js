/**
 * @module		./components/slider/directions
 */

 /**
 * Creates a new object with a horizontal and
 * a vertical value
 * 
 * @function	createDirections
 * @param 		{*} horizontal The horzontal value.
 * @param		{*} vertical The vertical value. 
 * @param		{Function} callback Function to run over the horizontal and vertical value. Must return a value.
 * @returns		{(Object|Boolean)}
 */
export const createDirections = (horizontal, vertical, callback) => {
	if (horizontal === undefined || vertical === undefined) {
		return null;
	}
	if (callback && 'function' === typeof callback) {
		return {
			horizontal: callback(horizontal),
			vertical: callback(vertical)
		};
	}
	return {
		horizontal,
		vertical
	};
}