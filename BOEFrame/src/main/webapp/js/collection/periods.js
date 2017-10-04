define(['backbone', 'model/period'], function(Backbone, Period) {

			var Periods = Backbone.Collection.extend({

						
						model : Period,
						url : 'reportMemo.do?method=getPeriods',


						parse : function(response) {
							return response.rows;
						}

					});
			return Periods;
		});
