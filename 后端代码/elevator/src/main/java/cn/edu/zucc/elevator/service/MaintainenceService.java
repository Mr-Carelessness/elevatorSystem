package cn.edu.zucc.elevator.service;

import java.sql.Timestamp;
import java.util.List;

import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Maintainence;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface MaintainenceService {
	//新增维护记录
	boolean addMaintainence(Maintainence maintainence);
	//修改/安排施工维护公司
	boolean modifyOrArrangeMaintainenceCompany(Maintainence maintainence);
	//修改/安排维护任务
	boolean modifyOrArrangeMaintainenceTask(Maintainence maintainence);
	//完成施工任务
	boolean finishMaintainenceTask(Maintainence maintainence, Integer type);
	//删除维护记录
	boolean removeMaintainence(Integer maintainenceId);
	//根据id获取维护记录
	Maintainence getMaintainenceById(Integer maintainenceId);
	
	//根据电梯id获取维护记录(获取数据总数)
	Integer getMaintainencePageCountByElevatorId(Page page);
	//根据电梯id获取维护记录(获取分页数据)
	List<Maintainence> getMaintainencePageListByElevatorId(Page page);
	//根据公司id与施工状态获取维护记录列表(获取数据总数)
	Integer getMaintainencePageCountByCompanyIdAndState(Page page);
	//根据公司id与施工状态获取维护记录列表(获取分页数据)
	List<Maintainence> getMaintainencePageListByCompanyIdAndState(Page page);
	List<Maintainence> getMaintainencePageListByCompanyIdAndState2(Page page);
	//根据当前日期与操作者id获取维护记录列表
	List<Maintainence> getMaintainenceListByOperatorIdAndDate(Integer operatorId, Timestamp date);
}
