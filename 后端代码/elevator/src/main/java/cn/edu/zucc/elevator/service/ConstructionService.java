package cn.edu.zucc.elevator.service;

import java.sql.Timestamp;
import java.util.List;

import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface ConstructionService {
	//新增施工记录
	boolean addConstruction(Construction construction);
	//修改/安排施工记录公司
	boolean modifyOrArrangeConstructionCompany(Construction construction);
	//修改/安排施工任务
	boolean modifyOrArrangeConstructionTask(Construction construction);
	//完成施工任务
	boolean finishConstructionTask(Construction construction, Integer type);
	//根据id获取施工记录
	Construction getConstructionById(Integer id);
	//根据电梯id获取施工记录
	Construction getConstructionByElevatorId(Integer elevatorId);
	
	
	//根据公司id与施工状态获取施工记录列表(获取数据总数)
	Integer getConstructionPageCountByCompanyIdAndState(Page page);
	//根据公司id与施工状态获取施工记录列表(获取分页数据)
	List<Construction> getConstructionPageListByCompanyIdAndState(Page page);
	List<Construction> getConstructionPageListByCompanyIdAndState2(Page page);
	//根据当前日期与操作者id获取施工记录列表
	List<Construction> getConstructionPageListByOperatorIdAndDate(Integer operatorId, Timestamp date);
}
