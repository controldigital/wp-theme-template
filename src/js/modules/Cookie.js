/**
 * @module		./modules/Cookie
 */

/**
 * @class
 * @description
 * An intrisic object class with static methods to
 * interface with the cookie of the document.
 */
export default class Cookie {

    /**
     * Retrieves a cookie from the document.
     * Returns a string if the cookie is found or false when it is not.
     *
     * @static
     * @method  	get
     * @param 		{String} name Cookie to fetch
     * @returns 	{(String|Boolean)} Returns cookie on success, false on fail
     */
    static get(name) {
        const nameExpression = `${name}=`;
        const cookies = document.cookie.split(';');
        let i = 0;
        for (i; i < cookies.length; i += 1) {
            let currentCookie = cookies[i].trim();
            if (currentCookie.indexOf(nameExpression) === 0) {
                return currentCookie.substring(nameExpression.length, currentCookie.length);
            }
        }
        return false;
    }

    /**
     * Creates cookie with a name, value, expire date, path and a domain.
     * Returns the cookie of the document.
     *
     * @static
     * @method  	set
     * @param 		{String} name Name of cookie
     * @param 		{String} value Value of cookie
     * @param 		{Number} [expire] When cookie expires in days
     * @param 		{String} [path] Path to store cookie
     * @param   	{String} [domain] The domain to store the cookie
     * @returns 	{String} Returns the cookie string
     */
    static set(name, value, expire = 365, path = '/', domain = location.hostname.replace(/^www\./i, "")) {
        const date = new Date();
        date.setTime(date.getTime() + (expire * 24 * 3600 * 1000));
        const expires = date.toUTCString();
        document.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path + '; domain=' + domain;
        return document.cookie;
    }

    /**
     * Checks if the cookie exists in thedocument.cookie string. 
     * Returns a boolean.
     * 
     * @static
     * @method      has
     * @param       {String} name Name of cookie to look for
     * @returns     {Boolean}
     */
    static has(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i += 1) {
            let currentCookie = cookies[i].trim();
            if (currentCookie.indexOf(`${name}=`) === 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Deletes cookie from the document.
     *
     * @static
     * @method      delete
     * @param 	    {String} name Cookie to delete
     * @returns     {String} Returns the cookie
     */
    static delete(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        return document.cookie;
    };

    /**
	 * Returns the cookie name set in WP Customizer
	 * or else return a empty string.
	 * 
     * @static
	 * @method      getName
	 * @since	    1.0
	 * @returns	    {String}
	 */
	static getName() {
		return cookie.name ? cookie.name : '';
    };
    
    /**
	 * Creates a cookie friendly URL for 
	 * the domain parameter
	 * 
     * @static
	 * @method      getDomain
	 * @since	    1.0
	 * @returns	    {String}
	 */
	static getDomain() {
		const url = window.location.host + window.location.pathname;
		const domain = url.replace("//", "/");
		return domain;
    };
    
    /**
	 * Returns the amount of days for the
	 * cookie to expire in a floating point
	 * format or default year in days.
	 * 
     * @static
	 * @method      getExpirationDate
	 * @since	    1.0
	 * @returns	    {Number}
	 */
	static getExpirationDate() {
		return cookie.expire ? parseFloat(cookie.expire) : 365;
    };
    
    /**
	 * Returns the scripts for in the head
	 * as set in the WP Customizer.
	 * 
     * @static
	 * @method      getScripts
	 * @since	    1.0
	 * @returns	    {Array}
	 */
	static getScripts() {
        return {
            head: cookie.head ? cookie.head : '',
            body: cookie.body ? cookie.body : ''
        };
    }

}