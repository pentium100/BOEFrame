<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
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
        <link href="css/bootstrap.css" rel="stylesheet">
        <!-- Custom CSS 
        
        -->
        <link href="css/thumbnail-gallery.css" rel="stylesheet">
        <link href="css/datepicker3.css" rel="stylesheet">
        <link href="css/fileinput.min.css" rel="stylesheet">
        <link href="css/bootstrap-table.css" rel="stylesheet">
        <link href="css/bootstrap-select.min.css" rel="stylesheet">
        <link href="css/dashboard.css" rel="stylesheet">
    </head>

    <body>
        <!-- Navigation 
navbar navbar-static-top bs-docs-nav
navbar navbar-default navbar-fixed-top
        -->
        <nav class="navbar-default navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">
                        <strong>厦门国贸集团股份有限公司 管理驾驶舱
                        </strong>
                    </a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav nav-tabs22 nav-pills" id="mainTab">
                        <li class=""><a href="#home">指标数据主题</a>
                        </li>
                        <li class="active"><a href="#sliderTab" id="jumpToSlide">浏览分析报告</a>
                        </li>
                        <!--

                        <li id="indicatorMenu" class="dropdown"><a href="#"  class="dropdown-toggle" data-toggle="dropdown" >单个指标多月浏览<span class="caret"></span></a>

                            <ul class="dropdown-menu multi-level">
                            </ul>  

                        </li>

                        -->
                        <li class="" style="margin-top:10px;margin-bottom:5px;">
                            <select class="selectpicker" id="indicatorSetH" name="indicatorSetH">
                            </select>
                        </li>
                        <li class="" style="margin-top:10px;margin-bottom:5px;">
                            <select class="selectpicker" id="indicatorH" name="indicatorH">
                            </select>
                        </li>
                        <li class="dropdown" id="settingMenu"><a href="#" class="dropdown-toggle" data-toggle="dropdown">设置<span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li>
                                    <a href="#reportMemoList" id="reportMemoLink">注释管理</a>
                                </li>
                                <li class=""><a href="#slideSetting">浏览设置</a>
                                </li>
                                <li class=""><a href="#indicatorMaintain">指标设置</a>
                                </li>
                            </ul>
                        </li>
                        <!--
                        <label for="searchIndicatorSetH" class="control-label">指标集</label>
                        <label for="searchIndicatorH" class="control-label">指标名称</label>
                        <a class="navbar-brand" style="font-size:14px" href="#">
                            指标集
                        </a>
                        
                        
                        
                        <li id="indicatorSetMenu" class="dropdown"><a href="#"  class="dropdown-toggle" data-toggle="dropdown" >指标集浏览<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                            </ul>  
                        </li>

                        <li id="indicatorMenu2" class="dropdown"><a href="#"  class="dropdown-toggle" data-toggle="dropdown" >指标浏览<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                            </ul>  
                        </li>
                        -->
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container -->
        </nav>
        <!-- Page Content -->
        <div class="container-fluid ">
            <div class="row" id="home"></div>
            <div id="modals" tabindex="-1"></div>
            <div tabindex="-1" style="display:none">
                <div id="custem-toolbar">
                </div>
            </div>
            <!-- jQuery Version 1.11.0 -->
            
        </div>
        <div class="modal fade" id="redirectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        该注释无相应的数据管理主题。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </body>
    <script data-main="js/dashboard_20150434" src="js/libs/require.js"></script>

    </html>
