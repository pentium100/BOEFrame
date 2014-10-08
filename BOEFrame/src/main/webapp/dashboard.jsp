<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="zh-cn">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>厦门国贸集团股份有限公司 管理驾驶舱</title>

<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/thumbnail-gallery.css" rel="stylesheet">
<link href="css/dashboard.css" rel="stylesheet">
<link href="css/datepicker3.css" rel="stylesheet">
<link href="css/fileinput.css" rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

<style type="text/css">
/*CSS*/
div.c-wrapper {
	width: 80%; /* for example */
	margin: auto;
}

.carousel-inner>.item>img,.carousel-inner>.item>a>img {
	width2: 100%; /* use this, or not */
	height: 100%;
	margin: auto;
}
</style>



</head>

<body>

	<!-- Navigation -->
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#"><strong>厦门国贸集团股份有限公司
						管理驾驶舱</strong></a>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav nav-tabs" role="tablist">
					<li class="active"><a href="#home" role="tab"
						data-toggle="tab">快捷入口</a></li>
					<li><a href="#slider" role="tab" data-toggle="tab">逐项浏览</a></li>
					<li><a href="#" id="markMemo">备注说明</a></li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container -->
	</nav>

	<!-- Page Content -->
	<div class="container tab-content">


		<div class="tab-pane active row " id="home"></div>


		<div id="slider" class="tab-pane carousel slide " data-ride="carousel">
	<div class="row clearfix">
		<div class="col-md-2 column">
			<blockquote>
				<p id="reportMemo">
					
				</p> <small></small>
			</blockquote>
		</div>
		<div class="col-md-10 column">
			<div class="carousel slide" id="carousel-832478">
				<ol class="carousel-indicators">
				</ol>
				<div class="carousel-inner">
				</div> <a class="left carousel-control" href="#slider" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a> <a class="right carousel-control" href="#slider" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
			</div>
		</div>
	</div>
		</div>


		<hr>

		<!-- Footer -->
		<footer>
			<div class="row">
				<div class="col-lg-12">
					<p>Copyright &copy; 厦门国贸集团股份有限公司 2014</p>
				</div>
			</div>
		</footer>

	</div>
	<!-- /.container -->

	<div id="modals" tabindex="-1"></div>


	<!-- jQuery Version 1.11.0 -->
	<script data-main="js/dashboard" src="js/libs/require.js"></script>

</body>

</html>
