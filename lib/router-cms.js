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

FlowRouter.route('/torne-parceiro', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'torne_parceiro', bottom: 'footer' });
	}
});
