package com.itg.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;


public class ReportMemoDAO implements
		IReportMemoDAO {

	
	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public Long getReportMemoCount(Date keyDate, String keyValue) {

		String sql = "select count(*) From ReportMemo where keyDate<=? and keyValue=? ";
		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);
		q.setParameter(0, keyDate);
		q.setParameter(1, keyValue);

		List l = q.list();
		return (Long) l.get(0);

	}

	public void deleteReportMemo(ReportMemo rm) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().delete(rm);
	}

	public ReportMemo findReportMemoById(Integer id) {
		// TODO Auto-generated method stub
		String sql = "From ReportMemo where id=? ";
		
		org.hibernate.Query query = sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter(0, id);
				
		return (ReportMemo) (query.list().get(0));

	}

	@SuppressWarnings("unchecked")
	public List<ReportMemo> getReportMemos(Date keyDate, String keyValue,
			int start, int limit) {
		// TODO Auto-generated method stub
		String sql = "From ReportMemo where keyDate<=? and keyValue=? Order By ID desc";
		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);
		q.setParameter(0, keyDate);
		q.setParameter(1, keyValue);
		q.setFirstResult(start);
		q.setMaxResults(limit);

		// List<ReportMemo> findByNamedQuery = getHibernateTemplate().find(sql,
		// new Object[]{keyDate, keyValue});
		List<ReportMemo> findByNamedQuery = q.list();
		return (List<ReportMemo>) findByNamedQuery;

	}

	public void insertReportMemo(ReportMemo rm) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(rm);
	}

	public void modifyReportMemo(ReportMemo rm) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().saveOrUpdate(rm);

	}

	public ReportMemo getLastReportMemo(Date keyDate, String keyValue) {

		List<ReportMemo> l = getReportMemos(keyDate, keyValue, 0, 1);
		if (l.size() > 0) {
			return l.get(0);
		} else {
			return null;
		}

	}

	public List<ReportMemo> getMemoInList(List<String> menuIds,
			Boolean enabled, Integer start, Integer limit, String searchToken,
			Long indicator, Long indicatorSet, String period) {

		// String sql =
		// "select new ReportMemo(r.id, r.keyValue, r.keyDate, r.memo, r.isEnabled, r.memoBy, new ArrayList<Postscript>(r.postscripts) From ReportMemo r, MenuItem m where r.keyValue = m.ID and r.keyValue in (:values) and r.memo like :memo";

		String sql = "select r From ReportMemo r, MenuItem m where r.keyValue = m.ID and r.keyValue in (:values) and r.memo like :memo ";

		if (enabled != null && indicator == 0) {
			sql = sql + " and r.isEnabled = :isEnabled ";
		}

		if (indicator != 0) {

			sql = sql + " and r.indicator.id = :indicator";
		}
		
		
		if(period != ""){
			
			sql = sql + " and r.period like :period";
		}

		if(indicatorSet!=null && indicatorSet!=0){
			
			sql = sql + " and r.indicator.indicatorSet.id = :indicatorSet";
		}		

		sql = sql + " order by r.indicator.indicatorSet.name, r.indicator.sortId , m.menuText, r.keyDate desc";

		org.hibernate.Query q =sessionFactory.getCurrentSession().createQuery(sql);
		q.setParameterList("values", menuIds);
		q.setParameter("memo", "%" + searchToken + "%");

		if (indicator != 0) {

			q.setParameter("indicator", indicator);
		}

		if(indicatorSet!=null  && indicatorSet!=0){
			
			q.setParameter("indicatorSet", indicatorSet);
		}
		
		if(period != ""){
			
			q.setParameter("period", period+"%");
		}


		if (enabled != null && indicator == 0) {
			q.setParameter("isEnabled", enabled);

		}
		q.setFirstResult(start);
		q.setMaxResults(limit);

		List<ReportMemo> findByNamedQuery = q.list();
		return (List<ReportMemo>) findByNamedQuery;

	}

	public Postscript getPostscript(Long id) {

		String sql = "From Postscript where id = :id";

		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);
		q.setParameter("id", id);

		List<Postscript> postscripts = q.list();

		if (postscripts.size() > 0) {
			return postscripts.get(0);
		} else {
			return null;
		}

	}

	public Long getMemoCountInList(List<String> menuIds, Boolean enabled,
			String searchToken, Boolean forEdit, String fullName, Long indicator, Long indicatorSet, String period) {

		String sql = "select count(*) From ReportMemo where keyValue in (:values) and memo like :memo ";

		if (enabled != null && indicator == 0) {
			sql = sql + " and isEnabled = :isEnabled";
		}
		
		if(indicator!=0){
			
			sql += " and indicator.id = :indicator ";
		}

		
		if(indicatorSet!=null  && indicatorSet!=0 ){
			
			sql += " and indicator.indicatorSet.id = :indicatorSet ";
		}
		
		
		if(period != ""){
			
			sql += " and period like :period ";
		}


		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);
		q.setParameterList("values", menuIds);

		q.setParameter("memo", "%" + searchToken + "%");
		
		

		if(indicatorSet!=null && indicatorSet!=0){
			
			q.setParameter("indicatorSet", indicatorSet);
		}

		if (enabled != null&& indicator == 0) {
			q.setParameter("isEnabled", enabled);
		}
		
		if(indicator!=0){
			
			q.setParameter("indicator", indicator);
		}
		
		if(period != ""){
			
			q.setParameter("period", period+"%");
		}


		// if (forEdit != null && forEdit) {

		// q.setParameter("memoBy", fullName);

		// }

		List<Long> findByNamedQuery = q.list();
		return findByNamedQuery.get(0);

	}

	public byte[] getReportMemoImage(Integer id) {

		String sql = "select image From ReportMemo where id = :id ";
		org.hibernate.Query q = sessionFactory.getCurrentSession().createQuery(sql);

		q.setParameter("id", id);

		List<Object> findByNamedQuery = q.list();
		return (byte[]) findByNamedQuery.get(0);

	}

}
