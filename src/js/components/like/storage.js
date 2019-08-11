/**
 * @module		./components/like/cookie
 */

import { hasFeatures } from 'Utilities/tools.js';

// Does the browser support local storage?
export const hasLocalStorageSupport = hasFeatures('Local Storage');

/**
 * @function	checkLocalStorageForId
 * @param		{String} name Name of the storage item.
 * @param		{Number} id ID to find in item.
 * @returns		{Boolean} True when the id is in the item. False if the item does not exist or does not have the id.
 */
export const checkLocalStorageForId = (name, id) => {

	// Retrieve the item.
	const item = localStorage.getItem(name);

	// If there is no item set. Set it now.
	if (!item) {
		return false;
	}

	// Else check of the id of this element is present in the item.
	const values = JSON.parse(item);
	if (values.indexOf(id) > -1) {
		return true;
	}

	// No id found.
	return false;
	
};

/**
 * @function	addIdToLocalStorage
 * @param		{String} name Name of the storage key.
 * @param		{Number} id ID to put in storage.
 * @returns		{String} The item string with the new added value.
 */
export const addIdToLocalStorage = (name, id) => {

	// Retrieve the item.
	const item = localStorage.getItem(name);
	const values = JSON.parse(item);

	// Add the id and convert back to JSON.
	values.push(id);
	const json = JSON.stringify(values);

	// Set the item with the new id.
	return localStorage.setItem(name, json);

};

/**
 * @function	removeIdFromLocalStorage
 * @param		{String} name Name of the storage key.
 * @param		{Number} id ID to remove from storage.
 * @returns		{String} The item string with the new added value.
 */
export const removeIdFromLocalStorage = (name, id) => {

	// Retrieve the item.
	const item = localStorage.getItem(name);
	const values = JSON.parse(item);

	// Remove the id and convert back to JSON.
	const index = values.indexOf(id);
	values.splice(index, 1);
	const json = JSON.stringify(values);

	// Set the item with the removed id.
	return localStorage.setItem(name, json);

};