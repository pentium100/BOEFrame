package com.itg.web.ctl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HttpMethod;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.itg.dao.IIndicatorDAO;
import com.itg.dao.IIndicatorSetDAO;
import com.itg.dao.IMenuItemDAO;
import com.itg.dao.Indicator;
import com.itg.dao.IndicatorSet;
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
	private IIndicatorSetDAO indicatorSetDAO;

	public IIndicatorSetDAO getIndicatorSetDAO() {
		return indicatorSetDAO;
	}

	public void setIndicatorSetDAO(IIndicatorSetDAO indicatorSetDAO) {
		this.indicatorSetDAO = indicatorSetDAO;
	}

	private ReportMemoController reportMemoController;

	public ReportMemoController getReportMemoController() {
		return reportMemoController;
	}

	public void setReportMemoController(ReportMemoController reportMemoController) {
		this.reportMemoController = reportMemoController;
	}
	
	
	private List<Long> getAuthIndicator(HttpServletRequest request, Long indicatorSet){
		
		
		List<Long> indicatorSets = new ArrayList<Long>();
		List<Long> toChecks = new ArrayList<Long>();
		

		if(indicatorSet!=null){
			toChecks.add(indicatorSet);
		}else{
			
			List<IndicatorSet> set =  indicatorSetDAO.getAll(0, 9999);
			for(IndicatorSet item:set){
				toChecks.add(item.getId());
			}
		}
		
		
		for(Long id:toChecks){
			
			
			boolean hasAuth = reportMemoController.checkHasAuthValue(request, "INDICATORSET", id.toString());
			if(hasAuth){
				
				indicatorSets.add(id);
				
			}else{
				
				indicatorSets.add(-9999L);
			}
		}
		
		
		return indicatorSets;
		
		
		
		
		
		
	}

	@RequestMapping(method = RequestMethod.GET)
	public String getAll(ModelMap map,
			@RequestParam(value = "offset", required = false) Integer start,
			@RequestParam(value = "limit", required = false) Integer limit,
			@RequestParam(value = "menu", required = false) Integer menuId,
			@RequestParam(value = "indicatorSet", required = false) Long indicatorSet,
			HttpServletRequest request) {

		if (start == null) {
			start = 0;
		}

		if (limit == null) {

			limit = 9999999;
		}
		
		if(indicatorSet!=null && indicatorSet==0){
			
			indicatorSet = null;
		}
		
		
		List<Long> indicatorSets = getAuthIndicator(request, indicatorSet);

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

		List<Indicator> indiactors = indicatorDAO.getAll(start, limit, menuIds, indicatorSets);
		Long count = indicatorDAO.getCount(menuIds, indicatorSets);

		JSONObject json = new JSONObject();
		json.put("total", count);

		JSONArray jsonArray = new JSONArray();
		for (Indicator indicator : indiactors) {

			JSONObject indicatorJson = new JSONObject();
			indicatorJson.put("id", indicator.getId());
			indicatorJson.put("name", indicator.getName());
			indicatorJson.put("menuText", indicator.getMenu().getMenuText());
			indicatorJson.put("sortId", indicator.getSortId());
			indicatorJson.put("indicatorSet", indicator.getIndicatorSet()!=null?indicator.getIndicatorSet().getId():0);
			indicatorJson.put("indicatorSetName", indicator.getIndicatorSet()!=null?indicator.getIndicatorSet().getName():"");
			indicatorJson.put("menu", indicator.getMenu().getID());
			indicatorJson.put("canRedirect", indicator.getCanRedirect());
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
			@RequestParam(value = "menu") Long menu,
			@RequestParam(value = "sortId") Integer sortId,
			@RequestParam(value = "indicatorSet") Long indicatorSet,
			@RequestParam(value = "canRedirect") Boolean canRedirect) {

		Indicator indicator = null;
		if (id != null && id != 0) {
			indicator = indicatorDAO.findById(id);
		} else {
			indicator = new Indicator();
		}

		indicator.setMenu(menuItemDAO.selectMenuItemByID(Integer.valueOf(menu
				.toString())));
		indicator.setName(name);
		indicator.setSortId(sortId);
		indicator.setCanRedirect(canRedirect);
		indicator.setIndicatorSet(indicatorSetDAO.findById(indicatorSet));
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

	@RequestMapping( method = RequestMethod.POST, params = "method=delete")
	public String delete(ModelMap map,
			@RequestParam(value="id" , required=false) Integer id
			) {
		
		Indicator indicator = indicatorDAO.findById(Long.valueOf(id));
		if(indicator!=null){


			indicatorDAO.deleteIndicator(indicator);
		}
		JSONObject json = new JSONObject();
		json.put("result", "success");
		json.put("data", indicator);

		map.put("menu_json", json);

		return "BOEFrame";

	}

}
