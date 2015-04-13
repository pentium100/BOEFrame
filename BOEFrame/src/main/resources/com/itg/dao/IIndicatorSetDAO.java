package com.itg.dao;

import java.util.List;

public interface IIndicatorSetDAO {

	
	
	public void insertIndicatorSet(IndicatorSet indicatorSet);

	public void modifyIndicatorSet(IndicatorSet indicatorSet);

	public void deleteIndicator(IndicatorSet indicatorSet);

	public List<IndicatorSet> getAll(Integer start, Integer limit);

	public Long getCount();

	public IndicatorSet findById(Long id);
}
