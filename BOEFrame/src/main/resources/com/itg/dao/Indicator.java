package com.itg.dao;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Indicator")
public class Indicator {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	private MenuItem menu;
	private String name;
	
	
	private Integer sortId; // ≈≈–Ú¬Î
	
	public Integer getSortId() {
		return sortId;
	}

	public void setSortId(Integer sortId) {
		this.sortId = sortId;
	}
	
	@ManyToOne
	private IndicatorSet indicatorSet;
	
	
	

	public IndicatorSet getIndicatorSet() {
		return indicatorSet;
	}

	public void setIndicatorSet(IndicatorSet indicatorSet) {
		this.indicatorSet = indicatorSet;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MenuItem getMenu() {
		return menu;
	}

	public void setMenu(MenuItem menu) {
		this.menu = menu;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
