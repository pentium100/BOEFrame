<html>
<head>
<link rel="stylesheet" type="text/css" href="css/flexslider.css" />

<script src="js/libs/jquery-1.11.1.min.js"></script>
<script src="js/libs/jquery.flexslider.js"></script>


<style type="text/css">
#container2 {
	margin-left: 180px;
	margin-right: 180px;
	overflow: hidden;
}

.loading #container {
	opacity: 0;
}

.loading:before {
	content: 'LOADING';
	display: block;
	margin: 100px 0 0;
	text-align: center;
	color: #fff;
	font-weight: bold;
	font-size: 60px;
	opacity: 0.3;
}

body {
	width: 100%;
	float: left;
	opacity: 1;
	-webkit-transition: opacity 1s ease;
}
</style>
<body class="loading">
	<div id="container" align="center">
		<div class="carousel" style="width: 900px">
			<ul class="slides">

			</ul>
		</div>

	</div>
</body>

<script type="text/javascript" charset="utf-8">
	var verticalCenterer = function() {
		$(this).css('margin-top',
				($(this).parent().height() - ($(this).outerHeight())) / 2);
	};

	var carouselInit = function() {
		var carouselHeight = $('.flex-viewport').innerHeight();
		//$('.flex-viewport').css('height', carouselHeight);
		carouselHeight = window.innerHeight;
		$("img").attr('height', carouselHeight - 40);
		$('.slides li').css('height', carouselHeight);
		$('p').each(
				function() {
					$(this)
							.css(
									'margin-top',
									($(this).parent().height() - ($(this)
											.outerHeight())) / 2);
				});

	}

	var resizeSlider = function(slide) {

		//$('.carousel').css('width',
		//		$('img', slide.slides[slide.currentSlide]).width());

	};
	var loadMenuItem = function() {

		$.getJSON("getMenu.do", {
			node : 900
		}, function(data) {
			var items = [];
			$.each(data, function(key, val) {
				items.push("<li><img height=600 data-id='" + val.id
						+ "' src='images/report/" + val.text.substring(0, 3)
						+ ".jpg'/></li>");

			});

			$(".slides").append(items.join(""));

			makeSlider();

		});
	}

	var makeSlider = function() {

		$('.carousel').flexslider({
			animation : "slide",
			slideshowSpeed : 6000,
			animationSpeed : 3000,
			directionNav : true,
			pausePlay : true,
			pauseOnHover : true,
			//itemWidth : 500,
			maxItems : 1,

			after : resizeSlider,
			//pauseText : '',
			//playText : '',
			start : carouselInit
		});
		//alert('Wait a moment');

		$("img")
				.on(
						"click",
						function(evt) {
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
		$('body').removeClass('loading');
	}

	$(window).load(function() {

		loadMenuItem();

	});

	$(window).resize(carouselInit);
	//$("img", slider).photoResize({
	//	bottomSpacing : 15
	//});
</script>
</html>