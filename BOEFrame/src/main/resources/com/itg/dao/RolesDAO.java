package com.itg.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class RolesDAO extends HibernateDaoSupport implements IRolesDAO {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.itg.dao.IRolesDAO#insertRole(com.itg.dao.Role)
	 */
	public void insertRole(Role role) {

		getHibernateTemplate().saveOrUpdate(role);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.itg.dao.IRolesDAO#findRolesByRole(java.lang.String,
	 * java.lang.String)
	 */
	public List<Role> findRolesByRole(String role, String authObj) {

		String sql = "From Role where roleName=? and authObject=?";

		List<Role> findByNamedQuery = getHibernateTemplate().find(sql,
				new Object[] { role, authObj });

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
		Session s = getSession();
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
			releaseSession(s);
		}

	}

}
