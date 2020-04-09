package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Page;

public interface DemoDao {
	//列出区域列表
	List<Demo> queryDemo();
	//通过关键字分页查询数据列表
    public List<Demo> selectPageList(Page page);
    //通过关键字分页查询，返回总记录数
    public Integer selectPageCount(Page page);
	
	//根据Id列出具体区域
	Demo queryDemoById(int demoId);
	//插入区域信息
	int insertDemo(Demo demo);
	//更新区域信息
	int updateDemo(Demo demo);
	//删除区域信息
	int deleteDemo(int demoId);
}
