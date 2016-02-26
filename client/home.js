Template.torne_parceiro.events({
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
