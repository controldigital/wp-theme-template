/**
 * @module		./components/like/svg
 */

/**
 * Returns a string to render an icon with.
 * 
 * @function	renderSVGIcon
 * @param 		{String} icon Icon to render
 * @returns		{String} The icon in string or an empty string if the icon arguments does not match any.
 */
export const renderSVGIcon = (icon) => {
	if (icon === 'thumb') {
		return /*template*/`
			<svg class="thumb" viewbox="0 0 25 25">
				
			</svg>
		`;
	} else if (icon === 'heart') {
		return /*template*/`
			<svg class="heart" viewbox="0 0 25 25">

			</svg>
		`;
	} else if (icon === 'star') {
		return /*template*/`
			<svg class="star" viewbox="0 0 25 25">
				
			</svg>
		`;
	} 
	return '';
};