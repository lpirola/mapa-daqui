Signs = new Mongo.Collection("signs");
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
Meteor.publish("signs", function () {
	return Signs.find();
});
Meteor.methods({
	'addSign': function(address, lat, lng, email) {
		var now = new Date();
		var newId = Signs.insert({address: address, lat:lat, lng:lng, email: email, created_at: now});
		var sequenceNumber = Signs.find({_id: { $gt : newId}}).count();
		Signs.update({_id:newId} , {$set: {sequence: sequenceNumber}});
		return newId;
	},
	'completar_sequencial': function() {
		var s = Signs.find({}).fetch();
		var updated = 0;
		_.each(s, function(v) {
			var sequenceNumber = Signs.find({_id: { $gt : v._id}}).count();
			v.sequence = sequenceNumber;
			Signs.update({_id:v._id}, {$set: {sequence: sequenceNumber}}, function (err, count) {
				updated = updated + parseInt(count);
			});
		});
		return updated;
	},
	'removeSign': function(signId) {
		return Signs.remove(signId);
	},
	'updateEmail': function(signId, email) {
		return Signs.update(signId, {$set: {email:email}});
	},
	'generatePdf': function (signId) {
		var currentSign = Signs.findOne({_id:signId});
		var sequenceNumber = Signs.find({_id: { $gt : signId}}).count();
		var locals = {
			mapbox: {
					access_token: 'pk.eyJ1IjoibWFwYWRhcXVpIiwiYSI6IjBiNDkyMjNjOTI2MGYzOGM3YmVlMTdmYjUxZWM3YjNlIn0.wgKsb3mWtdUBhA8CYRWvKQ',
					map_name: 'mapadaqui.2586fca1'
			},
			lat : currentSign.lat,
			lng : currentSign.lng,
			sequence : sequenceNumber
		};
		var htmlOutput = jade.render(Assets.getText('jade/lambe-lambe.jade'), locals);
		var waitConvert = Async.runSync(function(done) {
			var __dirname = process.env.PWD;
			var pdfFile = __dirname + '/.files/' + currentSign._id + '.pdf';
			wkhtmltopdf(
				htmlOutput,
				{ output: pdfFile, orientation: 'landscape', 'marginBottom':0, 'marginTop':0, 'marginLeft':0, 'marginRight':0 },
				function (code, signal) {
					done(null, base64_encode(pdfFile));
				}
			);
		});
		return waitConvert.result;
	},
	sendEmail: function (name, text) {
		check([name, text], [String]);

		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();
		var to      = 'contatomapadaqui@gmail.com';
		var from    = 'site@mapadaqui.org';
		var subject = 'Cadastro de Parceiros - ' + name;

		return Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	},
	getInstagram: function() {
		var options = { tagName: 'mapadaqui' };
		var waitConvert = Async.runSync(function(done) {
			return InstagramFetcher.fetchImages.fromTag(options, function ( images, pagination ) {
				done(null, images);
			});
		});
		return waitConvert.result.slice(0,6);
	}
});

Meteor.startup(function () {
// code to run on server at startup
});
