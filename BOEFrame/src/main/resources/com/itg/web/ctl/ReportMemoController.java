package com.itg.web.ctl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.directory.ldap.client.api.LdapConnection;
import org.apache.directory.ldap.client.api.LdapNetworkConnection;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.itg.dao.IIndicatorDAO;
import com.itg.dao.IIndicatorSetDAO;
import com.itg.dao.IMenuItemDAO;
import com.itg.dao.IReportMemoDAO;
import com.itg.dao.IRolesDAO;
import com.itg.dao.IUserRolesDAO;
import com.itg.dao.Indicator;
import com.itg.dao.IndicatorSet;
import com.itg.dao.Postscript;
import com.itg.dao.ReportMemo;
import com.itg.dao.UserRole;
import com.itg.dao.MenuItem;
import com.itg.security.BOELogon;

@Controller
@SessionAttributes({ "entrpriseSession", "token", "userName" })
@RequestMapping("/reportMemo.do")
public class ReportMemoController {
	private String viewName;
	private final String resultOnly = "resultOnly";

	private IUserRolesDAO userRolesDAO;
	private IRolesDAO rolesDAO;
	private IMenuItemDAO menuItemDAO;
	private IIndicatorDAO indicatorDAO;
	private IIndicatorSetDAO indicatorSetDAO;

	public IIndicatorSetDAO getIndicatorSetDAO() {
		return indicatorSetDAO;
	}

	public void setIndicatorSetDAO(IIndicatorSetDAO indicatorSetDAO) {
		this.indicatorSetDAO = indicatorSetDAO;
	}

	public IIndicatorDAO getIndicatorDAO() {
		return indicatorDAO;
	}

	public void setIndicatorDAO(IIndicatorDAO indicatorDAO) {
		this.indicatorDAO = indicatorDAO;
	}

	public IMenuItemDAO getMenuItemDAO() {
		return menuItemDAO;
	}

	public void setMenuItemDAO(IMenuItemDAO menuItemDAO) {
		this.menuItemDAO = menuItemDAO;
	}

	private IReportMemoDAO reportMemoDAO;

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

	public IReportMemoDAO getReportMemoDAO() {
		return reportMemoDAO;
	}

	public void setReportMemoDAO(IReportMemoDAO reportMemoDAO) {
		this.reportMemoDAO = reportMemoDAO;
	}

	@RequestMapping(params = "method=getLastMemo")
	public String getLastReportMemo(
			ModelMap map,
			@RequestParam(value = "keyValue", required = false) String keyValue,
			HttpServletRequest request) {

		ReportMemo reportMemo = reportMemoDAO.getLastReportMemo(new Date(),
				keyValue);
		ArrayList<ReportMemo> memos = new ArrayList<ReportMemo>();
		memos.add(reportMemo);
		map.put("result", memos);

		return "resultOnly";

	}
	
	@RequestMapping(params = "method=getPeriods")
	public String getPeriods(
			ModelMap map,
			HttpServletRequest request) {

		List<String> periods = reportMemoDAO.getPeriods(13);
		List<String> periods2 = new ArrayList<String>(); 
		for(String period:periods){
			
			periods2.add("\""+period+"\"");
		}
		map.put("result", periods2);

		return "resultOnly";

	}
	
	
	private List<Long> getAuthIndicator(HttpServletRequest request, Long indicatorSet){
		
		
		List<Long> indicatorSets = new ArrayList<Long>();
		List<Long> toChecks = new ArrayList<Long>();
		

		if(indicatorSet!=null&&indicatorSet!=0){
			toChecks.add(indicatorSet);
		}else{
			
			List<IndicatorSet> set =  indicatorSetDAO.getAll(0, 9999);
			for(IndicatorSet item:set){
				toChecks.add(item.getId());
			}
		}
		
		
		for(Long id:toChecks){
			
			
			boolean hasAuth = checkHasAuthValue(request, "INDICATORSET", id.toString());
			if(hasAuth){
				
				indicatorSets.add(id);
				
			}else{
				
				indicatorSets.add(-9999L);
			}
		}
		
		
		return indicatorSets;
		
		
		
		
		
		
	}

	@RequestMapping(params = "method=getMemoList")
	public String getReportMemos(
			ModelMap map,
			@RequestParam("node") Integer parentNode,
			@RequestParam(value = "enabled", required = false) String enabled,
			@RequestParam(value = "searchToken", required = false) String searchToken,
			@RequestParam(value = "start", required = false) Integer start,
			@RequestParam(value = "limit", required = false) Integer limit,
			@RequestParam(value = "forEdit", required = false) Boolean forEdit,
			@RequestParam(value = "indicator", required = false) Long indicator,
			@RequestParam(value = "indicatorSet", required = false) Long indicatorSet,
			@RequestParam(value = "period", required = false) String period,
			HttpServletRequest request) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		List<MenuItem> menus = getAuthMenu(parentNode, request);
		List<String> menuIds = new ArrayList<String>();

		HttpSession session = request.getSession(false);

		String fullName = (String) session.getAttribute("full_name");

