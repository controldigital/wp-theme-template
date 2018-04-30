/* jshint esversion: 6 */

/**
 *	@author Control <info@controldigital.nl>
 *	@file google-maps.js
 *	@version 1.0
 *	@license
 *	Copyright (c) 2018 Control.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in all
 *	copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *	SOFTWARE.
 */

/**
 * createMap
 * 
 * Create a new map with the Google Maps JS API.
 * Takes a string or HTMLElement to select the element with the map.
 * 
 * @function
 * @since 	1.0
 * @param 	{(String|HTMLElement)} mapElement The map element to select
 * @param	{Object=} options Options for the google.maps.Map class
 * @returns {<google.maps.Map>}
 */
const createMap = (mapElement, options = {center: {lat: 52.3499843, lng: 4.9163333}, zoom: 16}) => {

	// Get the map elements
	let element;
	if (mapElement) {
		if ('string' === typeof mapElement) {
			element = document.querySelector(mapElement);
		} else if (mapElement instanceof HTMLElement) {
			element = mapElement;
		}
	} else {
		return;
	}

	// Create new map
	let map = new google.maps.Map(element, options);

	// Set array for markers
	map.markers = [];

	// Set array for polylines
	map.polylines = [];

	// Set array for polygons
	map.polygons = [];

	// Set bounds for map
	map.bounds = new google.maps.LatLngBounds();
	
	// Set infowindow for map
	map.infowindow = null;

	// Close infowindows on map click
	google.maps.event.addListener(map, 'click', () => {
		if (map.infowindow) map.infowindow.close();
	});

	// Return the map
	return map;

};

/**
 * attachInfoWindow
 * 
 * Adds a InfoWindow to a marker
 *
 * @function
 * @since 	1.0
 * @param 	{<google.maps.Marker>} marker
 * @param 	{String} content
 */
const attachInfoWindow = (marker, content, map) => {

	marker.addListener('click', function () {
		if (map.infowindow) map.infowindow.close();
		map.infowindow = new google.maps.InfoWindow({
			content: content
		});
		map.infowindow.open(map, marker);
	});
	
};

/**
 * addMarkers
 * 
 * Add markers to the map
 * 
 * @function
 * @since 	1.0
 * @param 	{Array} markers 
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const addMarkers = (markers, map) => {
	return new Promise((resolve, reject) => {
		if (markers && markers.length && map) {

			// Loop over markers
			markers.forEach((m) => {

				// Create coordinates
				let latLng = new google.maps.LatLng(m.lat, m.lng);

				// Create marker
				let marker = new google.maps.Marker({
					position: latLng,
					map: map
				});
				
			});

			// Resolve and return map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('markers and/or map arguments not given'));

		}
	});
};

/**
 * addMarker
 * 
 * Add a marker to the map
 * 
 * @function
 * @since 	1.0
 * @param 	{Object} position 
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const addMarker = (position, map) => {
	return new Promise((resolve, reject) => {
		if (position && map) {

			// Create coordinates
			const latLng = new google.maps.LatLng(position.lat, position.lng);

			// Create marker
			const marker = new google.maps.Marker({
				position: latLng,
				map: map
			});
			
			// Add position to bounds
			map.bounds.extend(marker.getPosition());
	
			// Add marker to array
			map.markers.push(marker);

			// Resolve and return map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('marker and/or map arguments not given'));

		}
	});
};

/**
 * Remove markers from map
 * 
 * @function
 * @since 	1.0
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const removeMarkers = (map) => {
	return new Promise((resolve, reject) => {
		if (map) {

			// Loop over the markers
			map.markers.forEach((marker) => {
				marker.setMap(null);
			});

			// Remove markers from array
			map.markers = [];

			// Resolve with map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('map argument not given'));

		}
	});
};

/**
 * addPolyline
 * 
 * Creates a polyline shape on the map.
 * A polyline is a simple line drawn with an array of coordinates.
 * 
 * @example
 * let coords = [
 * 	{lat: 37.772, lng: -122.214},
 * 	{lat: 21.291, lng: -157.821},
 * 	{lat: -18.142, lng: 178.431}
 * ];
 * 
 * addPolyline(coords, map);
 * 
 * @function
 * @since	1.0
 * @param 	{Object[]} coordinates Array of objects with lat and lng coordinates
 * @param 	{<google.maps.Map>} map Google maps map instance
 * @param 	{Object=} options 
 * @returns	{Promise}
 */
