package com.itg.dao;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class IndicatorDAO extends HibernateDaoSupport implements IIndicatorDAO {

	public void insertIndicator(Indicator indiactor) {
		getHibernateTemplate().saveOrUpdate(indiactor);

	}

	public void modifyIndicator(Indicator indiactor) {
		getHibernateTemplate().saveOrUpdate(indiactor);

	}

	public void deleteIndicator(Indicator indiactor) {
		getHibernateTemplate().delete(indiactor);

	}

	public List<Indicator> getAll(Integer start, Integer limit,
			List<Integer> menuIds) {
		String sql = "from Indicator ";

		if (menuIds.size() > 0) {

			sql = sql + " where menu.id in  (:menus) ";

		}

		sql = sql + " order by menu.menuText ";

		org.hibernate.Query q = getSession().createQuery(sql);

		if (menuIds.size() > 0) {

			q.setParameterList("menus", menuIds);
		}

		q.setFirstResult(start);
		q.setMaxResults(limit);

		List<Indicator> findByNamedQuery = q.list();
		return (List<Indicator>) findByNamedQuery;
	}

	public Long getCount(List<Integer> menuIds) {

		String sql = "select count(*) From Indicator ";

		if (menuIds.size() > 0) {

			sql += " where menu.id in (:menus) ";

		}
		org.hibernate.Query q = getSession().createQuery(sql);

		if (menuIds.size() > 0) {

			q.setParameterList("menus", menuIds);

		}

		List l = q.list();
		return (Long) l.get(0);

	}

	public Indicator findById(Long id) {

		String sql = "From Indicator where ID=? Order By ID";
		List<Indicator> findByNamedQuery = getHibernateTemplate().find(sql,
				new Object[] { id });
		if (findByNamedQuery.size() > 0) {
			return findByNamedQuery.get(0);
		} else {
			return null;
		}
	}

}
