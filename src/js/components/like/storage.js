/**
 * @module		./components/like/cookie
 */

import Cookie from '../../modules/Cookie.js';
import { hasFeatures } from '../../modules/tools.js';

// Support constant.
export const hasLocalStorageSupport = hasFeatures('Local Storage');

/**
 * Creates a list of methods to set the storage type that is needed.
 * This can be cookie, local or session.
 * 
 * TODO: Is there a better way to do this?
 * 
 * @function	createStorage
 * @param 		{String} type Type of storage to use. cookie, local or session.
 * @returns		{Object} Methods to talk with the correct storage.
 */
export const createStorage = (type) => {
	
	// Check if type is string.
	if ('string' !== typeof type) {
		return;
	}

	// List of methods.
	const methods = {
		'cookie': {
			get: Cookie.get,
			set: Cookie.set,
		},
		'local': {
			get: localStorage.getItem,
			set: localStorage.setItem
		},
		'session': {
			get: sessionStorage.getItem,
			set: sessionStorage.setItem
		}
	};

	// Return the correct method.
	return methods[type];

};

/**
 * @function	checkStorageForId
 * @param		{Object} storage Type of storage to get the id from.
 * @param		{String} name Name of the item.
 * @param		{Number} id ID to find in item.
 * @returns		{Boolean} True when the id is in the item. False if the item does not exist or does not have the id.
 */
export const checkStorageForId = (storage, name, id) => {

	// Retrieve the item.
	const item = storage.get(name);

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
 * @function	addIdToStorage
 * @param		{Object} storage Type of storage to get the id from.
 * @param		{String} name Name of the item.
 * @param		{Number} id ID to put in item.
 * @returns		{String} The item string with the new added value.
 */
export const addIdToStorage = (storage, name, id) => {

	// Retrieve the item.
	const item = storage.get(name);
	const values = JSON.parse(item);

	// Add the id and convert back to JSON.
	values.push(id);
	const json = JSON.stringify(values);

	// Set the item with the new id.
	return storage.set(name, json);

};

/**
 * @function	removeIdFromStorage
 * @param		{Object} storage Type of storage to get the id from.
 * @param		{String} name Name of the item.
 * @param		{Number} id ID to put in item.
 * @returns		{String} The item string with the new added value.
 */
export const removeIdFromStorage = (storage, name, id) => {

	// Retrieve the item.
	const item = storage.get(name);
	const values = JSON.parse(item);

	// Remove the id and convert back to JSON.
	const index = values.indexOf(id);
	values.splice(index, 1);
	const json = JSON.stringify(values);

	// Set the item with the removed id.
	return storage.set(name, json);

};