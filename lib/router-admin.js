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
		BlazeLayout.render('mainLayout', { top: 'header', content: 'admin_lucas', bottom: 'footer' });
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
