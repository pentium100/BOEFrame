define(['backbone'], function(Backbone) {
			var IndicatorSetModel = Backbone.Model.extend({

						initialize : function() {

						},

						defaults:{
							id:0,
							name:''
						}

					});
			return IndicatorSetModel;
		});