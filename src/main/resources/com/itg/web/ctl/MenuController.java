package com.itg.web.ctl;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import org.springframework.ui.ModelMap;

import org.springframework.web.bind.annotation.RequestMapping;

import com.itg.dao.IMenuItemDAO;

import com.itg.dao.MenuItem;

@Controller
public class MenuController {
	private String viewName;


	private IMenuItemDAO menuItemDAO;

    

//��ascweb-servlet.xml�����õ�,�������Ѿ���ע��userDAOProxy�ӿ���

    public IMenuItemDAO getMenuItemDAO() {

         return menuItemDAO;

    }

    public void setMenuItemDAO(IMenuItemDAO menuItemDAO) {

         this.menuItemDAO = menuItemDAO;

    }

    public String getViewName() {

         return viewName;

    }

    public void setViewName(String viewName) {

         this.viewName = viewName;

    }

    

//ע����urlӳ��

    @SuppressWarnings("unchecked")
    @RequestMapping("/getMenu.do") 
    public String index(ModelMap map,HttpServletRequest request,HttpServletResponse response) {

         // map����������View�����ݵ�
     	 MenuItem parent = menuItemDAO.selectMenuItemByID(Integer.parseInt(request.getParameter("node")));
     	 
     	 

         List<MenuItem> l = menuItemDAO.selectMenuItem(parent);
         
         
         ArrayList al = new ArrayList();
         
         for(int i=0; i<l.size();i++){
        	 Map m = new HashMap();
        	 
        	 m.put("text", l.get(i).getMenuText());
        	 m.put("leaf", l.get(i).isLeaf());
        	 
        	 if (l.get(i).isLeaf()){
        		 m.put("cls", "file");
        	 }
        	 else
        	 {
        		 m.put("cls", "folder");
        	 }
        	  
        	 m.put("id", l.get(i).getID());
        	 m.put("reportId", l.get(i).getReportId_bo4());
        	 m.put("queryString", l.get(i).getQueryString());
        	 al.add(m);
        	 
        	 
        	 
         }
         
         JSONArray json =  JSONArray.fromObject(al);
         map.put("menuList", json);
         

         return this.viewName;  //�����Ա�ע��ֵhello��,������Ⱦ��ͼhello.jsp

    }


}
