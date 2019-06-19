/**
 * @module		./components/view/events
 */

/**
 * @function	onFetchStart
 * @param		{Event} event
 * @returns		{void}
 */
export const onFetchStart = function onFetchStart(event) {
	const { detail } = event;
	const { url } = detail;
	this.fetching = true;
};

/**
 * @function	onFetchDone
 * @param		{Event} event
 * @returns		{void}
 */
export const onFetchDone = function onFetchDone(event) {
	const { detail } = event;
	const { url, response } = detail;
	this.fetching = false;
};

/**
 * @function	onPopState
 * @param		{Event} event
 * @returns		{void}
 */
export const onPopState = function onPopState(event) {
	const { state } = event;
};