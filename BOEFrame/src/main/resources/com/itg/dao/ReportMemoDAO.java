package com.itg.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class ReportMemoDAO extends HibernateDaoSupport implements
		IReportMemoDAO {

	public Long getReportMemoCount(Date keyDate, String keyValue) {

		String sql = "select count(*) From ReportMemo where keyDate<=? and keyValue=? ";
		org.hibernate.Query q = getSession().createQuery(sql);
		q.setParameter(0, keyDate);
		q.setParameter(1, keyValue);

		List l = q.list();
		return (Long) l.get(0);

	}

	public void deleteReportMemo(ReportMemo rm) {
		// TODO Auto-generated method stub
		getHibernateTemplate().delete(rm);
	}

	public ReportMemo findReportMemoById(Integer id) {
		// TODO Auto-generated method stub
		String sql = "From ReportMemo where id=? ";
		return (ReportMemo) getHibernateTemplate().find(sql,
				new Object[] { id }).get(0);

	}

	@SuppressWarnings("unchecked")
	public List<ReportMemo> getReportMemos(Date keyDate, String keyValue,
			int start, int limit) {
		// TODO Auto-generated method stub
		String sql = "From ReportMemo where keyDate<=? and keyValue=? Order By ID desc";
		org.hibernate.Query q = getSession().createQuery(sql);
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
		getHibernateTemplate().save(rm);
	}

	public void modifyReportMemo(ReportMemo rm) {
		// TODO Auto-generated method stub
		getHibernateTemplate().saveOrUpdate(rm);

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
			Boolean enabled, Integer start, Integer limit) {

		String sql = "select new ReportMemo(id, keyValue, keyDate, memo, isEnabled) From ReportMemo where keyValue in (:values) ";

		if (enabled != null) {
			sql = sql + " and isEnabled = :isEnabled ";

		}

		sql = sql + " order by KeyValue ";

		org.hibernate.Query q = getSession().createQuery(sql);
		q.setParameterList("values", menuIds);

		if (enabled != null) {
			q.setParameter("isEnabled", enabled);

		}
		q.setFirstResult(start);
		q.setMaxResults(limit);

		List<ReportMemo> findByNamedQuery = q.list();
		return (List<ReportMemo>) findByNamedQuery;

	}

	public Long getMemoCountInList(List<String> menuIds, Boolean enabled) {

		String sql = "select count(*) From ReportMemo where keyValue in (:values) ";

		if (enabled != null) {
			sql = sql + " and isEnabled = :isEnabled";
		}

		// sql = sql + " Order By ID desc";

		org.hibernate.Query q = getSession().createQuery(sql);
		q.setParameterList("values", menuIds);

		if (enabled != null) {
			q.setParameter("isEnabled", enabled);
		}

		List<Long> findByNamedQuery = q.list();
		return findByNamedQuery.get(0);

	}

	public byte[] getReportMemoImage(Integer id) {

		String sql = "select image From ReportMemo where id = :id ";
		org.hibernate.Query q = getSession().createQuery(sql);

		q.setParameter("id", id);

		List<Object> findByNamedQuery = q.list();
		return (byte[]) findByNamedQuery.get(0);

	}

}
