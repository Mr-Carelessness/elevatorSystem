package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.Page;

public interface ElevatorDao {
	//新增电梯
	int insertElevator(Elevator elevator);
	//修改电梯基本信息
	int updateElevator(Elevator elevator);	
	//删除电梯
	int deleteElevator(int elevatorId);
	//根据公司id查询公司信息
	Elevator selectElevatorById(int id);
	
	//根据电梯名称、公司信息获取电梯列表(获取数据总数)
	Integer selectElevatorPageCountByNameAndCompanyId(Page page);
	//根据电梯名称、公司信息获取电梯列表(获取分页数据)
	List<Elevator> selectElevatorPageListByNameAndCompanyId(Page page);
	//根据公司id获取电梯列表(获取所有数据)
	List<Elevator> selectElevatorListByCompanyId(Page page);
	//根据电梯地理位置获取附近电梯列表(获取所有数据)
	List<Elevator> selectElevatorListByGeoPosition(Page page);
	
	//根据公司id获取指定分数段电梯数量
	Integer selectElevatorCountByCompanyIdAndScore(int companyId, int type);
	//根据公司id获取指定状态电梯数量
	Integer selectElevatorCountByCompanyIdAndState(int companyId, int state);
}
