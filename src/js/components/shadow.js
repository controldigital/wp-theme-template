/**
 * @module		./components/shadow
 */


/**
 * Helper function for creating a Shadow DOM and connecting
 * it to the instance of a custom element.
 * 
 * @function	attachShadowToElement
 * @param 		{(String|HTMLTemplateElement)} template Id of the template to get or the template element itself.
 * @param		{Object} options ShadowRootInit object.
 * @returns		{this}
 */
export const attachShadowToElement = function attachShadowToElement(templateSelector, options = {mode: 'open'}) {

	// Create a new shadowDOM layer.
	const shadow = this.attachShadow(options);
			
	// Create a template, add the styles and children.
	if ('string' === typeof templateSelector) {
		const template = document.getElementById(templateSelector);
		if (!template) {
			throw new Error(`
				The template with the id \"${templateSelector}\" has not been found.
				Please append it to the body of the DOM.
			`);
		}
		shadow.appendChild(template.content.cloneNode(true));
	} else if ('object' === typeof templateSelector && templateSelector instanceof HTMLTemplateElement) {
		shadow.appendChild(templateSelector.content.cloneNode(true));
	}

	// Return the attached Shadow DOM.
	return shadow;

}