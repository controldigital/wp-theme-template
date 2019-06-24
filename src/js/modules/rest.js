/**
 * @module      ./modules/rest
 */

import { 
	keysOfObjectToSnakeCase,
	serializeObject
} from 'Modules/tools.js';

/**
 * Fetches the posts of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the posts in JSON format.
 * 
 * @function    getRestData
 * @param	    {Object} args Arguments to limit results to the specificity of the query.
 * @param	    {String} [route='/wp/v2/posts'] The default route of getting results.
 * @param	    {String} [rest=wp.rest] Url of REST API.
 * @returns	    {Promise}
 */
export const getRestData = async (args = {}, route = '/wp/v2/posts', rest = wp.rest) => {

	// Check if args parameter is set and if it is an object.
	if (!args || 'object' !== typeof args) throw new Error('Args not set or not an object');

	// Create endpoint with arguments for request
	const snakeArgs = keysOfObjectToSnakeCase(args);
	const query = serializeObject(snakeArgs);
	const url = `${rest}${route}${query}`;
	
	// Create new headers
	const headers = new Headers({
		'X-WP-Nonce': wp.nonce
	});

	// Set options of request object
	const options = {
		method: 'GET',
		headers: headers,
		mode: 'same-origin',
		cache: 'default',
	};

	// Create a new request object
	const request = new Request(url, options);

	// Fetch the request
	const response = await fetch(request);

	// If response succeeds return the json
	if (response.status === 200) {
		const json = await response.json();
		return json;
	}

	// Output error
	throw new Error(response.status);

};

/**
 * Fetches the posts of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the posts in JSON format.
 * 
 * @function    getPosts
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(String|Number)} [args.page=1] Current page of the collection.
 * @param	    {(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {String} args.search Limit results to those matching a string.
 * @param	    {String} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	    {String} args.author Limit result set to posts assigned to specific authors.
 * @param	    {String} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	    {String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {String} args.exclude Ensure result set excludes specific IDs.
 * @param	    {String} args.include Limit result set to specific IDs.
 * @param	    {(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	    {String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {String} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {String} args.slug Limit result set to posts with one or more specific slugs.
 * @param	    {String} [args.status='publish'] Limit result set to posts assigned one or more statuses.
 * @param	    {String} args.categories Limit result set to all items that have the specified term assigned in the categories taxonomy.
 * @param	    {String} args.categoriesExclude Limit result set to all items except those that have the specified term assigned in the categories taxonomy.
 * @param	    {String} args.tags Limit result set to all items that have the specified term assigned in the tags taxonomy.
 * @param	    {String} args.tagsExclude Limit result set to all items except those that have the specified term assigned in the tags taxonomy.
 * @param	    {String} args.sticky Limit result set to items that are sticky.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getPosts({
 * 	perPage: 4,
 * 	offset: 1,
 * 	orderby: 'menu_order',
 * 	order: 'desc'
 * }).then((posts) => {
 *   	// Do something with posts.
 * });
 */
