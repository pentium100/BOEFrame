package com.itg.security;

import com.crystaldecisions.sdk.exception.SDKException;
import com.crystaldecisions.sdk.framework.CrystalEnterprise;
import com.crystaldecisions.sdk.framework.IEnterpriseSession;

public class BOELogon {
	

	private String userName;
	private String password;
	private String cMSName;
	private String authentication;
	private IEnterpriseSession es;

	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCMSName() {
		return cMSName;
	}

	public void setCMSName(String name) {
		cMSName = name;
	}

	public String getAuthentication() {
		return authentication;
	}

	public void setAuthentication(String authentication) {
		this.authentication = authentication;
	}
	
	public IEnterpriseSession logon() throws SDKException
	{
		return CrystalEnterprise.getSessionMgr().logon(userName, password, cMSName, authentication);
		//CrystalEnterprise.getSessionMgr().
		
		
	}


	public IEnterpriseSession getEs() throws SDKException {
		if (this.es == null){
			this.es = logon();
		}
		return this.es;

	}
	
	
	
    
	
	



}
