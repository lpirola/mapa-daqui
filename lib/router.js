FlowRouter.route('/', {
	action: function(params, queryParams) {
		BlazeLayout.render('emptyLayout', { content: 'home', bottom: 'footer' });
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

FlowRouter.route('/pre-visualizar/:template/:signId', {
	action: function(params, queryParams) {
		Meteor.call('previewPdf', params.template, params.signId, function (error, result) {
			Session.set('signId', params.signId);
			Session.set('pdf_content', result)
		});
		BlazeLayout.render('mainLayout', { top: 'header', content: 'html_to_pdf', bottom: 'footer' });
	}
});
