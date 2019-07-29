/**
 * @module		./components/google-map/helpers
 */

/**
 * Function to add markers to the specified map.
 * 
 * @function	addMarkersToMap
 * @param 		{HTMLElement[]} markers Array of HTMLGoogleMarkerElements
 * @returns		{void}
 */
export const addMarkersToMap = function addMarkersToMap(markers) {
	[...markers].forEach(marker => marker.setMap(this.map));
};

/**
 * Function to remove markers to the specified map.
 * 
 * @function	removeMarkersFromMap
 * @param 		{HTMLElement[]} markers Array of HTMLGoogleMarkerElements
 * @returns		{void}
 */
export const removeMarkersFromMap = function removeMarkersFromMap(markers) {
	[...markers].forEach(marker => marker.setMap(null));
};