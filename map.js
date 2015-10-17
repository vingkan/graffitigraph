var userLocation = {
	latitude: 0,
	longitude: 0
};

function updateCoords(position){
	userLocation.latitude = position.coords.latitude;
	userLocation.longitude = position.coords.longitude;
}

navigator.geolocation.getCurrentPosition(updateCoords);

function initGoogleMap(){
	var mapProperties = {
		center: new google.maps.LatLng(userLocation.latitude, userLocation.longitude),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById('googleMap');
	var googleMap = new google.maps.Map(mapDiv, mapProperties);
}