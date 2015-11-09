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

Template.gerar_em_lote.events({
	'submit form': function(evt) {
		var file = evt.target.arquivo_csv.files[0];
		var reader  = new FileReader();

		reader.onloadend = function () {
			console.log(reader.result);
		};

		if (file) {
			reader.readAsText(file);
		}

		return false;
	}
});
