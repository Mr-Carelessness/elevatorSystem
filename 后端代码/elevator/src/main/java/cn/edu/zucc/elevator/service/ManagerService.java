package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface ManagerService {
	//新增管理员
	boolean addManager(Manager manager);
	//删除管理员
	boolean removeManager(int managerId);
	//修改管理员基本信息
	boolean modifyManager(Manager manager);
	//根据id获取管理员信息
	Manager getManagerById(Integer id);
	//根据管理员类型获取管理员列表(获取数据总数)
	Integer getPageCountByType(Page page);
	//根据管理员类型获取管理员列表(获取分页数据)
	List<Manager> getManagerPageListByType(Page page);
	//根据管理员类型获取公司管理员列表(获取数据总数)
	Integer getPageCountByTypeAndCompanyId(Page page);
	//根据管理员类型获取公司管理员列表(获取分页数据)
	List<Manager> getManagerPageListByTypeAndCompanyId(Page page);
	//获取公司管理员列表(获取数据总数)
	Integer getPageCountByCompanyIdAndName(Page page);
	//获取公司管理员列表(获取分页数据)
	List<Manager> getManagerPageListByCompanyIdAndName(Page page);
	//根据账号与密码登录系统
	Manager loginManager(String username, String password);
	
}
