define(	['backbone', 'underscore', 'handlebars', 'jquery',
				'text!template/mark-memo.hbs', 'bootstrap-datepicker',
				'jquery.fileupload'], function(Backbone, _, Handlebars, $,
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

							$('form', this.el).submit(this.submitForm);

						},

						submitForm : function(event, data) {

							event.preventDefault();
							var $form = $(event.target);
							var formData = $form.serialize();
							formData = formData + "&method=addMemo";

							$.each($('#picFile', $form)[0].files, function(key,
											value) {
										formData = formData + '&filenames[]='
												+ value;
									});
							$.ajax({

										type : 'post',
										url : 'reportMemo.do',

										data : formData
									});

						}

					});

			return MarkMemoView;

		});