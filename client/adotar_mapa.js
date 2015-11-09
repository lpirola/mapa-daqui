var geocodeAddress = function () {
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
Template.adotar_mapa.rendered = function () {
	Deps.autorun(function () {
		if (Mapbox.loaded()) {
			L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYWRhcXVpIiwiYSI6IjBiNDkyMjNjOTI2MGYzOGM3YmVlMTdmYjUxZWM3YjNlIn0.wgKsb3mWtdUBhA8CYRWvKQ';
			map = L.mapbox.map("map", 'mapadaqui.2586fca1', {maxZoom: 17,minZoom: 17, zoomControl:false}).setView([-23.5462, -46.6514], 17);
		}
	});
};
Template.adotar_mapa.events({
	'keypress #address' : function(evt) {
		if (evt.keyCode == 13) {
			Session.set('address', evt.currentTarget.value);
			geocodeAddress();
		}
	},
	'click .button.buscar': geocodeAddress,
	'change #address' : function(evt) {
		Session.set('address', evt.currentTarget.value);
	},
	'click .button.confirmar': function () {
		var mapCenter = map.getCenter();
		Meteor.call('addSign', Session.get('address'), mapCenter.lat, mapCenter.lng, function (error, newSign) {
			FlowRouter.go('/imprimir-lambe-lambe/' + newSign);
		});
		return false;
	}
});
