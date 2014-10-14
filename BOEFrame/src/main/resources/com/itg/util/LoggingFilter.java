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
		}

		chain.doFilter(request, response);

	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
