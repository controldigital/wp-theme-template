/**
 * @module		./components/cookie/scripts
 */

// Positions to insert per element.
const insertPosition = {
	head: 'beforeend',
	body: 'afterbegin'
};

/**
 * Helper function to append a script string to
 * the head or the body tag in the appropriate place.
 * 
 * @function	appendScript
 * @param 		{String} destination The head or body.
 * @param 		{String} script Script to append.
 * @returns		{Promsise<HTMLElement>}
 */
export const appendScript = (destination, script) => 
	new Promise((resolve) => {
		if (destination === 'head' || destination === 'body') {
			const element = document[destination];
			element.insertAdjacentHTML(insertPosition[destination], script);
			resolve(element);
		}
	});