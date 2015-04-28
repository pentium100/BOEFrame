package com.itg.dao;

import java.util.List;

public interface IIndicatorDAO {

	public void insertIndicator(Indicator indicator);

	public void modifyIndicator(Indicator indicator);

	public void deleteIndicator(Indicator indicator);

	public List<Indicator> getAll(Integer start, Integer limit, List<Integer> menuIds, Long indicatorSet);

	public Long getCount(List<Integer> menuIds, Long indicatorSet);

	public Indicator findById(Long id);

}
