package cn.edu.zucc.elevator.dao;

import java.sql.Timestamp;
import java.util.List;

import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.Maintainence;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface MaintainenceDao {
	//新增维护记录
	int insertMaintainence(Maintainence maintainence);
	//修改维护记录
	int updateMaintainence(Maintainence maintainence);	
	//删除管理员
	int deleteMaintainence(int maintainenceId);
	//根据id查询维护记录
	Maintainence selectMaintainenceById(int maintainenceId);
	
	//根据电梯id查询维护记录(获取数据总数)
	Integer selectMaintainencePageCountByElevatorId(Page page);
	//根据电梯id查询维护记录(获取分页数据)
	List<Maintainence> selectMaintainencePageListByElevatorId(Page page);
	//根据维护公司id与维护状态获取维护记录列表(获取数据总数)
	Integer selectMaintainencePageCountByCompanyIdAndState(Page page);
	//根据维护公司id与维护状态获取维护记录列表(获取分页数据)
	List<Maintainence> selectMaintainencePageListByCompanyIdAndState(Page page);
	List<Maintainence> selectMaintainencePageListByCompanyIdAndState2(Page page);
	//按照日期与操作者id获取维护记录列表
	List<Maintainence> selectMaintainenceListByOperatorIdAndDate(int operatorId, Timestamp date);
	
	//根据电梯id查找近三次维护情况平均分
	Float selectMaintainenceAvgScore(int elevatorId);
}
