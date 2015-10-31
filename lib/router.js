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
FlowRouter.route('/admin-lucas', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'admin_lucas', bottom: 'footer' });
	}
});
FlowRouter.route('/em-breve', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'em_breve', bottom: 'footer' });
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
