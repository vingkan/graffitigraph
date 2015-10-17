var graffitiIDList = [];

function newGraffitiID(){
	var newID = "graffiti" + graffitiIDList.length;
	graffitiIDList.push(newID);
	return newID;
}

Graffiti.prototype.id = ""; //String
Graffiti.prototype.coordinates = {
	'latitude': 0.0,
	'longitude': 0.0
}; //Object of Doubles/Floats

function Graffiti(data){
	this.id = newGraffitiID();
	/*this.species = data['tree_species'] || this.species;
	this.name = data['common_name'] || this.name;
	this.diameter = parseInt(data['diameter_at_breast_height'], 10) || this.diameter;
	this.trunks = parseInt(data['number_of_trunks'], 10) || this.trunks;
	this.location = data['location_type'] || this.location;*/
	this.coordinates = {
		'latitude': parseFloat(data['location']['latitude']),
		'longitude': parseFloat(data['location']['longitude'])
	} || this.coordinates;
}