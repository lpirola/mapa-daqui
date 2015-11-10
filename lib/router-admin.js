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
		BlazeLayout.render('adminLayout', { top: 'header_admin', content: 'lista_sinalizacoes' });
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /admin trigger');
	}]
});
adminRoutes.route('/gerar-em-lote', {
	action: function() {
		BlazeLayout.render('adminLayout', { top: 'header_admin', content: 'gerar_em_lote' });
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /gerar-em-lote trigger');
	}]
});
adminRoutes.route('/excluir-lambe-lambe/:signId', {
	action: function(params, queryParams) {
		Session.set('signId', params.signId);
		BlazeLayout.render('adminLayout', { top: 'header_admin', content: 'remover_sinalizacao' });
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /excluir-lambe-lambe trigger');
	}]
});
