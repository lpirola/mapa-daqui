var adminRoutes = FlowRouter.group({
	prefix: '/admin',
	name: 'admin',
	triggersEnter: [function(context, redirect) {
		console.log('running group triggers');
	}]
});

// handling /admin route
adminRoutes.route('/', {
	action: function() {
		BlazeLayout.render('mainLayout', { top: 'header', content: 'lista_sinalizacoes', bottom: 'footer' });
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /admin trigger');
	}]
});
adminRoutes.route('/excluir-lambe-lambe/:signId', {
	action: function(params, queryParams) {
		Session.set('signId', params.signId);
		BlazeLayout.render('mainLayout', { top: 'header', content: 'remover_sinalizacao', bottom: 'footer' });
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /admin trigger');
	}]
});

// handling /admin/posts
adminRoutes.route('/posts', {
	action: function() {
		BlazeLayout.render('componentLayout', {content: 'posts'});
	}
});
