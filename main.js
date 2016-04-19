function main(geoip){
	var coords = geoip.location;
	var zoom = 13;
	var map = L.map('map').setView([coords.latitude, coords.longitude], zoom);
	var tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: 'OpenStreetMap'
	});
	var marker = L.marker([coords.latitude, coords.longitude]);
	tile.addTo(map);
	marker.addTo(map);
	marker.bindPopup('<h4>Your Location</h4>').openPopup();
}
