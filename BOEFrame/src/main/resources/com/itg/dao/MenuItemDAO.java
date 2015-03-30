package com.itg.dao;

import java.util.List;




import org.hibernate.Query;
import org.hibernate.SessionFactory;


public class MenuItemDAO implements IMenuItemDAO {
	
	
	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public void insertMenuItem(MenuItem menuItem) {
		
		
		sessionFactory.getCurrentSession().saveOrUpdate(menuItem);


	}
	
	@SuppressWarnings("unchecked")
	public List<MenuItem> selectMenuItem(MenuItem parentMenuItem) {
		
        String sql="From MenuItem where parentID=? Order By ID";

        //int parentID = 0;
        Integer parentID = Integer.valueOf(0);
        
        if (parentMenuItem!=null )
        {
        	parentID = Integer.valueOf(parentMenuItem.getID());
        }
        
        Query query = sessionFactory.getCurrentSession().createQuery(sql);
        query.setParameter(0, parentID);
        List<MenuItem> findByNamedQuery = query.list();
        
        return findByNamedQuery;
	}

	public List<MenuItem> selectMenuItem(String userName,
			MenuItem parentMenuItem) {
		// TODO Auto-generated method stub
		return null;
	}

	public MenuItem selectMenuItemByID(Integer ID) {
		// TODO Auto-generated method stub
		
		String sql="From MenuItem where ID=? Order By ID";
        Query query = sessionFactory.getCurrentSession().createQuery(sql);
        query.setParameter(0, ID);

		List<MenuItem> findByNamedQuery = query.list();
		if (findByNamedQuery.size() > 0){
			return findByNamedQuery.get(0);
		}
		else{
			return null;
		}
	}

}
