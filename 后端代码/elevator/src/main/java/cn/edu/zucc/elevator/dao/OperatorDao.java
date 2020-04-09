package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Message;
import cn.edu.zucc.elevator.entity.Operator;
import cn.edu.zucc.elevator.entity.Page;

public interface OperatorDao {
	//新增操作者
	int insertOperator(Operator operator);
	//修改操作者基本信息
	int updateOperator(Operator operator);	
	//删除操作者
	int deleteOperator(int operatorId);
	//根据Id查找操作者信息
	Operator selectOperatorById(int operatorId);
	//根据用户名查询唯一用户/查找用户名是否存在
	Operator selectOperatorByUsername(String username);
	
	//根据公司、用户类型、用户名称获取用户列表(获取数据总数)
	Integer selectOperatorPageCountByCompanyAndTypeAndName(Page page);
	//根据公司、用户类型、用户名称获取用户列表(获取分页数据)
	List<Operator> selectOperatorPageListByCompanyAndTypeAndName(Page page);
	
	//根据公司、用户类型、用户名称获取公司用户列表(获取数据总数)
	Integer selectOperatorPageCountByCompanyAndTypeGT0AndName(Page page);
	//根据公司、用户类型、用户名称获取公司用户列表(获取分页数据)
	List<Operator> selectOperatorPageListByCompanyAndTypeGT0AndName(Page page);
}
