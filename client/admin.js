Template.lista_sinalizacoes.helpers({
	signs: function () {
		return Signs.find({});
	}
});

Template.lista_sinalizacoes.events({
	'click #completar_sequencial': function(evt) {
		Meteor.call('completar_sequencial', function (err, results) {
			console.log(results, err);
		});
		return false;
	}
});

Template.remover_sinalizacao.events({
	'click input[type=radio]': function(evt) {
		var confirmado = evt.target.value,
			signId = Session.get('signId');
		if (confirmado == 'sim') {
			Meteor.call('removeSign', signId, function (error, results) {
				FlowRouter.go('/admin');
			});
		} else {
				FlowRouter.go('/admin');
		}

		return false;
	},
	'submit form': function(evt) {
		return false;
	}
});

Session.setDefault('uploaded_data', []);
Session.setDefault('uploaded_data_size', 0);
Session.setDefault('prepared_data', []);
Session.setDefault('saved_data', []);
Session.setDefault('errored_data', []);

Template.gerar_em_lote.helpers({
	prepared_data: function () {
		return Session.get('prepared_data');
	},
	errored_data: function () {
		return Session.get('errored_data');
	},
	uploaded_data_size: function () {
		return Session.get('uploaded_data_size');
	},
	prepared_data_size: function () {
		return _.size(Session.get('prepared_data'));
	},
	saved_data_size: function () {
		return _.size(Session.get('saved_data'));
	},
	errored_data_size: function () {
		return _.size(Session.get('errored_data'));
	}
});

Template.gerar_em_lote.events({
	'click #download_all_prepared': function (evt) {
		var save_and_download = function () {
			var prepared = Session.get('prepared_data');
			var saved = Session.get('saved_data');
			var v = _.last(prepared);
			Meteor.call('addSign', v.address, v.lat, v.lng, v.email, function (error, newSign) {
				Meteor.call('generatePdf', newSign, function (error2, result) {
					download("data:application/pdf;base64," + result, newSign + '.pdf', "application/pdf");
				});
			});
			var new_prepared = _.initial(prepared);
			Session.set('prepared_data', new_prepared);

			if (_.size(new_prepared) >= 0) {
				setTimeout(save_and_download, 1000);
			}
		};
		save_and_download();
		return false;
	},
	'submit form': function(evt) {
		var file = evt.target.arquivo_csv.files[0];
		var geocoder = new google.maps.Geocoder();
		var search_cep = function () {
			var uploaded = Session.get('uploaded_data');
			var prepared = Session.get('prepared_data');
			var v = _.last(uploaded);

			if ((typeof v !== 'undefined') && (parseInt(v.length) > 1)) {
				var email = v[0],
					cep = v[1].replace(/[^0-9]+/g, '');

				geocoder.geocode({'address': cep}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						var address = results[0].formatted_address;
						var loc = [results[0].geometry.location.lat(), results[0].geometry.location.lng()]
						prepared.push({'email':email, 'cep':cep, 'lat':loc[0], 'lng':loc[1], address: address});
						Session.set('prepared_data', prepared);
					} else {
						var errored = Session.get('errored_data');
						errored.push({cep:cep, message: status});
						Session.set('errored_data', errored);
					}
				});
			}

			var new_csv = _.initial(uploaded);
			Session.set('uploaded_data', new_csv);

			if (_.size(new_csv) >= 0) {
				setTimeout(search_cep, 1000);
			}
		};
		Papa.parse(file, {
			complete: function(results) {
				Session.set('uploaded_data', results.data);
				Session.set('uploaded_data_size', _.size(results.data));
				search_cep();
			}
		});

		return false;
	}
});
