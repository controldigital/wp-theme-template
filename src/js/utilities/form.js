/**
 * @module		./utilities/form
 */

/**
 * Checks if a form element is not of a certain type.
 * This can be used to filter out unwanted elements.
 * 
 * @function	isInputElement
 * @param   	{(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element 
 * @returns 	{Boolean}
 */
export const isInputElement = element => ['submit', 'button', 'fieldset'].every((type) => type !== element.type);

/**
 * Checks if the element has name and value properties
 * so we can use it for extracting the data.
 * 
 * @function	isValidElement
 * @param   	{(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element
 * @returns 	{Boolean}
 */
export const isValidElement = element => element.name && element.value;

/**
 * Checks if the element is a radio or checkbox and if
 * it has a checked value.
 * 
 * @function	isCheckedValue
 * @param   	{(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element 
 * @returns 	{Boolean}
 */
export const isCheckedValue = element => ['radio', 'checkbox'].some((type) => element.type === type) && element.checked;

/**
 * Checks if the element is a select element
 * with a single or multiple selectable options.
 * 
 * @function	isSelectableElement
 * @param   	{(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element 
 * @returns 	{Boolean}
 */
export const isSelectableElement = element => ['select-one', 'select-multiple'].some((type) => element.type === type && element.options);

/**
 * Checks if the element has options and multiselect.
 * 
 * @function	isMultiSelect
 * @param   	{(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element
 * @returns 	{Boolean}
 */
export const isMultiSelect = element => element.options && element.multiple;