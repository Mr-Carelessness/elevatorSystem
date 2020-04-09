package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Example;
import cn.edu.zucc.elevator.entity.Page;

public interface ExampleService {
	//列出区域列表(分页数据)
    List<Example> selectPageList(Page page);
    //列出区域列表(分页数据总数)
    Integer selectPageCount(Page page);
    
	//根据Id列出具体区域
    Example queryExampleById(int exampleId);
}
