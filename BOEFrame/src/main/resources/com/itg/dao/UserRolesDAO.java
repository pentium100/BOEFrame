package com.itg.dao;

import java.util.List;



import org.hibernate.Query;
import org.hibernate.SessionFactory;


public class UserRolesDAO   implements IUserRolesDAO{
	
	
	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public void insertUserRole(UserRole userRole) {
		
		sessionFactory.getCurrentSession().saveOrUpdate(userRole);
	}
    public List<UserRole> findRolesByID(String userName) {
    	
        String sql="From UserRole where userName=?";
       
        Query query = sessionFactory.getCurrentSession().createQuery(sql);
        query.setParameter(0, userName);
        List<UserRole> findByNamedQuery = query.list();
        
        return findByNamedQuery;
        
		
	}
}
