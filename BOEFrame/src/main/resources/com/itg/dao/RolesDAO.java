package com.itg.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;


public class RolesDAO implements IRolesDAO {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.itg.dao.IRolesDAO#insertRole(com.itg.dao.Role)
	 */
	
	private SessionFactory sessionFactory;
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public void insertRole(Role role) {

		sessionFactory.getCurrentSession().saveOrUpdate(role);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.itg.dao.IRolesDAO#findRolesByRole(java.lang.String,
	 * java.lang.String)
	 */
	public List<Role> findRolesByRole(String role, String authObj) {

		String sql = "From Role where roleName=? and authObject=?";

		Query query = sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter(0, role);
		query.setParameter(1, authObj);
		List<Role> findByNamedQuery = query.list();

		return findByNamedQuery;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.itg.dao.IRolesDAO#findAuthValue(java.util.List,
	 * java.lang.String, java.util.List)
	 */
	@SuppressWarnings("unchecked")
	public List<String> findAuthValue(List<String> role, String authObj,
			List<String> authValue) {

		String sql = "From Role where roleName in (:roleName) and authObject=:authObject and authValue in (:authValue)";
		Session s = sessionFactory.getCurrentSession();
		try {
			Query q = s.createQuery(sql);

			q.setParameterList("roleName", role);
			q.setParameterList("authValue", authValue);
			q.setParameter("authObject", authObj);
			// List<Role> findByNamedQuery = new ArrayList();
			List<Role> findByNamedQuery = q.list();

			List<String> l = new ArrayList();

			for (int i = 0; findByNamedQuery != null
					&& i < findByNamedQuery.size(); i++) {
				l.add(findByNamedQuery.get(i).getAuthValue());
			}
			return l;
		} finally {
			//s.close();
		}

	}

}
