package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Operator;
import cn.edu.zucc.elevator.entity.Page;

public interface OperatorService {
	//新增操作者
	boolean addOperator(Operator operator);
	//删除操作者
	boolean removeOperator(int operatorId);
	//修改操作者基本信息
	boolean modifyOperator(Operator operator);
	//根据id获取操作者信息
	Operator getOperatorById(int operatorId);
	//根据用户名获取操作者信息
	Operator getOperatorByUsername(String username);
	
	//根据公司、用户类型、用户名称获取操作者列表(获取数据总数)
	Integer getOperatorPageCountByCompanyAndTypeAndName(Page page);
	//根据公司、用户类型、用户名称获取操作者列表(获取分页数据)
	List<Operator> getOperatorPageListByCompanyAndTypeAndName(Page page);
	
	//根据公司、用户类型、用户名称获取操作者列表(获取数据总数)
	Integer getOperatorPageCountByCompanyAndTypeGT0AndName(Page page);
	//根据公司、用户类型、用户名称获取操作者列表(获取分页数据)
	List<Operator> getOperatorPageListByCompanyAndTypeGT0AndName(Page page);
}
