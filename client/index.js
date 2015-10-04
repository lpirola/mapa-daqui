Signs = new Mongo.Collection("signs");
Meteor.subscribe("signs");
Session.setDefault('address', '');
Session.setDefault('email', '');
Session.setDefault('signId', 0);
Session.setDefault('flash_message', '');
Session.setDefault('nome_parceiro', '');
Session.setDefault('mensagem_parceiro', '');
Session.setDefault('instagram', []);
var map;
var geocodeAddress = function () {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': Session.get('address')}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			var loc = [results[0].geometry.location.H, results[0].geometry.location.L]
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

Template.home.events({
	'submit form' : function () {
		Meteor.call('sendEmail', Session.get('nome_parceiro'), Session.get('mensagem_parceiro'), function (error, result) {
			if (error === undefined) {
				Session.set('flash_message', 'E-mail enviado com sucesso.');
				Session.set('nome_parceiro', '');
				Session.set('mensagem_parceiro', '');
			} else {
				Session.set('flash_message', 'E-mail não enviado, tente novamente.');
			}
			setTimeout(function () { Session.set('flash_message', ''); }, 5000);
		});
		return false;
	},
	'change #nome_parceiro' : function(evt) {
		Session.set('nome_parceiro', evt.currentTarget.value);
	},
	'change #mensagem_parceiro' : function(evt) {
		Session.set('mensage_parceiro', evt.currentTarget.value);
	},
});

Template.home.helpers({
	flash_message: function() {
		return Session.get('flash_message');
	},
	instagram: function() {
		return Session.get('instagram');
	}
});
Template.home.onCreated(function () {
	Meteor.call('getInstagram', function (error, result) {
		Session.set('instagram', result);
	});
});

Template.admin_lucas.helpers({
	signs: function () {
		return Signs.find({});
	}
});

Template.adotar_mapa.rendered = function () {
	Deps.autorun(function () {
		if (Mapbox.loaded()) {
			L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYWRhcXVpIiwiYSI6IjBiNDkyMjNjOTI2MGYzOGM3YmVlMTdmYjUxZWM3YjNlIn0.wgKsb3mWtdUBhA8CYRWvKQ';
			map = L.mapbox.map("map", 'mapadaqui.2586fca1', {maxZoom: 17,minZoom: 17}).setView([-23.5462, -46.6514], 17);
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
