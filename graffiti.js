var graffitiIDList = [];

function newGraffitiID(){
	var newID = "graffiti" + graffitiIDList.length;
	graffitiIDList.push(newID);
	return newID;
}

Graffiti.prototype.id = ""; //String
Graffiti.prototype.type = ""; //String
Graffiti.prototype.address = ""; //String
Graffiti.prototype.monikers = []; //String[]
Graffiti.prototype.coordinates = {
	'latitude': 0.0,
	'longitude': 0.0
}; //Object of Doubles/Floats

function Graffiti(data){
	this.id = newGraffitiID();
	this.type = data['graffititype'];
	this.address = data['address'];
	this.monikers = [
			data['graffitimoniker'],
			data['graffitimoniker2'],
			data['graffitimoniker3']
		];
	this.coordinates = {
		'latitude': parseFloat(data['latitude']),
		'longitude': parseFloat(data['longitude'])
	};
}