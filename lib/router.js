FlowRouter.route('/', {
	action: function(params, queryParams) {
		BlazeLayout.render('emptyLayout', { content: 'home', bottom: 'footer' });
	}
});
FlowRouter.route('/adotar-mapa', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'adotar_mapa', bottom: 'footer' });
	}
});
FlowRouter.route('/adotar-banner', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'adotar_banner', bottom: 'footer' });
	}
});
FlowRouter.route('/adotar-pvc', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'adotar_pvc', bottom: 'footer' });
	}
});
FlowRouter.route('/adotar-adesivo', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'adotar_adesivo', bottom: 'footer' });
	}
});
FlowRouter.route('/admin-lucas', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'admin_lucas', bottom: 'footer' });
	}
});
FlowRouter.route('/cafezinho', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'cafezinho', bottom: 'footer' });
	}
});
FlowRouter.route('/perguntas-frequentes', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'perguntas_frequentes', bottom: 'footer' });
	}
});
FlowRouter.route('/escolha-formato', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'escolha_formato', bottom: 'footer' });
	}
});
FlowRouter.route('/imprimir-lambe-lambe/:signId', {
	action: function(params, queryParams) {
		Meteor.call('generatePdf', params.signId, function (error, result) {
			Session.set('signId', params.signId);
			download("data:application/pdf;base64," + result, params.signId + '.pdf', "application/pdf");
		});
		BlazeLayout.render('mainLayout', { top: 'header', content: 'imprimir_pdf', bottom: 'footer' });
	}
});
