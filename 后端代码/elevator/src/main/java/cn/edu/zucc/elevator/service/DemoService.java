package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Page;

public interface DemoService {
	//列出区域列表
	List<Demo> queryDemo();
	//列出区域列表(分页数据)
    List<Demo>selectPageList(Page page);
    //列出区域列表(分页数据总数)
    Integer selectPageCount(Page page);
    
	//根据Id列出具体区域
	Demo queryDemoById(int demoId);
	//插入区域信息
	boolean addDemo(Demo demo);
	//更新区域信息
	boolean modifyDemo(Demo demo);
	//删除区域信息
	boolean deleteDemo(int demoId);
}
