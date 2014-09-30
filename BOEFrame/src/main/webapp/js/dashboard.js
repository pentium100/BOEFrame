require.config({
			baseUrl : 'js',
			shim : {
				'bootstrap' : {
					deps : ['jquery']
				},

				'handlebars' : {
					exports : 'Handlebars'
				}

			},
			paths : {

				jquery : 'libs/jquery-1.11.1',
				handlebars : 'libs/handlebars-v2.0.0',
				bootstrap : 'libs/bootstrap',
				text : 'libs/text',
				backbone : 'libs/backbone',
				underscore : 'libs/underscore',
				'bootstrap-datepicker' : 'libs/bootstrap-datepicker',

				'jquery.fileupload' : 'libs/jquery.fileupload'

			}

		});

require(['text!template/menu.hbs', 'text!template/slide-indicator.hbs',
				'text!template/slide-item.hbs', 'jquery', 'bootstrap',
				'handlebars', 'jquery', 'collection/menus'], function(menuSrc,
				slideIndicatorSrc, slideItemSrc, jquery, bootstrap, Handlebars,
				$, MenuCollection) {
			Handlebars.registerHelper('substring', function(passedString,
					options) {

				var hash = options.hash;

				var theString = passedString.substring(hash.start, hash.length);
				return new Handlebars.SafeString(theString);
			});

			var initForm = function(collection) {

				var data = collection.toJSON();

				var menuTemplate = Handlebars.compile(menuSrc);
				var slideIndicatorTemplate = Handlebars
						.compile(slideIndicatorSrc);
				var slideItemTemplate = Handlebars.compile(slideItemSrc);

				var menuHtml = menuTemplate({
							menus : data
						});
				var slideIndicatorHtml = slideIndicatorTemplate({
							menus : data
						});
				var slideItemHtml = slideItemTemplate({
							menus : data
						});

				// $(".slides").append(slideItems.join(""));
				$(".carousel-indicators").append(slideIndicatorHtml);
				$(".carousel-inner").append(slideItemHtml);

				$('#home').append(menuHtml);
				$('.carousel').carousel();

				$("img").on("dblclick", function(evt) {
					var target = evt.target;
					var id = $(target).attr("data-id");
					window
							.open(
									"queryReport.do?menuId=" + id,
									id,
									"left=0,top=0,width="
											+ (screen.width - 10)
											+ ",height="
											+ (screen.height - 70)
											+ ",location=no,scrollbars=yes,menubars=no,toolbars=no,resizable=yes");

				});

				$('.carousel img').hover(hoverIn, hoverOut);
				$('#markMemo').on('click', markMemo);
				$('.thumb').on('click', setThumbSelected);

			};

			var menus;

			var loadMenuItem = function() {

				menus = new MenuCollection();

				menus.fetch({
							data : {
								node : 900
							},
							success : initForm
						});
			};
			var setThumbSelected = function(event) {

				$('.x-view-selected').removeClass('x-view-selected');
				$(event.target).parents('.thumb').addClass('x-view-selected');
			};

			var hoverIn = function(event) {

			}
			var hoverOut = function(event) {

				$('.carousel').carousel('next');

			}

			var markMemo = function() {

				require(['view/ModalMarkMemoView', 'backbone'], function(
								ModalMarkMemoView, Backbone) {

							var modalId = _.uniqueId("modal_");
							var selectedId = $('.x-view-selected')
									.attr('data-id');

							var menuModel = menus.get(parseInt(selectedId)).attributes;
							var model = new Backbone.Model({
										'menuId' : selectedId,
										'modalId' : modalId,
										'menu' : menuModel
									});

							var view = new ModalMarkMemoView({
										model : model,
										root : '#modals'
									});

							view.render();

							$('#modals').append(view.$el);
							$('#' + modalId).modal('show');

						});

			}

			loadMenuItem();

		});