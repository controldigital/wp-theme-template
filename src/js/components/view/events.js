/**
 * @module		./components/view/events
 */

 /**
  * Wraps parenthesis around a detail object and returns it.
  * 
  * @function	createEventDetail
  * @param 		{Object} detail 
  * @returns	{Object}
  */
export const createEventDetail = (detail) => {
	return { detail };
};

/**
 * Wrapper over the CustomEvent constructor to create
 * a new CustomEvent with a detail attribute.
 * 
 * @function	createCustomEvent
 * @param 		{String} name 
 * @param 		{Object} detail 
 * @returns		{CustomEvent<>}
 */
export const createCustomEvent = (name, detail = {}) => {
	if ('undefined' === typeof name || 'string' !== name) {
		throw new Error('name is not defined or not a string');
	}
	const event = new CustomEvent(name, {
		detail
	});
	return event;
};

/**
 * fetchstart event handler.
 * 
 * @function	onFetchStart
 * @listens		fetchstart
 * @param		{Event} event
 * @returns		{void}
 */
export const onFetchStart = function onFetchStart(event) {
	const { detail } = event;
	const { url } = detail;
	this.fetching = true;
};

/**
 * fetchdone event handler.
 * 
 * @function	onFetchDone
 * @listens		fetchdone
 * @param		{Event} event
 * @returns		{void}
 */
export const onFetchDone = function onFetchDone(event) {
	const { detail } = event;
	const { url, response } = detail;
	this.fetching = false;
};

/**
 * contententerstart event handler.
 * 
 * @function	onContentEnterStart
 * @listens		contententerstart
 * @param		{Event} event
 * @returns		{void}
 */
export const onContentEnterStart = function onContentEnterStart(event) {
	const { detail } = event;
	this.enter = true;
};

/**
 * contententerend event handler.
 * 
 * @function	onContentEnterEnd
 * @listens		contententerend
 * @param		{Event} event
 * @returns		{void}
 */
export const onContentEnterEnd = function onContentEnterEnd(event) {
	const { detail } = event;
	this.enter = false;
};

/**
 * contentleavestart event handler.
 * 
 * @function	onContentLeaveStart
 * @listens		contentleavestart
 * @param		{Event} event
 * @returns		{void}
 */
export const onContentLeaveStart = function onContentLeaveStart(event) {
	const { detail } = event;
	this.leave = true;
};

/**
 * contentleaveend event handler.
 * 
 * @function	onContentLeaveEnd
 * @listens		contentleaveend
 * @param		{Event} event
 * @returns		{void}
 */
export const onContentLeaveEnd = function onContentLeaveEnd(event) {
	const { detail } = event;
	this.leave = false;
};

/**
 * popstate event handler.
 * 
 * @function	onPopState
 * @listens		popstate
 * @param		{Event} event
 * @returns		{void}
 */
export const onPopState = function onPopState(event) {
	const { state } = event;
};