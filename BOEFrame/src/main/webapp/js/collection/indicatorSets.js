define(['backbone', 'model/indicatorSet'], function(Backbone, IndicatorSet) {

			var IndicatorSets = Backbone.Collection.extend({

						
						model : IndicatorSet,
						url : 'indicatorSets.do',

						parse : function(response) {
							return response.rows;
						}

					});
			return IndicatorSets;
		});
