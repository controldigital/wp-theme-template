/**
 * @module      ./components/masonry/functions 
 */

/**
 * @function	calculateSpan
 * @param 		{HTMLMasonryItemElement} masonryItem 
 * @param 		{number} rowHeight 
 * @param 		{number} gap 
 * @returns		{number}
 */
export const calculateSpan = (masonryItem, rowHeight, gap) => {
	const bounds = masonryItem.contentElement.getBoundingClientRect();
	const span = Math.ceil((bounds.height + gap) / (rowHeight + gap));
	return span;
};

/**
 * @function    resizeMasonryItem
 * @param		{HTMLMasonryElement} masonry
 * @param       {HTMLElement} item 
 * @returns     {string}
 */
export const resizeMasonryItem = (masonry, masonryItem) => 
    new Promise((resolve, reject) => {
		const rowHeight = Number(masonry.rowHeight);
		const gap = Number(masonry.gap);
		if (rowHeight === null || gap === null) {
			reject(Error('Both rowHeight and gap attribute need to be set.'));
		}
		const rowSpan = calculateSpan(masonryItem, rowHeight, gap);
		const gridRowEndValue = `span ${rowSpan}`;
		masonryItem.gridRowEnd = gridRowEndValue;
		masonryItem.placed = true;
		resolve(gridRowEndValue);
	});