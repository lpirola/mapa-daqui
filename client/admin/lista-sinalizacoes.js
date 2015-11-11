Signs = new Mongo.Collection("signs");
TabularTables = {};
Template.registerHelper('TabularTables', TabularTables);
TabularTables.Signs = new Tabular.Table({
	name: "SignsList",
	collection: Signs,
	autoWidth: false,
	columns: [
		{data: "_id", title: "ID"},
		{data: "sequence", title: "Sequencial"},
		{data: "email", title: "E-mail"},
		{data: "address", title: "Endereço"},
		{data: "lat", title: "Latitude", visible: false},
		{data: "lng", title: "Longitude", visible: false},
		{
			data: "created_at",
			title: "Criado em",
			render: function (val, type, doc) {
				if (val instanceof Date) {
					return moment(val).calendar();
				} else {
					return "Never";
				}
			}
		},
		{data: "_id", title: "Ações", render: function(val, type, doc) {
			return '<a href="/admin/excluir-lambe-lambe/'+val+'">excluir</a> '
			+'<a href="/imprimir-lambe-lambe/'+val+'">imprimir</a>';
		}}
	]
});


Template.lista_sinalizacoes.helpers({
	signs: function () {
		return Signs.find({});
	}
});
