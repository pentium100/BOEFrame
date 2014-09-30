package com.itg.restful;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.itg.dao.IReportMemoDAO;
import com.itg.dao.ReportMemo;
import com.itg.dao.ResponseReportMemo;


public class ReportMemosResource implements IReportMemosResource {

	private IReportMemoDAO reportMemoDAO;

	public IReportMemoDAO getReportMemoDAO() {
		return reportMemoDAO;
	}

	public void setReportMemoDAO(IReportMemoDAO reportMemoDAO) {
		this.reportMemoDAO = reportMemoDAO;
	}

	/* (non-Javadoc)
	 * @see com.itg.restful.IReportMemosResource#getReportMemos(java.lang.String, int, int)
	 */

	public Response getReportMemos( String reportKey, String reportKeyDate,
			int start, int limit) {
		ResponseReportMemo r = new ResponseReportMemo();
		try {
			
			Date keyDate = new SimpleDateFormat("yyyyMMdd").parse(reportKeyDate);

			List<ReportMemo> l = reportMemoDAO.getReportMemos(keyDate,
					reportKey, start, limit);
			
			if (l.size()==1){
				l.add(new ReportMemo());
			}
			
			
			r.setSuccess(true);
			r.setMessage("");
			r.setReportMemo(l);
			r.setTotal(reportMemoDAO.getReportMemoCount(keyDate,reportKey));
			
		} catch (Exception e) {

			r.setSuccess(false);
			r.setMessage("记录读取失败:" + e.getMessage());
			System.out.println(e);

		}

		return Response.ok(r).build();

	}

	/* (non-Javadoc)
	 * @see com.itg.restful.IReportMemosResource#addReportMemo(com.itg.dao.ReportMemo)
	 */
	
	public Response addReportMemo(ReportMemo reportMemo) throws JSONException {

		ResponseReportMemo r = new ResponseReportMemo();
		try {

			reportMemoDAO.insertReportMemo(reportMemo);
			r.setSuccess(true);
			r.setMessage("记录已新建!");
			List l = new ArrayList();
			l.add(reportMemo);
			r.setReportMemo(l);

		} catch (Exception e) {

			r.setSuccess(false);
			r.setMessage("记录创建失败:" + e.getMessage());
			List l = new ArrayList();
			l.add(reportMemo);
			r.setReportMemo(l);
			System.out.println(e);

		}
		// return r;
		return Response.ok(r).build();

		// reportMemoDAO.insertReportMemo(response.getReportMemo());
		// return Response.ok(response.getReportMemo()).build();

	}

	/* (non-Javadoc)
	 * @see com.itg.restful.IReportMemosResource#deleteReportMemo(java.lang.Integer)
	 */
	public String deleteReportMemo(
			Integer reportMemoId
			)
			throws JSONException {
		JSONObject j = new JSONObject();		
		//Integer reportMemoId = 111;
		if (reportMemoId ==0){

			j.put("success", true);
			j.put("message", "");
			return j.toString();
			
			
		}

 
		try {
			ReportMemo reportMemo = reportMemoDAO
					.findReportMemoById(reportMemoId);
			reportMemoDAO.deleteReportMemo(reportMemo);
			j.put("success", true);
			j.put("message", "记录已删除!");

		} catch (Exception e) {
			j.put("success", false);
			j.put("message", e.getMessage());
			System.out.println(e);

		}
		return j.toString();

	}

	/* (non-Javadoc)
	 * @see com.itg.restful.IReportMemosResource#updateReportMemo(com.itg.dao.ReportMemo)
	 */
	public String updateReportMemo(ReportMemo reportMemo) throws JSONException {

		JSONObject j = new JSONObject();
		try {
			reportMemoDAO.modifyReportMemo(reportMemo);
			j.put("success", true);
			j.put("message", "记录已更改!");
		} catch (Exception e) {
			j.put("success", false);
			j.put("message", e.getMessage());
			System.out.println(e);
		}

		return j.toString();
		// return Response.ok(j).build();

		// reportMemoDAO.modifyReportMemo(request.getReportMemo());
		// Response response = Response.ok(request.getReportMemo()).build();

	}

	public ReportMemo getLastReportMemo(Date keyDate, String keyValue) {
		
		return reportMemoDAO.getLastReportMemo(keyDate, keyValue);
		
		
	
	}

}