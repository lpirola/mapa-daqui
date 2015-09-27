Signs = new Mongo.Collection("signs");
if (Meteor.isClient) {
	Session.setDefault('address', '');
	Session.setDefault('email', '');
	Session.setDefault('signId', 0);
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
	var updateEmail = function (evt) {
		var updated = Signs.update(Session.get('signId'), {$set: {email:Session.get('email')}});
		return false;
	};

	Meteor.startup(function() {
		GoogleMaps.load();
		Mapbox.load();
	});

	Template.home.helpers({
    	signs: function () {
			return Signs.find({});
		}
	});

	Template.adotar_mapa.rendered = function () {
		Deps.autorun(function () {
			if (Mapbox.loaded()) {
				L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYWRhcXVpIiwiYSI6IjBiNDkyMjNjOTI2MGYzOGM3YmVlMTdmYjUxZWM3YjNlIn0.wgKsb3mWtdUBhA8CYRWvKQ';
				map = L.mapbox.map("map", 'mapadaqui.2586fca1', {maxZoom: 15,minZoom: 15}).setView([-23.5462, -46.6514], 15);
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
			var newSign = Signs.insert({address: Session.get('address'), lat: mapCenter.lat, lng: mapCenter.lng, email: '' });
			FlowRouter.go('/imprimir-lambe-lambe/' + newSign);
			return false;
		}
	});

	Template.imprimir_pdf.events({
		'keypress #email_subscribe' : function(evt) {
			if (evt.keyCode == 13) {
				Session.set('email', evt.currentTarget.value);
				updateEmail();
			}
		},
		'submit form': updateEmail,
		'change #email_subscribe' : function(evt) {
			Session.set('email', evt.currentTarget.value);
		},
	});
}

if (Meteor.isServer) {

	var wkhtmltopdf = Meteor.npmRequire('wkhtmltopdf');
	var fs = Meteor.npmRequire('fs');
	var jade = Meteor.npmRequire('jade');
	// function to encode file data to base64 encoded string
	var base64_encode = function(file) {
		// read binary data
		var bitmap = fs.readFileSync(file);
		// convert binary data to base64 encoded string
		return new Buffer(bitmap).toString('base64');
	};

	Meteor.methods({
		'generatePdf': function (signId) {
			var currentSign = Signs.findOne({_id:signId});
			var locals = {
				mapbox: {
						access_token: 'pk.eyJ1IjoibWFwYWRhcXVpIiwiYSI6IjBiNDkyMjNjOTI2MGYzOGM3YmVlMTdmYjUxZWM3YjNlIn0.wgKsb3mWtdUBhA8CYRWvKQ',
						map_name: 'mapadaqui.2586fca1'
			},
				lat : currentSign.lat,
				lng : currentSign.lng
			};
			var htmlOutput = jade.render(Assets.getText('jade/lambe-lambe.jade'), locals);
			var waitConvert = Async.runSync(function(done) {
				var __dirname = process.env.PWD;
				var pdfFile = __dirname + '/.files/' + currentSign._id + '.pdf';
				wkhtmltopdf(
					htmlOutput,
					{ output: pdfFile, orientation: 'landscape', 'marginBottom':0, 'marginTop':0, 'marginLeft':0, 'marginRight':0 },
					function (code, signal) {
						console.log(code,signal);

						done(null, base64_encode(pdfFile));
					}
				);
			});
			return waitConvert.result;
		}
	});

	Meteor.startup(function () {
	// code to run on server at startup
	});
}
