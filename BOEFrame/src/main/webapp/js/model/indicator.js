define(['backbone'], function(Backbone) {
			var IndicatorModel = Backbone.Model.extend({

						initialize : function() {

						},

						defaults:{
							id:0,
							name:'',
							menu:0
						}

					});
			return IndicatorModel;
		});