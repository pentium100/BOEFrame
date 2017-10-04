package com.itg.web.ctl;


import java.util.Properties;
import java.io.File;
import java.io.FileOutputStream;
import java.util.concurrent.CountDownLatch;
import com.sap.mw.jco.*;


public class SAPConnect {
    
	  static final String POOL_NAME = "Pool";
	  
	  public static JCO.Client getConn(){
		  JCO.Client mConnection = JCO.createClient("800", // SAP client
                  "rfcuser",           // userid
                  "]c68sUY$)z[yU>ZNsK+\\YMSUVnYX9]tHCABC&<Ju",               // password
                  "zh",                 // language
                  "172.16.10.24",         // server host name
                  "01");                // system number
		  mConnection.connect();
		  return mConnection;
	  }
	  public static JCO.Client getConnection() {
	    try {
	      JCO.Client mConnection;
	      JCO.Pool pool = JCO.getClientPoolManager().getPool(POOL_NAME);
	      if (pool == null) {
	        Properties logonProperties = new Properties();
	        
	        logonProperties.put("jco.client.ashost","172.16.10.24"); 
	        logonProperties.put("jco.client.client","800");   
	        logonProperties.put("jco.client.passwd","]c68sUY$)z[yU>ZNsK+\\YMSUVnYX9]tHCABC&<Ju"); 
	        logonProperties.put("jco.client.sysnr","01");        
	        logonProperties.put("jco.client.user","rfcuser");

	        JCO.addClientPool(POOL_NAME,  // pool name
	                          10,          // maximum number of connections
	                          logonProperties);	// properties
	      }
	      mConnection = JCO.getClient(POOL_NAME);
	      
	      System.out.println(mConnection.getAttributes());
	      return mConnection;
	    }
	    catch (Exception ex) {
	      ex.printStackTrace();
	    }
		return null;
	    
	    
	  }
	  
	  
	  public static JCO.Function createFunction(String name, JCO.Client client) throws Exception {
		    try {
		      JCO.Repository mRepository = new JCO.Repository("Repository",  client);
;    	
		      IFunctionTemplate ft = mRepository.getFunctionTemplate(name.toUpperCase());
		      if (ft == null)
		        return null;
		      return ft.getFunction();
		    }
		    catch (Exception ex) {
		      throw new Exception("Problem retrieving JCO.Function object.");
		    }
		  }


	   


   
}
