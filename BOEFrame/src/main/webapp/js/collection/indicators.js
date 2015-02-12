define(['backbone', 'model/indicator'], function(Backbone, Indicator) {

			var Indicators = Backbone.Collection.extend({

						
						model : Indicator,
						url : 'indicators.do',

						parse : function(response) {
							return response.rows;
						}

					});
			return Indicators;
		});
