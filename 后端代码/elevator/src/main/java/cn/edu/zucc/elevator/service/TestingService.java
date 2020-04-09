package cn.edu.zucc.elevator.service;

import java.sql.Timestamp;
import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Maintainence;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Testing;

public interface TestingService {
	//新增检测
	boolean addTesting(Testing testing);
	//修改/安排施工检测公司
	boolean modifyOrArrangeTestingCompany(Testing testing);
	//修改/安排检测任务
	boolean modifyOrArrangeTestingTask(Testing testing);
	//完成施工任务
	boolean finishTestingTask(Testing testing, Integer type);
	//添加检测图片
	boolean addTestingImg(Testing testing);
	//删除检测记录
	boolean removeTesting(Integer testingId);
	//根据id获取检测记录
	Testing getTestingById(Integer testingId);
	
	//根据电梯id获取检测记录(获取数据总数)
	Integer getTestingPageCountByElevatorId(Page page);
	//根据电梯id获取检测记录(获取分页数据)
	List<Testing> getTestingPageListByElevatorId(Page page);
	//根据公司id与施工状态获取检测记录列表(获取数据总数)
	Integer getTestingPageCountByCompanyIdAndState(Page page);
	//根据公司id与施工状态获取检测记录列表(获取分页数据)
	List<Testing> getTestingPageListByCompanyIdAndState(Page page);
	List<Testing> getTestingPageListByCompanyIdAndState2(Page page);
	//根据当前日期与操作者id获取检测记录列表
	List<Testing> getTestingListByOperatorIdAndDate(Integer operatorId, Timestamp date);
}
