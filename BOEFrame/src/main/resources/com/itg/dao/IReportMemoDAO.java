package com.itg.dao;

import java.util.Date;
import java.util.List;

public interface IReportMemoDAO {

	public void insertReportMemo(ReportMemo rm);

	public List<ReportMemo> getReportMemos(Date keyDate, String keyValue,
			int start, int limit);

	public Long getReportMemoCount(Date keyDate, String keyValue);

	public void modifyReportMemo(ReportMemo rm);

	public void deleteReportMemo(ReportMemo rm);

	public ReportMemo findReportMemoById(Integer id);

	public ReportMemo getLastReportMemo(Date keyDate, String keyValue);

	public List<ReportMemo> getMemoInList(List<String> menuIds, Boolean b,
			Integer start, Integer limit, String searchToken, Long indicator, List<Long> indicatorSets, String period);

	public Long getMemoCountInList(List<String> menuIds, Boolean enabled,
			String memo, Boolean forEdit, String fullName, Long indicator, List<Long> indicatorSets, String period);

	public byte[] getReportMemoImage(Integer id);

	public Postscript getPostscript(Long id);

}
