package cn.edu.zucc.elevator.dao;


import java.util.List;

import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Indices;
import cn.edu.zucc.elevator.entity.Page;

public interface IndicesDao {
	//新增电梯指标
	int insertElevatorIndices(ElevatorIndices elevatorIndices);
	//修改电梯指标
	int updateElevatorIndices(ElevatorIndices elevatorIndices);	
	//根据电梯id查询电梯指标
	ElevatorIndices selectElevatorIndicesByElevatorId(int elevatorId);
	
	//修改指标权重
	int updateWeightOfIndices(Indices indices);
	//获取指标权重
	Indices selectWeightOfIndices();
	//获取电梯指标平均值
	Indices selectAverageElevatorIndices();
	//将电梯指标平均值写入到数据库中
	int updateAverageElevatorIndices(Indices indices);
	
	//根据电梯名字以及所属公司获取所有电梯指标信息(获取分页数据)
	Integer selectElevatorPageCountByNameAndCompanyId(Page page);
	//根据电梯名字以及所属公司获取所有电梯指标信息(获取数据总数)
	List<ElevatorIndices> selectElevatorPageListByNameAndCompanyId(Page page);
	//修改公司电梯指标为统一指标
	int updateElevatorIndicesByCompanyId(int companyId, ElevatorIndices elevatorIndices);
	//修改公司电梯指标得分
	int updateElevatorScoreByCompanyId(int companyId, Indices indices); 
}