const addPolyline = (coordinates, map, options = {geodesic: true, strokeColor: '#ff0000', strokeOpacity: 1.0, strokeWeight: 2}) => {
	return Promise((resolve, reject) => {
		if (coordinates && map) {

			// Add coordinates to options
			options.path = coordinates;

			// Create new Polyline
			const polyline = new google.maps.Polyline(options);

			// Push to polylines
			map.polylines.push(polyline);

			// Set the polyline to the map
			polyline.setMap(map);

			// Return the map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('coordinates and/or map arguments not given'));

		}
	});
};

/**
 * Remove polylines from map
 * 
 * @function
 * @since 	1.0
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const removePolylines = (map) => {
	return new Promise((resolve, reject) => {
		if (map) {

			// Loop over the polylines
			map.polylines.forEach((polyline) => {
				polyline.setMap(null);
			});

			// Remove markers from array
			map.polylines = [];

			// Resolve with map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('map argument not given'));

		}
	});
};

/**
 * addPolygon
 * 
 * Creates a polygon shape on the map.
 * In contrast to the polyline a polygon always closes its shape.
 * The colors and properties of the line can be adjusted with the options argument.
 * 
 * @example
 * let coords = [
 * 	{lat: 37.772, lng: -122.214},
 * 	{lat: 21.291, lng: -157.821},
 * 	{lat: -18.142, lng: 178.431},
 * 	{lat: 37.772, lng: -122.214}
 * ];
 * 
 * addPolygone(coords, map);
 * 
 * @function
 * @since	1.0
 * @param 	{Object[]} coordinates Array of objects with lat and lng coordinates
 * @param 	{<google.maps.Map>} map Google maps map instance
 * @param 	{Object=} options 
 * @returns	{Promise}
 */
const addPolygon = (coordinates, map, options = {strokeColor: '#ff0000', strokeOpacity: 0.8, strokeWeight: 2, fillColor: '#ff000', fillOpacity: 0.35}) => {
	return Promise((resolve, reject) => {
		if (coordinates && map) {

			// Add coordinates to options
			options.path = coordinates;

			// Create new Polyline
			const polygon = new google.maps.Polygon(options);

			// Push to polylines
			map.polygons.push(polygon);

			// Set the polyline to the map
			polygon.setMap(map);

			// Return the map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('coordinates and/or map arguments not given'));

		}
	});
};

/**
 * Remove polygons from map
 * 
 * @function
 * @since 	1.0
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const removePolygons = (map) => {
	return new Promise((resolve, reject) => {
		if (map) {

			// Loop over the polylines
			map.polygons.forEach((polygon) => {
				polygon.setMap(null);
			});

			// Remove markers from array
			map.polygons = [];

			// Resolve with map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('map argument not given'));

		}
	});
};






/**
 * Google Maps API
 * Anonymous IIFE
 * Setup the data needed for the Google Maps API
 * 
 */
(function () {
    'use strict';

    // Please enter your unique API Key
    const key = 'AIzaSyB6DB--1x8xmlR7Sg3kf573ARrlnUBVDms';

    // The function to fire when the script loads
    const callback = 'createMap';

    // Getting the API script
	const src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${callback}`;
	let script = document.createElement('script');
	script.setAttribute('src', src);
	script.setAttribute('async', '');
    script.setAttribute('defer', '');
	document.body.appendChild(script);

}());