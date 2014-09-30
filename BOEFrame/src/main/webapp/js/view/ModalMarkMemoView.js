

define(	['backbone', 'underscore', 'handlebars', 'jquery', 'view/MarkMemoView',
				'text!template/modal-view.hbs'], function(Backbone, _,
				Handlebars, $, MarkMemoView, modalViewTemplate) {

			var ModalMarkMemoView = Backbone.View.extend({

						template : Handlebars.compile(modalViewTemplate),
						// template : Handlebars.compile(markMemoTemplate),

						title : '指标注释填写',
						initialize : function(options) {

							this.markMemoView = new MarkMemoView(options);

							

						},

						

						render : function() {

							//this.markMemoView.render();
							

							var renderModel = this.model.attributes;
							_.extend(renderModel, {
										title : '指标注释填写'
									});
							var $content = this.template(renderModel);

							$(this.el).html($content);
							$('.modal-body', this.el)
									.html(this.markMemoView.$el);

							$('#' + this.model.get("modalId"), this.el).on(
									'hidden.bs.modal', this.removeModal);

						},

						removeModal : function() {

							// $('#' + model.modalId).remove();
							$(this).remove();
						}

					});

			return ModalMarkMemoView;

		});