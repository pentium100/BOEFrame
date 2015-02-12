package com.itg.web.ctl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HttpMethod;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.itg.dao.IIndicatorDAO;
import com.itg.dao.IMenuItemDAO;
import com.itg.dao.Indicator;
import com.itg.dao.MenuItem;

@Controller
@RequestMapping(value = "/indicators.do")
public class IndicatorController {

	private String viewName;

	private IMenuItemDAO menuItemDAO;

	public String getViewName() {
		return viewName;
	}

	public void setViewName(String viewName) {
		this.viewName = viewName;
	}

	public IMenuItemDAO getMenuItemDAO() {
		return menuItemDAO;
	}

	public void setMenuItemDAO(IMenuItemDAO menuItemDAO) {
		this.menuItemDAO = menuItemDAO;
	}

	public IIndicatorDAO getIndicatorDAO() {
		return indicatorDAO;
	}

	public void setIndicatorDAO(IIndicatorDAO indicatorDAO) {
		this.indicatorDAO = indicatorDAO;
	}

	private IIndicatorDAO indicatorDAO;

	private ReportMemoController reportMemoController;

	public ReportMemoController getReportMemoController() {
		return reportMemoController;
	}

	public void setReportMemoController(ReportMemoController reportMemoController) {
		this.reportMemoController = reportMemoController;
	}

	@RequestMapping(method = RequestMethod.GET)
	public String getAll(ModelMap map,
			@RequestParam(value = "offset", required = false) Integer start,
			@RequestParam(value = "limit", required = false) Integer limit,
			@RequestParam(value = "menu", required = false) Integer menuId,
			HttpServletRequest request) {

		if (start == null) {
			start = 0;
		}

		if (limit == null) {

			limit = 9999999;
		}

		MenuItem menu = null;
		if (menuId != null) {

			menu = menuItemDAO.selectMenuItemByID(menuId);
		}

		List<MenuItem> menus = reportMemoController.getAuthMenu(900, request);

		List<Integer> menuIds = new ArrayList<Integer>();

		for (MenuItem item : menus) {
			if (menu != null) {
				if (menu.getID() == item.getID()) {
					menuIds.add(item.getID());

				}
			} else {
				menuIds.add(item.getID());
			}
		}

		List<Indicator> indiactors = indicatorDAO.getAll(start, limit, menuIds);
		Long count = indicatorDAO.getCount(menuIds);

		JSONObject json = new JSONObject();
		json.put("total", count);

		JSONArray jsonArray = new JSONArray();
		for (Indicator indicator : indiactors) {

			JSONObject indicatorJson = new JSONObject();
			indicatorJson.put("id", indicator.getId());
			indicatorJson.put("name", indicator.getName());
			indicatorJson.put("menuText", indicator.getMenu().getMenuText());
			indicatorJson.put("menu", indicator.getMenu().getID());
			jsonArray.add(indicatorJson);

		}

		json.put("rows", jsonArray);

		map.put("menu_json", json);
		return "BOEFrame";

	}

	@RequestMapping(method = RequestMethod.POST)
	public String create(ModelMap map,
			@RequestParam(value = "id", required = false) Long id,
			@RequestParam(value = "name") String name,
			@RequestParam(value = "menu") Long menu) {

		Indicator indicator = null;
		if (id != null && id != 0) {
			indicator = indicatorDAO.findById(id);
		} else {
			indicator = new Indicator();
		}

		indicator.setMenu(menuItemDAO.selectMenuItemByID(Integer.valueOf(menu
				.toString())));
		indicator.setName(name);
		indicatorDAO.modifyIndicator(indicator);
		JSONObject json = new JSONObject();
		json.put("result", "success");
		json.put("data", indicator);

		map.put("menu_json", json);

		return "BOEFrame";

	}

	@RequestMapping(method = RequestMethod.PUT)
	public String update(ModelMap map,
			@RequestParam(value = "indiactor") Indicator indiactor) {

		indicatorDAO.modifyIndicator(indiactor);
		JSONObject json = new JSONObject();
		json.put("result", "success");
		json.put("data", indiactor);

		map.put("menu_json", json);

		return "BOEFrame";

	}

	@RequestMapping(method = RequestMethod.DELETE)
	public String delete(ModelMap map,
			@RequestParam(value = "indiactor") Indicator indiactor) {

		indicatorDAO.deleteIndicator(indiactor);
		JSONObject json = new JSONObject();
		json.put("result", "success");
		json.put("data", indiactor);

		map.put("menu_json", json);

		return "BOEFrame";

	}

}
