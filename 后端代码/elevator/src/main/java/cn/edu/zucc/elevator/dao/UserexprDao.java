package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Userexpr;

public interface UserexprDao {
	//新增用户体验
	int insertUserexpr(Userexpr userexpr);
	//删除用户体验
	int deleteUserexpr(int userexprId);
	
	//根据电梯id查找用户体验列表(获取数据总数)
	Integer selectUserexprPageCountByElevatorId(Page page);
	//根据电梯id查找用户体验列表(获取分页数据)
	List<Userexpr> selectUserexprPageListByElevatorId(Page page);
	//根据用户id、电梯id查询用户体验记录列表
	List<Userexpr> selectUserexprPageListByOperatorIdAndElevatorId(int elevatorId, int operatorId);
	//根据电梯id查找用户体验平均分
	Float selectUserexprAvgScore(int elevatorId);
}
