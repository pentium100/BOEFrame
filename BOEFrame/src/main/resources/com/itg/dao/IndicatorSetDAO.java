package com.itg.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;

public class IndicatorSetDAO implements IIndicatorSetDAO{

	
    private SessionFactory sessionFactory;
    
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	
	public void insertIndicatorSet(IndicatorSet indicatorSet) {
		sessionFactory.getCurrentSession().saveOrUpdate(indicatorSet);
		
	}

	public void modifyIndicatorSet(IndicatorSet indicatorSet) {
		sessionFactory.getCurrentSession().saveOrUpdate(indicatorSet);
		
	}

	public void deleteIndicator(IndicatorSet indicatorSet) {

		sessionFactory.getCurrentSession().delete(indicatorSet);
	}

	public List<IndicatorSet> getAll(Integer start, Integer limit
			) {

		String sql = "from IndicatorSet ";


		sql = sql + " order by id ";

		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);


		q.setFirstResult(start);
		q.setMaxResults(limit);

		List<IndicatorSet> findByNamedQuery = q.list();
		return (List<IndicatorSet>) findByNamedQuery;
	}

	public Long getCount() {
		
		String sql = "select count(*) From IndicatorSet ";

		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);


		List l = q.list();
		return (Long) l.get(0);
	}

	public IndicatorSet findById(Long id) {
		String sql = "From IndicatorSet where ID=? ";
		Query query = sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter(0, id);
		List<IndicatorSet> findByNamedQuery = query.list();
		
		
		
		if (findByNamedQuery.size() > 0) {
			return findByNamedQuery.get(0);
		} else {
			return null;
		}
		
	
	}
	
	
	

}