export const getPosts = async (args = {}) => {
	const route = 'wp/v2/posts/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the categories of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the categories.
 * 
 * @function    getCategories
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(String|Number)} [args.page=1] Current page of the collection.
 * @param	    {(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {String} args.search Limit results to those matching a string.
 * @param	    {String} args.exclude Ensure result set excludes specific IDs.
 * @param	    {String} args.include Limit result set to specific IDs.
 * @param	    {String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {String} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {(Boolean|Number)} args.hideEmpty Whether to hide terms not assigned to any posts.
 * @param	    {(String|Number)} args.parent Limit result set to terms assigned to a specific parent.
 * @param	    {(String|Number)} args.post Limit result set to terms assigned to a specific post.
 * @param	    {String} args.slug Limit result set to posts with one or more specific slugs.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getCategories().then((categories) => {
 *      // Do something with categories.
 * });
 */
export const getCategories = async (args = {}) => {
	const route = 'wp/v2/categories/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the tags of this WordPress site hrough the REST API. The function is an async
 * function which will return a Promise containing either an error or the tags.
 * 
 * @function    getTags
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(String|Number)} [args.page=1] Current page of the collection.
 * @param	    {(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {String} args.search Limit results to those matching a string.
 * @param	    {String} args.exclude Ensure result set excludes specific IDs.
 * @param	    {String} args.include Limit result set to specific IDs.
 * @param	    {String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {String} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {Boolean} args.hideEmpty Whether to hide terms not assigned to any posts.
 * @param	    {String} args.parent Limit result set to terms assigned to a specific parent.
 * @param	    {String} args.post Limit result set to terms assigned to a specific post.
 * @param	    {String} args.slug Limit result set to posts with one or more specific slugs.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getTags().then((tags) => {
 *      // Do something with tags.
 * });
 */
export const getTags = async (args = {}) => {
	const route = 'wp/v2/tags/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the pages of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the pages.
 * 
 * @function    getPages
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(String|Number)} [args.page=1] Current page of the collection.
 * @param	    {(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {String} args.search Limit results to those matching a string.
 * @param	    {String} args.after Limit response to pages published after a given ISO8601 compliant date.
 * @param	    {String} args.author Limit result set to pages assigned to specific authors.
 * @param	    {String} args.authorExclude Ensure result set excludes pages assigned to specific authors.
 * @param	    {String} args.before Limit response to pages published before a given ISO8601 compliant date.
 * @param	    {String} args.exclude Ensure result set excludes specific IDs.
 * @param	    {String} args.include Limit result set to specific IDs.
 * @param	    {String} args.menuOrder Limit result set to pages with a specific menu_order value.
 * @param	    {(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	    {String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {String} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {String} args.parent Limit result set to items with particular parent IDs.
 * @param	    {String} args.parent_exclude Limit result set to all items except those of a particular parent ID.
 * @param	    {String} args.slug Limit result set to pages with one or more specific slugs.
 * @param	    {String} [args.status='publish'] Limit result set to pages assigned one or more statuses.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getPages().then((pages) => {
 * 		// Do something with pages.
 * });
 */
export const getPages = async (args = {}) => {
	const route = 'wp/v2/pages/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the pages of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the comments.
 * 
 * @function    getComments
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(String|Number)} [args.page=1] Current page of the collection.
 * @param	    {(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {String} args.search Limit results to those matching a string.
 * @param	    {String} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	    {String} args.author Limit result set to posts assigned to specific authors.
 * @param	    {String} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	    {String} args.authorEmail Limit result set to that from a specific author email. Requires authorization.
 * @param	    {String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {String} args.exclude Ensure result set excludes specific IDs.
 * @param	    {String} args.include Limit result set to specific IDs.
 * @param	    {String} args.menuOrder Limit result set to posts with a specific menu_order value.
 * @param	    {(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	    {String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {String} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {String} args.parent Limit result set to items with particular parent IDs.
 * @param	    {String} args.parent_exclude Limit result set to all items except those of a particular parent ID.
 * @param	    {String} args.post Limit result set to comments assigned to specific post IDs.
 * @param	    {String} [args.status='publish'] Limit result set to comments assigned a specific status. Requires authorization.
 * @param	    {String} [args.type='comment'] Limit result set to comments assigned a specific type. Requires authorization.
 * @param	    {String} args.password The password for the post if it is password protected.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getComments().then((comments) => {
 * 		// Do something with comments.
 * });
 */
export const getComments = async (args = {}, route = 'wp/v2/comments/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the taxonomies of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the taxonomies.
 * 
 * @function    getTaxonomies
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {String} args.type Limit results to taxonomies associated with a specific post type.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getTaxonomies().then((taxonomies) => {
 * 		// Do something with taxonomies.
 * });
 */
export const getTaxonomies = async (args = {}) => {
	const route = 'wp/v2/taxonomies/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the media of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the media files.
 * 
 * @function    getMedia
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(String|Number)} [args.page=1] Current page of the collection.
 * @param	    {(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {String} args.search Limit results to those matching a string.
 * @param	    {String} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	    {String} args.author Limit result set to posts assigned to specific authors.
 * @param	    {String} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	    {String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {String} args.exclude Ensure result set excludes specific IDs.
 * @param	    {String} args.include Limit result set to specific IDs.
 * @param	    {(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	    {String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {String} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {String} args.slug Limit result set to posts with one or more specific slugs.
 * @param	    {String} [args.status='publish'] Limit result set to posts assigned one or more statuses.
 * @param	    {String} args.mediaType Limit result set to attachments of a particular media type. One of: image, video, audio, application
 * @param	    {String} args.mimeType Limit result set to attachments of a particular MIME type.
 * @param 	    {String} [route='/wp/v2/media/'] Path to the media endpoint.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getMedia().then((media) => {
 * 		// Do something with media.
 * });
 */
export const getMedia = async (args = {}, route = 'wp/v2/media/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the users of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the users.
 * 
 * @function    getUsers
 * @uses	    getRestData
 * @param 	    {Object} [args={}] 
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	    {(String|Number)} [args.page=1] Current page of the collection.
 * @param	    {(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	    {String} args.search Limit results to those matching a string.
 * @param	    {String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	    {String} args.exclude Ensure result set excludes specific IDs.
 * @param	    {String} args.include Limit result set to specific IDs.
 * @param	    {(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	    {String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	    {String} [args.orderby='date'] Sort collection by object attribute.
 * @param	    {String} args.slug Limit result set to posts with one or more specific slugs.
 * @param	    {String} args.roles Limit result set to users matching at least one specific role provided. Accepts csv list or single role.
 * @param 	    {String} [route='/wp/v2/users/'] Path to the users endpoint.
 * @returns	    {Promise<JSON>} 
 * 
 * @example
 * getUsers().then((users) => {
 * 		// Do something with users.
 * });
 */
export const getUsers = async (args = {}, route = 'wp/v2/users/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the Post Types of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the post types.
 * 
 * @function    getPostTypes
 * @uses	    getRestData
 * @param	    {Object} args
 * @param	    {String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param 	    {String} [route='/wp/v2/types/'] Path to the pages endpoint.
 * @returns     {Promise<JSON>}
 * 
 * @example
 * getPostTypes().then((postTypes) => {
 * 		// Do something with postTypes.
 * });
 */
export const getPostTypes = async (args = {}, route = 'wp/v2/types/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * Fetches the settings of this WordPress site through the REST API. The function is an async
 * function which will return a Promise containing either an error or the settings.
 * 
 * @function    getSettings
 * @uses	    getRestData
 * @param 	    {String} [route='/wp/v2/settings/'] Path to the pages endpoint.
 * @returns     {Promise<JSON>}
 * 
 * @example
 * getSettings().then((settings) => {
 * 		// Do something with settings.
 * });
 */
export const getSettings = async (route = 'wp/v2/settings/') => {
	let args = {};
	let response = await getRestData(args, route);
	return response;
};