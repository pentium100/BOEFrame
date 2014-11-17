<%@ page language="java" pageEncoding="utf-8" %>
    <!doctype html>
    <html>

    <head>
        <meta charset="utf-8">
        <meta name="description" content="$1">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>厦门国贸集团股份有限公司 管理驾驶舱</title>

        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/loginstyle.css">

        <script type='text/javascript' src='js/libs/jquery-1.11.1.min.js'></script>
        <script src="js/libs/jquery.html5-placeholder-shim.js" language="javascript"></script>


        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
      <script src="js/ie/html5shiv.min.js"></script>
      <script src="js/ie/respond.min.js"></script>
    <![endif]-->


        <SCRIPT type=text/javascript>
        function doCheck() {

            if (!document.all("j_username").value.match("@")) {
                document.all("j_username").value = document.all("j_username").value + "@itg.net";
            }
            return true;
        }
        </SCRIPT>

    </head>

    <body>

        <div class="container">
            <div class="row">
                <OBJECT ID='maintop_menu_flash' NAME='maintop_menu_flash' class="center-block " CLASSID='CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000' CODEBASE='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' WIDTH='800' HEIGHT='117'>
                    <PARAM NAME='movie' VALUE='maintop.swf'>
                    <PARAM NAME='wmode' VALUE='transparent'>
                    <PARAM NAME='wmode' VALUE='wmode'>
                    <param name="scale " value="exactfit ">
                    <param name="quantity " value="high ">
                    <param name="menu " value="false ">
                    <param name="bgcolor " value="#ffffff ">
                    <param name="allowScriptAccess " value="sameDomain ">
                    <param name="align " value="middle ">

                    <EMBED SRC='maintop.swf' MENU='false' class="center-block " WIDTH='800' HEIGHT='117' ID='maintop_menu_flash' NAME='maintop_menu_flash' TYPE='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/go/getflashplayer' />
                </OBJECT>

            </div>
        </div>
        <div class="container ">
            <div class="row ">
                <div class="col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3 col-lg-4 col-lg-offset-4 ">
                    <h1 class="text-center login-title ">厦门国贸集团股份有限公司 管理驾驶舱</h1>
                    <div class="account-wall ">
                        <img class="profile-img" src="images/itg_logo2.jpg" alt="">
                        <form class="form-signin" onsubmit="return doCheck();" action="j_security_check ">



                            <input type="text" class="form-control" placeholder="用户名" name="j_username" required autofocus>





                            <input type="password" class="form-control" placeholder="密码" name="j_password" required>




                            <button class="btn btn-lg btn-primary btn-block " type="submit ">
                                登录</button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </body>

    </html>
