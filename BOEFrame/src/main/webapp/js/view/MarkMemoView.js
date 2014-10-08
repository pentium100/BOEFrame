define(	['backbone', 'underscore', 'handlebars', 'jquery',
				'text!template/mark-memo.hbs', 'bootstrap-datepicker',
				'fileinput'], function(Backbone, _, Handlebars, $,
				markMemoTemplate) {

			var MarkMemoView = Backbone.View.extend({

						// modalTemplate :
						// Handlebars.compile(modalViewTemplate),
						template : Handlebars.compile(markMemoTemplate),

						title : '注释指标填写',
						initialize : function(options) {

							$.ajax({
										url : 'reportMemo.do',
										data : {
											method : 'getLastMemo',
											keyValue : this.model.get("menuId")
										},
										success : this.loadMarkMemoView,
										context : this
									});

							this.vents = _.extend({}, Backbone.Events);
						},

						loadMarkMemoView : function(data) {

							this.render(data);

						},
						render : function(data) {

							var combineModel = _.extend(this.model.attributes,
									{
										memo : data
									});

							var $content = this.template(combineModel);

							$(this.el).html($content);

							$('.input-group.date', this.el).datepicker({
										format : "yyyy/mm/dd",
										autoclose : true,
										todayHighlight : true
									});

							$('input[type=file]', this.el).fileinput({
										'showUpload' : false,
										'previewFileType' : 'any'
									});

							$('form', this.el).submit(this, this.submitForm);
							return this;

						},

						submitForm : function(event, data) {

							event.preventDefault();
							var self = event.data;
							var form = event.target;
							// form.submit();

							var formData = new FormData(form);

							$.ajax({
										url : 'reportMemo.do',
										type : 'POST',
										data : formData,
										async : false,
										success : function(data) {
											var res = $.parseJSON(data);

											if (res.result == "success") {
												self.vents.trigger(
														'closeModalView', this);
											}
										},
										context : this,
										cache : false,
										contentType : false,
										processData : false
									});

							return false;

							// var formData = $form.serialize();
							// formData = formData + "&method=addMemo";

							// $.each($('#picFile', $form)[0].files,
							// function(key,
							// value) {
							// formData = formData + '&filenames[]='
							// + value;
							// });
							// $.ajax({

							// type : 'post',
							// url : 'reportMemo.do',

							// data : formData
							// });

						}

					});

			return MarkMemoView;

		});