package com.itg.web.ctl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.itg.dao.IIndicatorSetDAO;
import com.itg.dao.Indicator;
import com.itg.dao.IndicatorSet;
import com.itg.dao.MenuItem;



@Controller
@RequestMapping(value = "/indicatorSets.do")
public class IndicatorSetController {
	
	private IIndicatorSetDAO indicatorSetDAO;
	
	
	
	public IIndicatorSetDAO getIndicatorSetDAO() {
		return indicatorSetDAO;
	}



	public void setIndicatorSetDAO(IIndicatorSetDAO indicatorSetDAO) {
		this.indicatorSetDAO = indicatorSetDAO;
	}



	@RequestMapping(method = RequestMethod.GET)
	public String getAll(ModelMap map,
			@RequestParam(value = "offset", required = false) Integer start,
			@RequestParam(value = "limit", required = false) Integer limit,
			HttpServletRequest request) {

		if (start == null) {
			start = 0;
		}

		if (limit == null) {

			limit = 9999999;
		}


		List<IndicatorSet> indiactorSets = indicatorSetDAO.getAll(start, limit);
		Long count = indicatorSetDAO.getCount();

		JSONObject json = new JSONObject();
		json.put("total", count);

		JSONArray jsonArray = new JSONArray();
		for (IndicatorSet indicatorSet : indiactorSets) {

			JSONObject indicatorJson = new JSONObject();
			indicatorJson.put("id", indicatorSet.getId());
			indicatorJson.put("name", indicatorSet.getName());
			jsonArray.add(indicatorJson);

		}

		json.put("rows", jsonArray);

		map.put("menu_json", json);
		return "BOEFrame";

	}

	

}
