package com.itg.web.ctl;

import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
  
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.businessobjects.dsws.session.Session;
import com.businessobjects.rebean.wi.DocumentInstance;
import com.businessobjects.rebean.wi.OpenDocumentParameters;
import com.businessobjects.rebean.wi.Prompts;
import com.businessobjects.rebean.wi.ReportEngine;
import com.businessobjects.rebean.wi.ReportEngines;
import com.crystaldecisions.sdk.framework.IEnterpriseSession;
import com.crystaldecisions.sdk.occa.infostore.IInfoObject;
import com.crystaldecisions.sdk.occa.infostore.IInfoObjects;
import com.crystaldecisions.sdk.occa.infostore.IInfoStore;
import com.crystaldecisions.sdk.occa.security.ILogonTokenMgr;
import com.crystaldecisions.sdk.plugin.CeKind;
import com.itg.dao.IMenuItemDAO;
import com.itg.dao.IRolesDAO;
import com.itg.dao.IUserRolesDAO;
import com.itg.dao.UserRole;
import com.itg.dao.MenuItem;
import com.itg.security.BOELogon;

@Controller
@SessionAttributes({"enterpriseSession","token", "userName"})

public class QueryController {
	private String viewName;
	
	private IUserRolesDAO userRolesDAO;
	private IRolesDAO rolesDAO;
	private Map<String, BOELogon> boeLogonMap;
	
	public IUserRolesDAO getUserRolesDAO() {
		return userRolesDAO;
	}

	public void setUserRolesDAO(IUserRolesDAO userRolesDAO) {
		this.userRolesDAO = userRolesDAO;
	}

	public IRolesDAO getRolesDAO() {
		return rolesDAO;
	}

	public void setRolesDAO(IRolesDAO rolesDAO) {
		this.rolesDAO = rolesDAO;
	}

	private String boeUrl;

    public String getBoeUrl() {
		return boeUrl;
	}

	public void setBoeUrl(String boeUrl) {
		this.boeUrl = boeUrl;
	}

	private IMenuItemDAO menuItemDAO;
	
	public IMenuItemDAO getMenuItemDAO() {
		return menuItemDAO;
	}

	public void setMenuItemDAO(IMenuItemDAO menuItemDAO) {
		this.menuItemDAO = menuItemDAO;
	}

	private BOELogon boeLogon;
	
	public BOELogon getBoeLogon() {
		return boeLogon;
	}

	public void setBoeLogon(BOELogon boeLogon) {
		this.boeLogon = boeLogon;
	}

	public String getViewName() {
		return viewName;
	}

	public void setViewName(String viewName) {
		this.viewName = viewName;
	}

