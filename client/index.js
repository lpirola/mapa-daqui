Meteor.subscribe("signs");

Session.setDefault('address', '');
Session.setDefault('email', '');
Session.setDefault('signId', 0);
Session.setDefault('flash_message', '');
Session.setDefault('nome_parceiro', '');
Session.setDefault('mensagem_parceiro', '');
Session.setDefault('instagram', []);

var Signs = new Mongo.Collection("signs"),
	map,
	geocodeAddress = function () {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': Session.get('address')}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				var loc = [results[0].geometry.location.lat(), results[0].geometry.location.lng()]
				//L.marker(loc).addTo(map);
				map.setView(loc)
			} else {
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
		return false;
	};

Meteor.startup(function() {
	GoogleMaps.load();
	Mapbox.load();
});
