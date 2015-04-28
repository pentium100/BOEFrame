package com.itg.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;



public class IndicatorDAO implements IIndicatorDAO {
	
	
    
    private SessionFactory sessionFactory;
    
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public void insertIndicator(Indicator indiactor) {
		sessionFactory.getCurrentSession().saveOrUpdate(indiactor);
		//getHibernateTemplate().saveOrUpdate(indiactor);

	}

	public void modifyIndicator(Indicator indiactor) {
		sessionFactory.getCurrentSession().saveOrUpdate(indiactor);
		//getHibernateTemplate().saveOrUpdate(indiactor);

	}

	public void deleteIndicator(Indicator indiactor) {
		//getHibernateTemplate().delete(indiactor);
		sessionFactory.getCurrentSession().delete(indiactor);

	}

	public List<Indicator> getAll(Integer start, Integer limit,
			List<Integer> menuIds, Long indicatorSet) {
		String sql = "from Indicator ";

		if (menuIds.size() > 0) {

			sql = sql + " where menu.id in  (:menus) ";

		}

		
		if (indicatorSet!=null){
			
			sql += " and indicatorSet.id = " + String.valueOf(indicatorSet) +" ";
			
		}


		sql = sql + " order by menu.menuText ";

		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);

		if (menuIds.size() > 0) {

			q.setParameterList("menus", menuIds);
		}

		q.setFirstResult(start);
		q.setMaxResults(limit);

		List<Indicator> findByNamedQuery = q.list();
		return (List<Indicator>) findByNamedQuery;
	}

	public Long getCount(List<Integer> menuIds , Long indicatorSet) {

		String sql = "select count(*) From Indicator ";

		if (menuIds.size() > 0) {

			sql += " where menu.id in (:menus)  ";

		}
		
		if (indicatorSet!=null){
			
			sql += " and indicatorSet.id = " + String.valueOf(indicatorSet) +" ";
			
		}
		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);

		if (menuIds.size() > 0) {

			q.setParameterList("menus", menuIds);

		}

		List l = q.list();
		return (Long) l.get(0);

	}

	public Indicator findById(Long id) {

		String sql = "From Indicator where ID=? Order By ID";
		Query query = sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter(0, id);
		List<Indicator> findByNamedQuery = query.list();
		
		
		
		if (findByNamedQuery.size() > 0) {
			return findByNamedQuery.get(0);
		} else {
			return null;
		}
	}

}
