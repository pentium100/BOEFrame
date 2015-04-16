package com.itg.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import net.sf.json.JSONObject;

@Entity
@Table(name = "ReportMemo")
@XmlRootElement(name = "reportMemo")
public class ReportMemo {

	private int id;
	private Date keyDate; // 关键日期
	private String keyValue; // 关键值
	@Column(length = 50000)
	private String memo; // 备注内容
	private String memoBy; // 备注人
	private String memoTitle; // 备注人
	private Date memoAt; // 备注时间
	
	@Column(length=7)
	private String period; // 报表期间

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	private Boolean isEnabled;
	
	
	private Indicator indicator;

	@ManyToOne
	public Indicator getIndicator() {
		return indicator;
	}

	public void setIndicator(Indicator indicator) {
		this.indicator = indicator;
	}

	private List<Postscript> postscripts;

	@OneToMany(targetEntity = Postscript.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	public List<Postscript> getPostscripts() {
		return postscripts;
	}

	public void setPostscripts(List<Postscript> postscripts) {
		this.postscripts = postscripts;
	}

	@Lob
	@Column(name = "image", length = 20971520)
	private byte[] image;

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setId(String id) {
		this.id = 0;
	}

	public Date getKeyDate() {
		return keyDate;
	}

	public void setKeyDate(Date keyDate) {
		this.keyDate = keyDate;
	}

	public String getKeyValue() {
		return keyValue;
	}

	public void setKeyValue(String keyValue) {
		this.keyValue = keyValue;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMemoBy() {
		return memoBy;
	}

	public void setMemoBy(String memoBy) {
		this.memoBy = memoBy;
	}

	public Date getMemoAt() {
		return memoAt;
	}

	public void setMemoAt(Date memoAt) {
		this.memoAt = memoAt;
	}

	public String getMemoTitle() {
		return memoTitle;
	}

	public void setMemoTitle(String memoTitle) {
		this.memoTitle = memoTitle;
	}

	public ReportMemo() {

		List<Postscript> postscripts = new ArrayList<Postscript>();
		setPostscripts(postscripts);

	}

	public ReportMemo(int id, String keyValue, Date keyDate, String memo,
			Boolean isEnabled, String memoBy, List<Postscript> postscripts) {

		this.id = id;
		this.keyDate = keyDate;
		this.keyValue = keyValue;
		this.memo = memo;
		this.isEnabled = isEnabled;
		this.memoBy = memoBy;

		this.postscripts = postscripts;
	}

	public String toJSON() {
		String s = "{";
		s += "'id':" + getId() + ",";
		s += "'keyDate':'"
				+ new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'+08:00'")
						.format(getKeyDate()) + "',";
		s += "'keyValue':'" + getKeyValue() + "',";
		s += "'memoAt':'"
				+ new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'+08:00'")
						.format(getMemoAt()) + "',";
		s += "'memoBy':'" + getMemoBy() + "',";
		s += "'memoTitle':'" + getMemoTitle() + "',";
		s += "'memo':'" + getMemo() + "'";
		s += "}";
		return s;

	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

}