	@SuppressWarnings("unchecked")
    @RequestMapping("/queryReport.do") 
     public String index(@RequestParam("menuId")int menuItemId, ModelMap map, HttpServletRequest request,HttpServletResponse response){
		IEnterpriseSession enterpriseSession ;
		
		MenuItem m = menuItemDAO.selectMenuItemByID(menuItemId);
		map.put("title", m.getMenuText());
		map.put("reportType", m.getReportType());
		
		String userName = request.getUserPrincipal().getName();
		//Logger logger = Logger.getLogger(this.getClass().toString());
		//logger.info("User Principal: " + request.getUserPrincipal().getName());
		
		Pattern pp = Pattern.compile("CN=(\\w+)");
		
		Matcher matcher = pp.matcher(userName);
		
		if(matcher.find()){
			userName = matcher.group(1)+"@itg.net";
		}
		
		List<UserRole> urs = userRolesDAO.findRolesByID(userName);
		
		//logger.info("remote user: " + request.getRemoteUser());
		
		//X509Certificate[] certs = (X509Certificate[]) request.getAttribute("javax.servlet.request.X509Certificate");
		//logger.info("x509: " + certs[0].getSigAlgName());
		
		
		List<String> authValue = new ArrayList();
		List<String> roles = new ArrayList();
		
		for(int i = 0; i<urs.size();i++){
			roles.add(urs.get(i).getRole());
			
		}
		
		if(urs.size()==0){
			map.put("defOpenDocumentUrl","\"");
    		map.put("errMsg", "您没有访问该菜单的权限，请检查！");
    		return viewName;

		}
		
		authValue.add(String.valueOf(menuItemId));
		
		List<String> menuList =  rolesDAO.findAuthValue(roles, "MENUS", authValue); 
		
		
		map.put("hideForm", "true");
		
		if( menuList.size() == 0){
			map.put("defOpenDocumentUrl","\"");
    		map.put("errMsg", "您没有访问该菜单的权限，请检查！");
    		return viewName;
		}
		
		String errMsg = null ;
		try {
			
			boeLogon =  boeLogonMap.get(request.getUserPrincipal().getName());
			if(boeLogon==null){
				    boeLogon =  boeLogonMap.get("others");
					
			}
			enterpriseSession = boeLogon.getEs();
			
		} catch (com.crystaldecisions.sdk.exception.SDKException e1) {
    		errMsg = e1.toString();
    		map.put("defOpenDocumentUrl","\"");
    		map.put("errMsg", errMsg);
    		return viewName;
		}
//        if (map.get("enterpriseSession")==null){
//        	
//        	try {
//        		enterpriseSession = boeLogon.logon();
//        		map.put("enterpriseSession", enterpriseSession);
//			
//        	} catch (com.crystaldecisions.sdk.exception.SDKException e) {
//        		// TODO Auto-generated catch block
//        		errMsg = e.toString();
//        		map.put("defOpenDocumentUrl","\"");
//        		map.put("errMsg", errMsg);
//        		return viewName;
//        	}
//		
//        }
        
//        enterpriseSession = (IEnterpriseSession) map.get("enterpriseSession");
        
    	ILogonTokenMgr logonTokenMgr;
    	Cookie cookie = null;
    	if(map.get("token")==null){
    		try {
    			logonTokenMgr = enterpriseSession.getLogonTokenMgr();
    			String token = logonTokenMgr.createLogonToken("", 1440, 10000);
    			cookie = new Cookie("LogonToken", token);
    			map.put("token", token);
    		} catch (com.crystaldecisions.sdk.exception.SDKException e) {
    			// TODO Auto-generated catch block
    			//	e.printStackTrace();
    			errMsg += e.toString();
    			map.put("defOpenDocumentUrl","\"");
    			map.put("errMsg", errMsg);
    			return viewName;
    		}	
    	
    	// Retrieve a logon token and store it in the user's cookie
    	// file for use later.
    	
    	
    	response.addCookie(cookie);
    	
    	
    	}
    	Properties reportProperties = null;
    	Prompts prompts = getPrompts(enterpriseSession, m.getReportId(), reportProperties);
    	
    	String boeUrl2 = "";
    	boeUrl2 = boeUrl;
    	
    	
    	boeUrl2 = boeUrl2.replaceAll("~reportId~", m.getReportId());
    	boeUrl2 = boeUrl2.replaceAll("~userName~", request.getUserPrincipal().getName());
    	//boeUrl2 = boeUrl2.replaceAll("~token~", (String) map.get("token"));
    	//boeUrl2 = boeUrl2.replaceAll("~token~", "+getCookie('LogonToken')+");
    	map.put("openDocumentUrl", boeUrl2);
    	map.put("menuId", m.getID());
    	map.put("defOpenDocumentUrl","\"");
    	//String boeUrl3 = "";
    	
    	//if ((m.getDefQueryString()!=null)&&(!m.getDefQueryString().equals(""))){
    	//  boeUrl3 = boeUrl2;
    	//  boeUrl3 = boeUrl3+m.getDefQueryString();
    	  //boeUrl3 = boeUrl3.replaceAll("~reportId~", m.getReportId());
    	  //boeUrl3 = boeUrl3.replaceAll("~token~", (String) map.get("token"));
    	//}
    	//map.put("defOpenDocumentUrl", boeUrl3);
    	map.put("separator", ";");
    	

    	if(m.getQueryString()==null || m.getQueryString().equals(""))
    	{
    		
    	  map.put("defOpenDocumentUrl", boeUrl2+"&token=\"+getCookie('LogonToken')+getUrl()"); 
    	  map.put("hideForm", "true");	
    	  return viewName;
    	}
    	
    	else
    	{
    		map.put("defOpenDocumentUrl","\"");
    	}
    	
    	
    	
    	String[] param = m.getQueryString().split("&");
    	String paramList = "";
    	String boeUrl3 = "";
    	
    	
    	for(int i = 1; i<param.length; i++){
    		boolean isMulti;
    		if (param[i].substring(0,3).equals("lsS")){
    			isMulti = false;
    		}else{
    			isMulti = true;
    		}
    		
			java.util.regex.Pattern p = Pattern.compile("(?<=\\{t:)\\w*?(?=\\})");
			Matcher m2 = p.matcher(param[i]);
            
			java.util.regex.Pattern p4 = Pattern.compile("(?<=\\{l:).*?(?=\\})");
			Matcher m4 = p4.matcher(param[i]);
			
			
			java.util.regex.Pattern p3 = Pattern.compile("(?<=\\{d:).*?(?=\\})");
			Matcher m3 = p3.matcher(param[i]);
			
			java.util.regex.Pattern p5 = Pattern.compile("(?<=\\{ms:).*?(?=\\})");
			Matcher m5 = p5.matcher(param[i]);
			String separator = ";";
			
			if (m5.find()){
				if(m5.group().equals("true")){
					isMulti = true;
					separator = ",";
				}
			}
			if ((!map.get("separator").equals(","))){
			  map.put("separator", separator);
			  }

			
			if (m2.find()){
				
				   ServletContext context = request.getSession().getServletContext();
				   
				   WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(context);
				   
				   IReportFilter brf = (IReportFilter) ctx.getBean(m2.group()+"_rf");
				   
					String prompt="";
					if (m4.find()){
					  prompt = m4.group();
					}
					
					if (prompt.equals("")){
						  prompt = brf.getLabel();
						}
					
					
					if ((prompt==null)||(prompt.equals(""))){
					  prompt = param[i].split("=")[0];
					}

				   
				   
				   if (!paramList.equals("")){
						paramList +=",";
					}
				   String defaultValue = "";
				   if (m3.find()){
					   
					   defaultValue = m3.group();
					   
				   }
				   if (!defaultValue.equals("")){
					   if (brf.getMasterName().equals("datefield")){
					   
						   boeUrl3+="+'&"+param[i].split("=")[0]+"='+"+defaultValue+".format('Y-m-d')";
					   
					   }else
					   {
						   boeUrl3+="+'&"+param[i].split("=")[0]+"='+"+defaultValue;
					   }
				   }

				   paramList +=brf.renderFilter((String) request.getUserPrincipal().getName(), prompt, param[i].split("=")[0], "c-"+i, defaultValue, isMulti, promptAllowBlank(param[i].split("=")[0], prompts))+"\n";
			
			}
    		
    	}
    	
    	if (!paramList.equals("")){
    		paramList+=",";
    	}
    	map.put("hideForm", "false");
    	map.put("paramList", paramList);
    	
    	//map.put("boeUrl3", boeUrl3);
    	
    	//map.put("boeUrl3", boeUrl3);
    	
    	return viewName;
    	
    	
    }
	private Prompts getPrompts(IEnterpriseSession enterpriseSession, String reportId, Properties reportProperties)
	{
		Prompts result = null;
        
		try {
			// Retrieve the IInfoStore object
			IInfoStore boInfoStore = (IInfoStore) enterpriseSession
					.getService("InfoStore");

			// Build query to retrieve the InfoObjects for Web Intelligence
			// document
			String query = "SELECT * FROM CI_INFOOBJECTS WHERE "
					+ "  SI_INSTANCE=0 AND SI_CUID='"+ reportId + "'";

			// Execute the query
			IInfoObjects boInfoObjects = (IInfoObjects) boInfoStore
					.query(query);
			

			// Retrieve the first InfoObject instance of the Web Intelligence
			// document
			IInfoObject infoObject = (IInfoObject) boInfoObjects.get(0);
			ReportEngines boReportEngines = (ReportEngines) enterpriseSession
					.getService("ReportEngines");

			// Retrieve the Report Engine for Web Intelligence documents

			ReportEngine boReportEngine = boReportEngines
					.getService(ReportEngines.ReportEngineType.WI_REPORT_ENGINE);




			// Retrieve the document instance for the Web Intelligence document
			DocumentInstance boDocumentInstance = boReportEngine
					.openDocument(infoObject.getID());

			// Refresh the document instance (if required)
			boDocumentInstance.refresh();
			
			result = boDocumentInstance.getPrompts();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
			

		
		return result;
	}
	private boolean promptAllowBlank(String prompt, Prompts prompts)
	{
		
	   if(prompt.substring(0, 2).equals("ls")){
		   prompt=prompt.substring(3);
	   }
	   boolean result = false;
	   if(prompts==null){
		   return true;
	   }
	   	
	   for(int i =0;i<prompts.getCount();i++){
		   if (prompt.equals(prompts.getItem(i).getName())){
			   result = !prompts.getItem(i).requireAnswer();
			   break;
		   }
	   }
	   return result;	
	}

	public Map getBoeLogonMap() {
		return boeLogonMap;
	}

	public void setBoeLogonMap(Map boeLogonMap) {
		this.boeLogonMap = boeLogonMap;
	}
	
}
