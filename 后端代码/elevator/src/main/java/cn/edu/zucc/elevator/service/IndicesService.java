package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Indices;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface IndicesService {
	//新增电梯指标
	boolean addElevatorIndices(ElevatorIndices elevatorIndices);
	//计算电梯得分并返回
	Float calculateElevatorScore(int elevatorId);
	//修改电梯指标评分
	boolean modifyElevatorIndices(ElevatorIndices elevatorIndices);
	//根据电梯id查询电梯指标
	ElevatorIndices getElevatorIndicesByElevatorId(int elevatorId);
	
	// 获取指标权重
	Indices getWeightOfIndices();
	//修改电梯指标权重
	boolean modifyWeightOfIndices(Indices indices);
	//计算电梯指标平均值
	Indices calculateAverageElevatorIndices();
	//根据电梯名字以及所属公司获取所有电梯指标信息(获取分页数据)
	Integer getElevatorPageCountByNameAndCompanyId(Page page);
	//根据电梯名字以及所属公司获取所有电梯指标信息(获取数据总数)
	List<ElevatorIndices> getElevatorPageListByNameAndCompanyId(Page page);
	//根据公司id修改电梯指标，并计算得分
	boolean modifyElevatorIndicesAndElevatorScoreByCompanyId(int companyId, ElevatorIndices elevatorIndices);
	
}
