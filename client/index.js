Meteor.subscribe("signs");

Session.setDefault('address', '');
Session.setDefault('email', '');
Session.setDefault('signId', 0);
Session.setDefault('flash_message', '');
Session.setDefault('nome_parceiro', '');
Session.setDefault('mensagem_parceiro', '');
Session.setDefault('instagram', []);

Signs = new Mongo.Collection("signs");
var map;

Meteor.startup(function() {
	GoogleMaps.load();
	Mapbox.load();
});
