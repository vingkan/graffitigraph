var map = null;

var ggIcon = L.icon({
	iconUrl: 'style/img/gg-icon.png',
	iconSize: [40, 40],
	shadowSize: [0, 0]
});

function main(geoip){
	var coords = geoip.location;
	var zoom = 13;
	map = L.map('map').setView([coords.latitude, coords.longitude], zoom);
	var tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: 'OpenStreetMap'
	});
	var marker = L.marker([coords.latitude, coords.longitude]);
	tile.addTo(map);
	marker.addTo(map);
	marker.bindPopup('<h4>Your Location</h4>').openPopup();
	//getFirebaseGraffiti();
	getGraffiti({}, 100, function(list){
		plotGraffiti(list.slice(30));
		listenToFirebase();
	}, 'location-markers');
}

function plotGraffiti(list){
	for(var i = 0; i < list.length; i++){
		var g = list[i];
		var html = '<div class="graffiti-marker">';
			html += '<h1>' + g.surface + '</h1>';
			html += '<p>opened ' + moment(g.requested).fromNow() + '</p>';
			html += '</div>';
		var marker = L.marker([g.lat(), g.lon()]);
		marker.addTo(map);
		marker.bindPopup(html);
	}	
}

function getFirebaseGraffiti(){
	getGraffiti({}, 50, function(list){
		var fb = new Firebase('https://firedates.firebaseio.com/graffiti');
		fb.once('value', function(snapshot){
			var data = snapshot.val();
			for(var i in data){
				var g = list.pop();
				var html = '<img class="graffiti-picture" src="' + data[i] + '">';
				var marker = L.marker([g.lat(), g.lon()], {icon: ggIcon});
				marker.addTo(map);
				marker.bindPopup(html);
			}
			plotGraffiti(list);
		});
	})
}

function listenToFirebase(){
	var fb = new Firebase('https://firedates.firebaseio.com/graffiti');
	fb.on('child_added', function(childSnapshot, prevChildKey){
		var data = childSnapshot.val();
		var g = storage.get('location-markers').pop();
		var html = '<img class="graffiti-picture" src="' + data + '">';
		var marker = L.marker([g.lat(), g.lon()], {icon: ggIcon});
		marker.addTo(map);
		marker.bindPopup(html);
	});
}