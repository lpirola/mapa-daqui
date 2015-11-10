Template.lista_sinalizacoes.helpers({
	signs: function () {
		return Signs.find({});
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

Session.setDefault('uploaded_csv', []);
Session.setDefault('prepared_data', []);

Template.gerar_em_lote.helpers({
	prepared_data: function () {
		return Session.get('prepared_data');
	}
});

Template.gerar_em_lote.events({
	'submit form': function(evt) {
		var file = evt.target.arquivo_csv.files[0];
		var geocoder = new google.maps.Geocoder();
		var search_cep = function () {
			var uploaded = Session.get('uploaded_csv');
			var prepared = Session.get('prepared_data');
			var v = _.last(uploaded);

			if (parseInt(v.length) > 1) {
				var email = v[0],
					cep = v[1].replace(/[^0-9]+/g, '');

				geocoder.geocode({'address': cep}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						var address = results[0].formatted_address;
						var loc = [results[0].geometry.location.lat(), results[0].geometry.location.lng()]
						prepared.push({'email':email, 'cep':cep, 'lat':loc[0], 'lng':loc[1], address: address, created_at: new Date});
						Session.set('prepared_data', prepared);
					}
				});
			}

			var new_csv = _.initial(uploaded);
			Session.set('uploaded_csv', new_csv);

			if (_.size(new_csv) >= 0) {
				setTimeout(search_cep, 1000);
			}
		};
		Papa.parse(file, {
			complete: function(results) {
				Session.set('uploaded_csv', results.data);
				search_cep();
			}
		});

		return false;
	}
});