		for (MenuItem m : menus) {

			if(m.getID()==931){
				
				if(checkHasAuthValue(request, "ZBIZ_GRP", "8000")){
					
					menuIds.add(String.valueOf(m.getID()));
				}
				
				
			}else{
				menuIds.add(String.valueOf(m.getID()));
			}
		}

		if (limit == null || limit == 0) {
			limit = 1000000;
		}
		if (indicator == null) {

			indicator = 0L;
		}
		if (indicator != 0) {

			limit = 12;
		}

		if (start == null) {
			start = 0;
		}

		Boolean isEnabled = null;
		if (enabled != null) {

			isEnabled = enabled.equals("true");
		}

		if (searchToken == null) {
			searchToken = "";
		}
		
		
		if(period==null){
			period = "";
		}
		
		List<Long> indicatorSets = getAuthIndicator(request, indicatorSet);

		List<ReportMemo> memos = reportMemoDAO.getMemoInList(menuIds,
				isEnabled, start, limit, searchToken, indicator, indicatorSets, period);

		Long count = reportMemoDAO.getMemoCountInList(menuIds, isEnabled,
				searchToken, forEdit, fullName, indicator, indicatorSets, period);

		ArrayList<Map> result = new ArrayList<Map>();
		for (ReportMemo memo : memos) {

			// if (memo.getKeyValue().equals("913")) {

			// if (!checkHasAuthValue(request, "PRCTR_AA", "1000")) {
			// continue;
			// }

			// }

			Map<String, Object> m = new HashMap<String, Object>();
			m.put("id", memo.getId());
			m.put("memo", memo.getMemo());
			m.put("keyValue", memo.getKeyValue());
			m.put("isEnabled", memo.getIsEnabled());
			m.put("keyDate", sdf.format(memo.getKeyDate()));
			m.put("memoBy", memo.getMemoBy());
			m.put("period", memo.getPeriod());
			m.put("indicator", memo.getIndicator().getId());

			List<Map> postscripts = new ArrayList<Map>();
			
			
			List<Postscript> postscripts2 = new ArrayList<Postscript>();//reportMemoDAO.getPostscripts(memo.getId())
			for (Postscript p : postscripts2 ) {
				Map postscriptMap = new HashMap<String, Object>();
				postscriptMap.put("id", p.getId());
				postscriptMap.put("fileName", p.getFileName());
				postscripts.add(postscriptMap);

			}
			m.put("postscripts", postscripts);

			MenuItem menu = findMenu(menus, Integer.valueOf(memo.getKeyValue()));

			if (menu != null) {

				m.put("menuText", menu.getMenuText());
			}

			result.add(m);
		}

		JSONObject json = new JSONObject();
		json.put("total", count);
		json.put("rows", result);

