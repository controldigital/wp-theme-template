/**
 * @module		./components/google-map/helpers
 */


export const addMarkersToMap = function addMarkersToMap(markers) {
	[...markers].forEach(marker => {

		const latLng = new google.maps.latLng(
			marker.latitude,
			marker.longitude
		);
	
		const marker = new google.maps.Marker({
			position: latLng,
			map: this.map
		});
	
		this.markers.push(marker);
	
	});
};