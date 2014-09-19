var loadMenuItem = function() {

	$.getJSON("getMenu.do", {
				node : 900
			}, function(data) {
				var slideItems = [];
				var menuItems = [];
				var indicators = [];
				$.each(data, function(key, val) {

					indicators.push('<li data-target="#slider" data-slide-to="'
							+ key + '" class="active"></li>');

					var isActive = '';
					if (key == 0) {
						isActive = 'active';

					}
					slideItems.push('<div class="item ' + isActive
							+ ' center" >' + '<img data-id="' + val.id
							+ '" src="images/report/'
							+ val.text.substring(0, 3)
							+ '.jpg" alt="" class="img-responsive">'

							+ '</div>');
					menuItems
							.push('<div class="col-lg-3 col-md-4 col-xs-6 thumb">'
									+ '<a class="thumbnail" href="#"> <img data-id="'
									+ val.id
									+ '" style="width: 200px; height: 130px;"  class="img-responsive"'
									+ '	src="'
									+ val.images
									+ '" alt=""></a>'
									+ '<strong>'
									+ val.text
									+ '</strong>'
									+ '</div>');

				});

				// $(".slides").append(slideItems.join(""));
				$(".carousel-indicators").append(indicators.join(""));
				$(".carousel-inner").append(slideItems.join(""));

				$('#home').append(menuItems.join(""));
				$('.carousel').carousel();

				$("img").on("click", function(evt) {
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

			});
}
var hoverIn = function(event) {

	

}
var hoverOut = function(event) {

	$('.carousel').carousel('next');

}

$(window).load(function() {

	loadMenuItem();

		/*
		 * $('#autoShow').on('click', function() {
		 * 
		 * $('#menuPanel').addClass("hide");
		 * $('#slidePanel').removeClass("hide");
		 * 
		 * });
		 * 
		 * $('#home').on('click', function() {
		 * 
		 * $('#menuPanel').removeClass("hide");
		 * $('#slidePanel').addClass("hide"); });
		 */

	});