		map.put("menu_json", json);
		return "BOEFrame";
	}

	private MenuItem findMenu(List<MenuItem> menus, int menuId) {

		for (MenuItem menu : menus) {

			if (menu.getID() == menuId) {

				return menu;
			}
		}

		return null;
	}

	private List<String> getUserRoles(HttpServletRequest request) {

		ArrayList al = new ArrayList();
		String userName = request.getUserPrincipal().getName();

		Pattern pp = Pattern.compile("CN=(\\w+)");

		Matcher matcher = pp.matcher(userName);

		List<UserRole> urs = userRolesDAO.findRolesByID(userName);

		List<String> roles = new ArrayList<String>();

		for (int i = 0; i < urs.size(); i++) {
			roles.add(urs.get(i).getRole());

		}

		return roles;

	};

	public List<MenuItem> getAuthMenu(Integer parentNode,
			HttpServletRequest request) {

		// map是用来设置View层数据的
		MenuItem parent = menuItemDAO.selectMenuItemByID(parentNode);

		List<MenuItem> l = menuItemDAO.selectMenuItem(parent);

		List<String> roles = getUserRoles(request);
		List<String> authValue = new ArrayList<String>();
		List<MenuItem> menus = new ArrayList<MenuItem>();

		for (int i = 0; i < l.size(); i++) {

			authValue.clear();
			authValue.add(String.valueOf(l.get(i).getID()));

			if (l.get(i).isLeaf()) {

				List<String> menuList = rolesDAO.findAuthValue(roles, "MENUS",
						authValue);

				if (menuList.size() == 0) {
					continue;
				}
			}

			menus.add(l.get(i));

		}

		return menus;

	}

	public boolean checkHasAuthValue(HttpServletRequest request,
			String authObject, String authValue) {

		List<String> roles = getUserRoles(request);
		List<String> authValues = new ArrayList<String>();
		authValues.add(authValue);

		List<String> values = rolesDAO.findAuthValue(roles, authObject,
				authValues);

		boolean result = false;
		if (values.size() > 0) {

			result = true;
		}

		return result;

	}

	@RequestMapping(params = "method=getPostscript")
	public void getReportMemoPostscript(@RequestParam(value = "id") Long id,
			HttpServletResponse response) throws IOException {

		Postscript p = reportMemoDAO.getPostscript(id);
		byte[] data = p.getPostFile();

		// response.setContentType(p.getContentType());

		response.setContentType("application/download");

		response.setHeader("Cache-Control", "public");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Description", "File Transfer");
		response.setHeader("Content-Disposition", "attachment; filename=\""
				+ URLEncoder.encode(p.getFileName(), "utf-8") + "\"");

		// response.setHeader("Content-Transfer-Encoding", "binary");
		// response.setHeader("Content-Type", "binary/octet-stream");

		// get your file as InputStream
		InputStream is = new ByteArrayInputStream(data);
		// copy it to response's OutputStream
		org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
		response.flushBuffer();

	}

	@RequestMapping(params = "method=getImage")
	public void getReportMemoImage(
			@RequestParam(value = "reportMemoId") Integer id,
			HttpServletResponse response) throws IOException {

		byte[] data = reportMemoDAO.getReportMemoImage(id);

		response.setContentType("Image");
		// get your file as InputStream
		InputStream is = new ByteArrayInputStream(data);
		// copy it to response's OutputStream
		org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
		response.flushBuffer();

	}

	@RequestMapping(params = "method=deleteMemo")
	public String deleteReportMemo(ModelMap map,
			@RequestParam(value = "id", required = false) Integer id,
			HttpServletRequest request) {

		ReportMemo reportMemo = reportMemoDAO.findReportMemoById(id);

		reportMemoDAO.deleteReportMemo(reportMemo);

		JSONObject json = new JSONObject();
		json.put("result", "success");

		map.put("menu_json", json);

		return "BOEFrame";

	}

	@RequestMapping(params = "method=addMemo")
	public String saveReportMemo(
			ModelMap map,
			@RequestParam(value = "picFile", required = false) CommonsMultipartFile picFile,
			@RequestParam(value = "postscriptFiles", required = false) CommonsMultipartFile[] postscriptFiles,
			@RequestParam(value = "clearPostscript", required = false) Boolean clearPostscript,
			@RequestParam(value = "keyValue", required = false) String keyValue,
			@RequestParam(value = "id", required = false) Integer id,
			@RequestParam(value = "keyDate", required = false) Date keyDate,
			@RequestParam(value = "isEnabled", required = false) Boolean isEnabled,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "period", required = false) String period,
			@RequestParam(value = "indicator", required = false) Long indicator,
			HttpServletRequest request

	) {

		ReportMemo reportMemo = null;
		if (id != null) {

			reportMemo = reportMemoDAO.findReportMemoById(id);

		}

		if ((reportMemo == null)) {

			reportMemo = new ReportMemo();

		}

		if (clearPostscript) {

			reportMemo.getPostscripts().clear();
		}

		MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
		multiRequest.getFileMap();
		Iterator iterator = multiRequest.getFileNames();

		while (iterator.hasNext()) {

			String filename = (String) iterator.next();
			MultipartFile filePart = multiRequest.getFile(filename);
			if ((filePart.getName().matches("postscriptFiles_\\d\\d\\d") || filePart
					.getName().equals("postscriptFiles"))
					&& filePart.getSize() > 0) {

				Postscript postscript = new Postscript();
				postscript.setFileName(filePart.getOriginalFilename());
				postscript.setContentType(filePart.getContentType());
				try {
					postscript.setPostFile(filePart.getBytes());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				reportMemo.getPostscripts().add(postscript);
			}

		}

		reportMemo.setKeyDate(keyDate);
		reportMemo.setKeyValue(keyValue);
		reportMemo.setPeriod(period);
		Indicator indicator2 = indicatorDAO.findById(indicator);

		reportMemo.setIndicator(indicator2);

		reportMemo.setIsEnabled(isEnabled);
		reportMemo.setMemo(memo);
		if (picFile.getSize() != 0) {
			reportMemo.setImage(picFile.getBytes());
		}

		HttpSession session = request.getSession(false);

		reportMemo.setMemoBy((String) session.getAttribute("full_name"));

		reportMemoDAO.modifyReportMemo(reportMemo);

		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setExcludes(new String[] { "handler",
				"hibernateLazyInitializer" });
		JSONObject json = new JSONObject();

		json.put("result", "success");
		json.element("data", reportMemo, jsonConfig);

		map.put("menu_json", json);

		return "BOEFrame";

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(params = "method=getView")
	public String view(ModelMap map, String keyValue, String keyDate,
			HttpServletRequest request, HttpServletResponse response) {

		List<UserRole> urs = userRolesDAO.findRolesByID(request
				.getUserPrincipal().getName());

		List<String> authValue = new ArrayList();
		List<String> roles = new ArrayList();

		for (int i = 0; i < urs.size(); i++) {
			roles.add(urs.get(i).getRole());

		}

		authValue.add("1");

		List<String> l = rolesDAO.findAuthValue(roles, "WriteMemo", authValue);

		map.put("p_readOnly", !(l.size() > 0));

		String errMsg = null;
		map.put("userName", request.getUserPrincipal().getName());
		map.put("keyValue", keyValue);
		map.put("keyDate", keyDate);

		return viewName;

	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(
				dateFormat, false));
	}

}
