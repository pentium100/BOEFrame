package com.itg.util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.directory.api.ldap.model.cursor.CursorException;
import org.apache.directory.api.ldap.model.cursor.EntryCursor;
import org.apache.directory.api.ldap.model.entry.Entry;
import org.apache.directory.api.ldap.model.exception.LdapException;
import org.apache.directory.api.ldap.model.message.SearchScope;
import org.apache.directory.ldap.client.api.LdapConnection;
import org.apache.directory.ldap.client.api.LdapNetworkConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingFilter implements Filter {

	Logger log = LoggerFactory.getLogger(this.getClass());

	public void destroy() {
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		if (httpRequest.getUserPrincipal() != null) {
			HttpSession session = httpRequest.getSession(false);
			if (session.getAttribute("loginFilter_logged") == null) {
				log.info(httpRequest.getUserPrincipal().getName() + ";"
						+ httpRequest.getRequestURI());
				session.setAttribute("loginFilter_logged", true);
			}

			if (session.getAttribute("full_name") == null) {
				LdapConnection connection = new LdapNetworkConnection(
						"172.16.10.102", 389);

				try {
					connection.bind("CN=chngpwd,CN=Users,DC=itg,DC=net", // CN=³Â
																			// Á¢Î°,OU=users,OU=IT,OU=9F,OU=itg,DC=itg,DC=net
							"39w7z2");
					EntryCursor cursor = connection.search(
							"OU=itg,DC=itg,DC=net", "(userPrincipalName="
									+ httpRequest.getUserPrincipal().getName()
									+ ")", SearchScope.SUBTREE, "*");
					while (cursor.next()) {
						Entry entry = cursor.get();
						session.setAttribute("full_name",
								entry.get("displayName").getString());

					}
					cursor.close();
					connection.unBind();

				} catch (LdapException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					log.error(e.toString());
				} catch (CursorException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					log.error(e.toString());
				} finally {

				}

			}

		}

		chain.doFilter(request, response);

	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
