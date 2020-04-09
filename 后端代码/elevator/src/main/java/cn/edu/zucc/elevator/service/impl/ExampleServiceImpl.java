package cn.edu.zucc.elevator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zucc.elevator.dao.DemoDao;
import cn.edu.zucc.elevator.dao.ExampleDao;
import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Example;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.ExampleService;

@Service
public class ExampleServiceImpl implements ExampleService {
	@Autowired
	private ExampleDao exampledao;
	
	@Override
	public Example queryExampleById(int exampleId) {
		return exampledao.queryExampleById(exampleId);
	}

	@Override
	public List<Example> selectPageList(Page page) {
		List<Example> list = exampledao.selectPageList(page);
        return list;
	}

	@Override
	public Integer selectPageCount(Page page) {
		return exampledao.selectPageCount(page);
	}
	
}
