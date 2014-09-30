package com.itg.web.ctl;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.crystaldecisions.sdk.framework.*;
import com.crystaldecisions.sdk.occa.infostore.*;
import com.crystaldecisions.sdk.occa.security.ILogonTokenMgr;
import com.crystaldecisions.sdk.plugin.CeKind;
import com.businessobjects.rebean.wi.*;
import com.itg.security.*;

@Controller
@SessionAttributes( { "enterpriseSession", "token", "userName" , "ReportEngines", "entry"})
  
public class ViewReportController {

	private BOELogon boeLogon;
	private String viewName;

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
	public IEnterpriseSession getBOESession(ModelMap map) {
		IEnterpriseSession enterpriseSession = (IEnterpriseSession) map
				.get("enterpriseSession");
		if (enterpriseSession == null) {

			try {
				enterpriseSession = boeLogon.logon();
				map.put("enterpriseSession", enterpriseSession);

			} catch (com.crystaldecisions.sdk.exception.SDKException e) {
				// TODO Auto-generated catch block
				map.put("errMsg", e.toString());
			}

		}
		return enterpriseSession;

	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/viewReport.do")
	public String index(ModelMap map, HttpServletRequest request,
			HttpServletResponse response) {

		IEnterpriseSession boEnterpriseSession = getBOESession(map);
        
		try {
			// Retrieve the IInfoStore object
			IInfoStore boInfoStore = (IInfoStore) boEnterpriseSession
					.getService("InfoStore");

			// Build query to retrieve the InfoObjects for Web Intelligence
			// document
			String query = "SELECT * FROM CI_INFOOBJECTS WHERE SI_KIND='"
					+ (request.getParameter("si_kind")==null||request.getParameter("si_kind").equals("webi") ? CeKind.WEBI
							: CeKind.XCELSIUS)
					+ "' AND  SI_INSTANCE=0 AND SI_CUID='"
					+ request.getParameter("iDocID") + "'";

			// Execute the query
			IInfoObjects boInfoObjects = (IInfoObjects) boInfoStore
					.query(query);
			

			// Retrieve the first InfoObject instance of the Web Intelligence
			// document
			IInfoObject infoObject = (IInfoObject) boInfoObjects.get(0);
			ReportEngines boReportEngines = (ReportEngines) boEnterpriseSession
					.getService("ReportEngines");
			
			map.put("ReportEngines", boReportEngines);


			// Retrieve the Report Engine for Web Intelligence documents

			ReportEngine boReportEngine = boReportEngines
					.getService(ReportEngines.ReportEngineType.WI_REPORT_ENGINE);


			OpenDocumentParameters parameters = new OpenDocumentParameters();
			parameters.getProperties().setProperty("nooutputlimits", "true");
			

			// Retrieve the document instance for the Web Intelligence document
			DocumentInstance boDocumentInstance = boReportEngine
					.openDocument(infoObject.getID(), parameters);

			// Refresh the document instance (if required)
			boDocumentInstance.refresh();
			
			Prompts prompts = boDocumentInstance.getPrompts();
			
					
			for(int i=0;i<prompts.getCount();i++){
				String[] values = request.getParameterValues(prompts.getItem(i).getName());
				if (values!=null){
					prompts.getItem(i).enterValues(values);
				}
			}
			boDocumentInstance.setPrompts();

		    


			/************************** RETRIEVE THE SPECIFIED REPORT INSTANCE **************************/

			// Retrieve the report specified by the reportIndex
			Report boReport = boDocumentInstance.getReports().getItem(0);
			String strEntry = boDocumentInstance.getStorageToken();
			map.put("entry", strEntry);
 
			// Set the Pagination Mode for the report.
			boReport.setPaginationMode(PaginationMode.Listing);
			
			
			
			// Setup the JSP that will be used to retrieve the images on a
			// report
			ImageOption imageOption = boDocumentInstance.getImageOption();
			imageOption.setImageCallback("image_handler.jsp");
			imageOption.setImageNameHolder("ImageName");
		    imageOption.setStorageTokenHolder("entry");
		    
			
			
			// Retrieve the session variables 
			
			// Retrieve the DHTML View of the report
		    
			
		    HTMLView boHtmlView = (HTMLView) boReport.getView(OutputFormatType.DHTML );
		    
		    String strUserAgent = request.getHeader("User-Agent");
			boHtmlView.setUserAgent(strUserAgent);
			

			
			
			map.put("head", boHtmlView.getStringPart("head", false));
			map.put("body", boHtmlView.getStringPart("body", false));
			map.put("content", boHtmlView.getContent());

		} catch (Exception e) {
			map.put("errMsg", e.toString());
		}

		return viewName;

	}

}
