/**
 * @module		./components/google-map/functions
 */

/**
 * Function to add markers to the specified map.
 * 
 * @function	addMarkersToMap
 * @param 		{HTMLElement[]} markers Array of HTMLGoogleMarkerElements
 * @param       {HTMLElement} map Map element.
 * @returns		{void}
 */
export const addMarkersToMap = function addMarkersToMap(markers, map) {
	[...markers].forEach(marker => marker.setMap(map));
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