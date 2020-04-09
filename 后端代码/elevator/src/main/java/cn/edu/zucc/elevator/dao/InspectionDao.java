package cn.edu.zucc.elevator.dao;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import cn.edu.zucc.elevator.entity.Inspection;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface InspectionDao {
	//新增巡查
	int insertInspection(Inspection inspection);
	//删除巡查
	int deleteInspection(int inspectionId);
	//根据id获取巡查记录
	Inspection selectInspectionById(int inspectionId);
	
	//根据操作者id、巡查日期获取巡查记录列表
	List<Inspection> selectInspectionListByOperatorIdAndDate(int operatorId, Date date);
	//根据电梯id获取巡查记录列表(获取数据总数)
	Integer selectInspectionPageCountByElevatorId(Page page);
	//根据电梯id获取巡查记录列表(获取分页数据)
	List<Inspection> selectInspectionPageListByElevatorId(Page page);
	//根据操作者id获取巡查记录列表(获取数据总数)
	Integer selectInspectionPageCountByOperatorId(Page page);
	//根据操作者id获取巡查记录列表(获取分页数据)
	List<Inspection> selectInspectionPageListByOperatorId(Page page);
	//根据日期、公司id获取巡查记录列表(获取数据总数)
	Integer selectInspectionPageCountByCompanyIdAndDate(Page page, Integer companyId, Date date);
	//根据日期、公司id获取巡查记录列表(获取分页数据)
	List<Inspection> selectInspectionPageListByCompanyIdAndDate(Page page, Integer companyId, Date date);
	
	//根据电梯id查找近三次巡查情况平均分
	Float selectInspectionAvgScore(int elevatorId);
}
