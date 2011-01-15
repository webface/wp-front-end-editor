FrontEndEditor.fieldTypes['widget'] = FrontEndEditor.fieldTypes['textarea'].extend({

	create_input: jQuery.noop,

	ajax_get: function () {
		var self = this;

		self.rich_edit = ( 0 == self.data.widget_id.indexOf('text-') && FrontEndEditor.data.nicedit );

		if ( self.rich_edit )
			self.dependency = FrontEndEditor.data.nicedit.src;

		self._super();
	},

	content_to_input: function (content) {
		var self = this;

		self.input = jQuery(content);

		self.form.prepend(content);

		if ( self.rich_edit ) {
			self.editor = FrontEndEditor.init_nicEdit(self.form.find('textarea'), self);
		}
	},

	content_from_input: function () {
		return '';
	},

	ajax_args: function (args) {
		var self = this;

		args = self._super(args);

		if ( 'get' == args.callback )
			return args;

		if ( self.rich_edit )
			self.editor.saveContent();

		var raw_data = self.form.find(':input').serializeArray();

		jQuery.each(args, function (name, value) {
			raw_data.push({'name': name, 'value': value});
		});

		jQuery.each(args.data, function (name, value) {
			raw_data.push({'name': 'data[' + name + ']', 'value': value});
		});

		return raw_data;
	}
});

