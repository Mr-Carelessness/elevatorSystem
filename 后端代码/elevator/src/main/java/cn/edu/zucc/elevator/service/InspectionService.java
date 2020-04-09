package cn.edu.zucc.elevator.service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Inspection;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface InspectionService {
	//新增巡查记录
	boolean addInspection(Inspection inspection);
	//删除巡查记录
	boolean removeInspection(Integer inspectionId);
	//根据id获取巡查记录
	Inspection getInspectionById(Integer inspectionId);
	
	//获取操作者id、巡查日期获取巡查记录列表
	List<Inspection> getInspectionListByOperatorIdAndDate(int operatorId, Date date);
	//根据电梯id获取巡查记录列表(获取数据总数)
	Integer getInspectionPageCountByElevatorId(Page page);
	//根据电梯id获取巡查记录列表(获取分页数据)
	List<Inspection> getInspectionPageListByElevatorId(Page page);
	//获取操作者id获取巡查记录列表(获取数据总数)
	Integer getInspectionPageCountByOperatorId(Page page);
	//获取操作者id获取巡查记录列表(获取分页数据)
	List<Inspection> getInspectionPageListByOperatorId(Page page);
	//获取日期、公司id获取巡查记录列表(获取数据总数)
	Integer getInspectionPageCountByCompanyIdAndDate(Page page, Integer companyId, Date date);
	//获取日期、公司id获取巡查记录列表(获取分页数据)
	List<Inspection> getInspectionPageListByCompanyIdAndDate(Page page, Integer companyId, Date date);
	
	//根据电梯id查找近三次巡查情况平均分
	Float getInspectionAvgScore(int elevatorId);
}
