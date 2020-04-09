package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface ManagerDao {
	//新增管理员
	int insertManager(Manager manager);
	//修改管理员基本信息
	int updateManager(Manager manager);	
	//删除管理员
	int deleteManager(int managerId);
	//根据管理员类型获取管理员列表(获取数据总数)
	Integer selectManagerPageCountByType(Page page);
	//根据管理员类型获取管理员列表(获取分页数据)
	List<Manager> selectManagerPageListByType(Page page);
	//根据管理员类型获取公司管理员列表(获取数据总数)
	Integer selectManagerPageCountByTypeAndCompanyId(Page page);
	//根据管理员类型获取公司管理员列表(获取分页数据)
	List<Manager> selectManagerPageListByTypeAndCompanyId(Page page);
	//获取公司管理员列表(获取数据总数)
	Integer selectManagerPageCountByCompanyIdAndName(Page page);
	//获取公司管理员列表(获取分页数据)
	List<Manager> selectManagerPageListByCompanyIdAndName(Page page);
	//根据账号与密码查找对应用户
	List<Manager> selectManagerPageListByUsername(String username, String password);
	//根据id获取管理员
	Manager selectManagerById(Integer id);
}
