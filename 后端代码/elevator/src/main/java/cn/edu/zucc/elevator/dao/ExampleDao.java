package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Example;
import cn.edu.zucc.elevator.entity.Page;

public interface ExampleDao {
	//通过关键字分页查询数据列表
    public List<Example> selectPageList(Page page);
    //通过关键字分页查询，返回总记录数
    public Integer selectPageCount(Page page);
    
    //根据Id列出具体Example
  	Example queryExampleById(int exampleId);
}
