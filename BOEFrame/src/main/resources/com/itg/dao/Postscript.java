package com.itg.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;


@Entity
@Table(name = "Postscript")
@XmlRootElement(name = "postscript")
public class Postscript {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	private String contentType;
	
	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public byte[] getPostFile() {
		return postFile;
	}


	public void setPostFile(byte[] postFile) {
		this.postFile = postFile;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}









	public String getContentType() {
		return contentType;
	}


	public void setContentType(String contentType) {
		this.contentType = contentType;
	}









	@Lob
	@Column(name = "postfile", length = 209715200)
	private byte[] postFile;

	
	private String fileName;
	
	
	
	
	
	
	

}
