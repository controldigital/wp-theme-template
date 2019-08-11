/**
 * @module		./modules/Cookie
 */

/**
 * An intrisic object class with methods to interface with a cookie of the document.
 * Needs the name of the cookie to connect with.
 * 
 * @class
 */
export default class Cookie {

	/**
	 * @constructor
	 * @param 		{String} name Name of the cookie to interact with.
	 */
	constructor(name) {
		if ('string' === typeof name) {
			this.name = name;
		}
	}

    /**
     * Retrieves a cookie from the document.
     * Returns a string if the cookie is found or false when it is not.
     *
     * @method  	get
     * @returns 	{(String|undefined)} Returns cookie on success, undefined on fail.
     */
    get() {
        const nameExpression = `${this.name}=`;
        const cookies = document.cookie.split(';');
        return cookies.find(cookie => {
            let currentCookie = cookie.trim();
            if (currentCookie.indexOf(nameExpression) === 0) {
                return currentCookie.substring(nameExpression.length, currentCookie.length);
            }
        });
    }

    /**
     * Creates cookie with a name, value, expire date, path and a domain.
     * Returns the cookie of the document.
     *
     * @method  	set
     * @param 		{String} value Value of cookie
     * @param 		{Number} [expire] When cookie expires in days
     * @param 		{String} [path] Path to store cookie
     * @param   	{String} [domain] The domain to store the cookie
     * @returns 	{String} Returns the cookie string
     */
    set(value, expire = 365, path = '/', domain = location.hostname.replace(/^www\./i, "")) {
        const date = new Date();
        date.setTime(date.getTime() + (expire * 24 * 3600 * 1000));
		const expires = date.toUTCString();
		document.cookie = `${this.name}=${value}; expires=${expires}; path=${path}; domain=${domain}`;
        return document.cookie;
    }

    /**
     * Checks if the cookie exists in thedocument.cookie string. 
     * Returns a boolean.
     * 
     * @method      exists
     * @param       {String} name Name of cookie to look for
     * @returns     {Boolean}
     */
    exists() {
		const cookies = document.cookie.split(';');
		let i = 0
        for (i; i < cookies.length; i += 1) {
            let currentCookie = cookies[i].trim();
            if (currentCookie.indexOf(`${this.name}=`) === 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Deletes cookie from the document.
     *
     * @method      delete
     * @returns     {String} Returns the cookie
     */
    delete() {
        document.cookie = `${this.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        return document.cookie;
    };

}