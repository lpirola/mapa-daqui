FlowRouter.route('/admin-lucas', {
	action: function(params, queryParams) {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'admin_lucas', bottom: 'footer' });
	}
});

