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
FlowRouter.route('/imprimir-lambe-lambe/:signId', {
	// subscriptions: function(params, queryParams) {
        // this.register('Sign', Meteor.subscribe('mySign', params.signId));
    // },
	action: function(params, queryParams) {
		Meteor.call('generatePdf', params.signId, function (error, result) {
			Session.set('signId', params.signId);
			setTimeout(function () { window.open("data:application/pdf;base64, " + result); }, 3000);
		});
		BlazeLayout.render('mainLayout', { top: 'header', content: 'imprimir_pdf', bottom: 'footer' });
	}
});
