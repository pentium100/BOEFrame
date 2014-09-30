package com.itg.web.ctl;

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

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
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

	@RequestMapping(params = "method=addMemo")
	public String saveReportMemo(
			ModelMap map,
			@RequestParam(value = "picFile", required = false) CommonsMultipartFile picFile,
			@RequestParam(value = "keyValue", required = false) String keyValue,
			@RequestParam(value = "keyDate", required = false) Date keyDate,
			@RequestParam(value = "isEnabled", required = false) Boolean isEnabled,
			@RequestParam(value = "memo", required = false) String memo,
			HttpServletRequest request

	) {

		ReportMemo reportMemo = reportMemoDAO.getLastReportMemo(keyDate,
				keyValue);

		if ((reportMemo != null) && (reportMemo.getKeyDate().equals(keyDate))) {

		} else {
			reportMemo = new ReportMemo();
			reportMemo.setKeyDate(keyDate);
			reportMemo.setKeyValue(keyValue);

		}

		reportMemo.setIsEnabled(isEnabled);
		reportMemo.setMemo(memo);
		reportMemo.setImage(picFile.getBytes());

		reportMemoDAO.modifyReportMemo(reportMemo);

		map.put("result", "{result:'success'}");
		return "resultOnly";

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

}
