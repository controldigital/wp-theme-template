/**
 * @module		./components/shadow
 */


/**
 * Helper function for creating a Shadow DOM and connecting
 * it to the instance of a custom element.
 * 
 * @function	attachShadowToElement
 * @param 		{string} templateId Id of the template to get.
 * @param		{Object} options ShadowRootInit object.
 * @returns		{this}
 */
export const attachShadowToElement = function attachShadowToElement(templateId, options = {mode: 'open'}) {

	// Create a new shadowDOM layer.
	const shadow = this.attachShadow(options);
			
	// Create a template, add the styles and children.
	const template = document.getElementById(templateId);
	if (!template) {
		throw new Error(`
			The template with the id \"${templateId}\" has not been found.
			Please append it to the body of the DOM.
		`);
	}

	// Append the template to the shadowDOM.
	shadow.appendChild(template.content.cloneNode(true));

	// Return the attached Shadow DOM.
	return shadow;

}