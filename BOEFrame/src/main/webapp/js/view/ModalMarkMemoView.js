

define(	['backbone', 'underscore', 'handlebars', 'jquery', 'view/MarkMemoView',
				'text!template/modal-view.hbs'], function(Backbone, _,
				Handlebars, $, MarkMemoView, modalViewTemplate) {

			var ModalMarkMemoView = Backbone.View.extend({

						template : Handlebars.compile(modalViewTemplate),
						// template : Handlebars.compile(markMemoTemplate),

						title : '指标注释填写',

						className : "modal fade bs-example-modal-lg",
						
						attributes : function() {
							return {

								"tabindex" : "-1",
								"role" : "dialog",
								"aria-hidden" : "true",
								"style" : "z-index: 1050"

							};
						},
						initialize : function(options) {

							this.markMemoView = new MarkMemoView(options);

							this.markMemoView.vents.on('closeModalView',
									this.closeModalView, this);

						},

						closeModalView : function() {

							// $('#' + this.attributes.id,
							// this.el).modal('hide');
							this.$el.modal('hide');

						},

						render : function() {

							// this.markMemoView.render();

							var renderModel = this.model.attributes;
							_.extend(renderModel, {
										title : '指标注释填写'
									});
							var $content = this.template(renderModel);

							$(this.el).html($content);
							$('.modal-body', this.el)
									.html(this.markMemoView.$el);

							// $('#' + this.attributes.id, this.el).on(
							// 'hidden.bs.modal', this.removeModal);

							this.$el.on('hidden.bs.modal', this, this.removeModal);
							//this.listenTo($(this.$el), 'hidden.bs.modal', this.removeModal);

						},

						removeModal : function(event) {

							// $('#' + model.modalId).remove();
							var self = event.data;
							self.remove();
						}

					});

			return ModalMarkMemoView;

		});