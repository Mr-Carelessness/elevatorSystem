package cn.edu.zucc.elevator.dao;

import java.sql.Timestamp;
import java.util.List;

import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.Maintainence;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Testing;

public interface TestingDao {
	//新增检测记录
	int insertTesting(Testing testing);
	//修改检测记录
	int updateTesting(Testing testing);
	//删除检测记录
	int deleteTesting(int testingId);
	//根据id查询检测记录
	Testing selectTestingById(int testingId);
	
	//根据电梯id查询检测记录(获取数据总数)
	Integer selectTestingPageCountByElevatorId(Page page);
	//根据电梯id查询检测记录(获取分页数据)
	List<Testing> selectTestingPageListByElevatorId(Page page);
	//根据检测公司id与检测状态获取检测记录列表(获取数据总数)
	Integer selectTestingPageCountByCompanyIdAndState(Page page);
	//根据检测公司id与检测状态获取检测记录列表(获取分页数据)
	List<Testing> selectTestingPageListByCompanyIdAndState(Page page);
	List<Testing> selectTestingPageListByCompanyIdAndState2(Page page);
	//按照日期与操作者id获取检测记录列表
	List<Testing> selectTestingListByOperatorIdAndDate(int operatorId, Timestamp date);

	//根据电梯id查找近三次检测情况平均分
	Float selectTestingAvgScore(int elevatorId);
}
