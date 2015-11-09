Meteor.subscribe("signs");

Session.setDefault('address', '');
Session.setDefault('email', '');
Session.setDefault('signId', 0);
Session.setDefault('flash_message', '');
Session.setDefault('nome_parceiro', '');
Session.setDefault('mensagem_parceiro', '');
Session.setDefault('instagram', []);

var Signs = new Mongo.Collection("signs"),
	map;

Meteor.startup(function() {
	GoogleMaps.load();
	Mapbox.load();
});
