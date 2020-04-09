package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Userexpr;

public interface UserexprService {
	//新增用户体验
	boolean addUserexpr(Userexpr userexpr);
	//删除用户体验
	boolean removeUserexpr(int userexprId);
	
	//根据电梯id获取用户体验列表(获取数据总数)
	Integer getUserexprPageCountByElevatorId(Page page);
	//根据电梯id获取用户体验列表(获取分页数据)
	List<Userexpr> getUserexprPageListByElevatorId(Page page);
	//根据用户id、电梯id获取用户体验列表
	List<Userexpr> getUserexprPageListByOperatorIdAndElevatorId(int elevatorId, int operatorId);
}
