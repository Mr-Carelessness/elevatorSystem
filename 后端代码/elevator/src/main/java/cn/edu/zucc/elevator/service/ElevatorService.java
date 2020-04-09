package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorScoreDistribution;
import cn.edu.zucc.elevator.entity.ElevatorStateDistribution;
import cn.edu.zucc.elevator.entity.Page;

public interface ElevatorService {
	//新增电梯
	int addElevator(Elevator elevator);
	//删除电梯
	boolean removeElevator(int elevatorId);
	//修改电梯基本信息
	boolean modifyElevator(Elevator elevator);
	//根据id查询电梯信息
	Elevator getElevatorById(int id);
	
	//根据电梯名称、公司信息获取电梯列表(获取数据总数)
	Integer getElevatorPageCountByNameAndCompanyId(Page page);
	//根据电梯名称、公司信息获取电梯列表(获取分页数据)
	List<Elevator> getElevatorPageListByNameAndCompanyId(Page page);
	//根据公司id获取电梯列表(获取分页数据)
	List<Elevator> getElevatorListByCompanyId(Page page);
	//根据电梯地理位置获取附近电梯列表(获取分页数据)
	List<Elevator> getElevatorListByGeoPosition(Page page);
	
	//根据公司id获取指定分数段电梯数量
	ElevatorScoreDistribution getElevatorScoreCountInfoByCompanyId(int companyId);
	//根据公司id获取指定状态电梯数量
	ElevatorStateDistribution getElevatorStateCountInfoByCompanyId(int companyId);
}
