<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<title>${title}</title>
    <link rel="stylesheet" type="text/css" href="js/ext-3.0.0/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="js/ext-3.0.0/examples/shared/examples.css" />
    
    
    <style type="text/css">
    html, body {
        font:normal 12px verdana;
        margin:0;
        padding:0;
        border:0 none;
        overflow:hidden;
        height:100%;
    }
    p {
        margin:5px;
    }
    .settings {
        background-image:url(js/ext-3.0.0/examples/shared/icons/fam/folder_wrench.png);
    }
    .nav {
        background-image:url(js/ext-3.0.0/examples/shared/icons/fam/folder_go.png);
    }
    </style>

    
    <!-- LIBS -->
    <script type="text/javascript" src="js/ext-3.0.0/adapter/ext/ext-base.js"></script>
    <!-- ENDLIBS -->

    <script type="text/javascript" src="js/ext-3.0.0/ext-all.js"></script>

    <!-- EXAMPLES -->
    <script type="text/javascript" src="js/ext-3.0.0/examples/shared/examples.js"></script>
    <script type="text/javascript" src="js/ext-3.0.0/examples/ux/miframe.js"></script>
    <link rel="stylesheet" type="text/css" href="js/ext-3.0.0/examples/ux/css/Select.css">
	<script type="text/javascript" src="js/ext-3.0.0/examples/ux/Select.js"></script>
    

<script type="text/javascript">

function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
    Ext.onReady(function(){
    	window.focus();
    	Ext.BLANK_IMAGE_URL = 'js/ext-3.0.0/resources/images/default/s.gif';
        var viewport = new Ext.Viewport({
            layout: 'border',
            renderTo: 'reportResult',
            defaults: {

     			collapsible: true
    			,split: true
                ,titleCollapse : true 
                ,floatable: false
                //hideCollapseTool : false,

		    	//bodyStyle: 'padding:15px'
				},
            
            items: [
            // create instance immediately
            //new Ext.FormPanel(
                {
                xtype:'form',
                region: 'north',
                height: 102, // give north and south regions a height
                minSize: 102,
                maxSize: 102, 

                
                //autoScroll:true, 
                //closable: true, 
                
                hidden: ${hideForm},
                id: 'selectForm', 
                //split: true,
                title: '查询条件', 
                frame: true,
                layout:'column', 

                items: [${paramList} {xtype:'button', text: '刷新数据', 
                          handler:function(e){
                                    
                                    if(Ext.getCmp("selectForm").getForm().isValid()){
                                       
                                    	Ext.getCmp("selectForm").toggleCollapse(true);
                          	 			Ext.getCmp("SORiframe").setSrc("${openDocumentUrl}&token="+getCookie('LogonToken').replace(/"/g,'')+getUrl());
                          	 		}
                          	 			
                             
                                              }
                         
                         
                         }
                         
                         ]
            }, 
            //),             // in this instance the TabPanel is not wrapped by another panel
            // since no title is needed, this Panel is added directly
            // as a Container
            centerPanel = new Ext.Panel({
                region: 'center', // a center region is ALWAYS required for border layout
                deferredRender: false,
                activeTab: 0,     // first tab initially active
                layout: 'fit',
                resizable:true, 
                header: false,
                //title: "查询结果",
                items: [
                	{
        			xtype : 'iframepanel',
        			id : 'SORiframe',
        			frame: false,
        			loadMask : false
        			
        			,defaultSrc:  "${defOpenDocumentUrl}
        			//defaultSrc: '${defOpenDocumentUrl}'
    　　　　　			}
                ]
            })]
        });
        
       var errMsg = "${errMsg}";
       
       if (errMsg != ""){
       
          Ext.Msg.alert('错误信息', errMsg );
       }
    
       Ext.getCmp("selectForm").toggleCollapse(true);
       Ext.getCmp("SORiframe").setSrc("${openDocumentUrl}&token="+getCookie('LogonToken').replace(/"/g,'')+getUrl());

    
    }
)

function getUrl()
{
                                    var i = 1;
                                    var queryString = "";
                                    
                          	 		while(Ext.getCmp("c-"+i)!=undefined)
                          	 		{
                          	 		   cmp = Ext.getCmp("c-"+i);
                          	 		   
                          	 		   value = cmp.getValue();
                          	 		   if(value==""){
                          	 		   
                          	 		      value=forceInputValue(cmp);
                          	 		      
                          	 		   }
                          	 		   
                          	 		   if((cmp.multiSelect!=undefined)&&(cmp.multiSelect)&&(cmp.valueArray.length>1)){
                          	 		       value2 = cmp.getValue(1);
                          	 		       value = "";
                          	 		       for(j=0;j<value2.length;j++){
                          	 		       
                          	 		          if(value!=""){
                          	 		          	value+="${separator}";
                          	 		          }
                          	 		          
                          	 		          //value += "["+cmp.store.getAt(cmp.store.find("text",value2[j])).id + "]";
                          	 		          if(cmp.store.find("text",value2[j])!=-1){
                          	 		            value += cmp.store.getAt(cmp.store.find("text",value2[j])).id;
                          	 		          }else{
                          	 		            value += value2[j];
                          	 		          
                          	 		          }
                          	 		       
                          	 		       }
                          	 		   	   
                          	 		   }
                          	 		   if((cmp.xtype!=undefined)&&(cmp.xtype=='datefield')){
                          	 		       
                          	 		       if (cmp.value!=""){
                          	 		         //value = "Date"+ Date.parseDate(cmp.value, cmp.format).format('(Y,m,d)');
                          	 		         if ("${menuId}".charAt(0)=="2"){
                          	 		         
                          	 		           value = Date.parseDate(cmp.value, cmp.format).format('Ymd');
                          	 		         }else if ("${reportType}"=="XC"){
                          	 		           value = getDaysAfter1900(Date.parseDate(cmp.value, cmp.format));
                          	 		         }
                          	 		         else{
                          	 		         
                          	 		         	value = Date.parseDate(cmp.value, cmp.format).format('Y-m-d');
                          	 		         }
                          	 		         //value = cmp.value;
                          	 		         
                          	 		       }
                          	 		   
                          	 		   }
                          	 		   if(value!=""){

                          	 		   		  queryString += "&" + cmp.name+"="+value;
                          	 		   		
                          	 		   }
                          	 		   i++;
                          	 		}		
                          	 		return encodeURI(queryString);
                          	 		//alert(queryString);
                          	 		//debugger;


}


function getDaysAfter1900(d){
  
  var result = (d - new Date(1900,1,1))/86400000+33;
  return result;

}

function forceInputValue(cmp){

    var result = "";
    
    if((cmp.hasAuth==undefined)||(!cmp.hasAuth)) {return result;}
	if((cmp.multiSelect!=undefined)&&(cmp.multiSelect))
	{
	   for(i=0;i<cmp.store.data.length;i++){
	     if (result!=""){result+="${separator}";}
	     result+=cmp.store.getAt(i).id;
	   }
	}
    //if((cmp.multiSelect!=undefined)&&(!cmp.multiSelect)){
    //	result=cmp.store.getAt(0).id;
    //}
    return result;

}
  
</script>


</head>


<body>
<div id="reportResult">

</div>

</body>
</html>