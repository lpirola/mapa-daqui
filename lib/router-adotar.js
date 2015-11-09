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
