<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>

    <!DOCTYPE html>
    <html lang="zh-cn">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">


    </head>

    <body>

        <script language="javascript">
        var redirectUrl = "dashboard.jsp";
        var width = screen.width;
        var height = screen.height;
        if (height == 768) height -= 75;
        if (height == 600) height -= 60;
        var szFeatures = "top=0,";
        szFeatures += "left=0,";
        szFeatures += "width=" + width + ",";
        szFeatures += "height=" + height + ",";
        szFeatures += "directories=no,";
        szFeatures += "menubar=no,";
        szFeatures += "location=no,";
        szFeatures += "status=no,";
        szFeatures += "fullscreen=yes,";
        szFeatures += "scrollbars=yes,";

        //if (height <= 600) szFeatures += "scrollbars=yes,";
        //else szFeatures += "scrollbars=no,";

        szFeatures += "resizable=yes"; //channelmode
        var newwin = window.open(redirectUrl, "", szFeatures);

        if(newwin!==null){

                //window.opener='boeframe';
                //window.open('','_self');
                //window.close();
        }else{

                window.opener='boeframe';
                window.open('dashboard.jsp','_self');

        }
        </script>


    </body>
