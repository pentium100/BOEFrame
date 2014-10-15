package com.itg.web.ctl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.itg.dao.IMenuItemDAO;
import com.itg.dao.IReportMemoDAO;
import com.itg.dao.IRolesDAO;
import com.itg.dao.IUserRolesDAO;
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

	@RequestMapping(params = "method=getMemoList")
	public String getReportMemos(ModelMap map,
			@RequestParam("node") Integer parentNode,
			@RequestParam(value = "enabled", required = false) String enabled,
			@RequestParam(value = "start", required = false) Integer start,
			@RequestParam(value = "limit", required = false) Integer limit,
			HttpServletRequest request) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		List<MenuItem> menus = getAuthMenu(parentNode, request);
		List<String> menuIds = new ArrayList<String>();
		for (MenuItem m : menus) {

			menuIds.add(String.valueOf(m.getID()));
		}

		if (limit == null || limit == 0) {
			limit = 1000000;
		}

		if (start == null) {
			start = 0;
		}

		Boolean isEnabled = null;
		if (enabled != null) {

			isEnabled = enabled.equals("true");
		}

		List<ReportMemo> memos = reportMemoDAO.getMemoInList(menuIds,
				isEnabled, start, limit);

		Long count = reportMemoDAO.getMemoCountInList(menuIds, isEnabled);

		ArrayList<Map> result = new ArrayList<Map>();
		for (ReportMemo memo : memos) {
			Map m = new HashMap();
			m.put("id", memo.getId());
			m.put("memo", memo.getMemo());
			m.put("keyValue", memo.getKeyValue());
			m.put("isEnabled", memo.getIsEnabled());
			m.put("keyDate", sdf.format(memo.getKeyDate()));
			m.put("memoBy", memo.getMemoBy());

			MenuItem menu = findMenu(menus, Integer.valueOf(memo.getKeyValue()));

			if (menu != null) {

				m.put("menuText", menu.getMenuText());
			}

			result.add(m);
		}

		JSONObject json = new JSONObject();
		json.put("total", count);
		json.put("rows", result);

		// JSONArray json = JSONArray.fromObject(jsonResult);

		// map.put("menuList", json);

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

	private List<MenuItem> getAuthMenu(Integer parentNode,
			HttpServletRequest request) {

		// map是用来设置View层数据的
		MenuItem parent = menuItemDAO.selectMenuItemByID(parentNode);

		List<MenuItem> l = menuItemDAO.selectMenuItem(parent);

		List<MenuItem> menus = new ArrayList<MenuItem>();

		ArrayList al = new ArrayList();
		String userName = request.getUserPrincipal().getName();

		Pattern pp = Pattern.compile("CN=(\\w+)");

		Matcher matcher = pp.matcher(userName);

		List<UserRole> urs = userRolesDAO.findRolesByID(userName);

		List<String> authValue = new ArrayList<String>();
		List<String> roles = new ArrayList<String>();

		for (int i = 0; i < urs.size(); i++) {
			roles.add(urs.get(i).getRole());

		}

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
			@RequestParam(value = "keyValue", required = false) String keyValue,
			@RequestParam(value = "id", required = false) Integer id,
			@RequestParam(value = "keyDate", required = false) Date keyDate,
			@RequestParam(value = "isEnabled", required = false) Boolean isEnabled,
			@RequestParam(value = "memo", required = false) String memo,
			HttpServletRequest request

	) {

		ReportMemo reportMemo = null;
		if (id != null) {

			reportMemo = reportMemoDAO.findReportMemoById(id);
		}

		if ((reportMemo == null)) {

			reportMemo = new ReportMemo();
			reportMemo.setKeyDate(keyDate);
			reportMemo.setKeyValue(keyValue);

		}

		reportMemo.setIsEnabled(isEnabled);
		reportMemo.setMemo(memo);
		if (picFile.getSize() != 0) {
			reportMemo.setImage(picFile.getBytes());
		}

		HttpSession session = request.getSession(false);
		reportMemo.setMemoBy((String) session.getAttribute("full_name"));

		reportMemoDAO.modifyReportMemo(reportMemo);

		JSONObject json = new JSONObject();
		json.put("result", "success");
		json.put("data", reportMemo);

		// JSONArray json = JSONArray.fromObject(jsonResult);

		// map.put("menuList", json);

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
