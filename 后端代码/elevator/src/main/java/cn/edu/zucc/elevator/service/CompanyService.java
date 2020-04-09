package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Company;
import cn.edu.zucc.elevator.entity.CompanyElevatorCount;
import cn.edu.zucc.elevator.entity.CompanyOperatorCount;
import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface CompanyService {
	//新增公司
	boolean addCompany(Company company);
	//删除公司
	boolean removeCompany(int id);
	//修改公司基本信息
	boolean modifyCompany(Company company);
	//根据公司id查询公司信息
	Company getCompanyById(int id);

	//根据公司名称获取公司列表(获取数据总数)
	Integer getCompanyPageCountByName(Page page);
	//根据公司名称获取公司列表(获取分页数据)
	List<Company> getCompanyPageListByName(Page page);
	//根据公司名称获取公司列表(获取分页数据)
	List<Company> getCompanyPageListByName2(Page page);
	//根据公司类型获取公司列表(获取数据总数)
	Integer getCompanyPageCountByType(Page page);
	//根据公司类型获取公司列表(获取分页数据)
	List<Company> getCompanyPageListByType(Page page);
	
	//统计公司操作者总数
	List<CompanyOperatorCount> selectCompanyOperatorCount(int limit);
	//统计公司电梯总数
	List<CompanyElevatorCount> selectCompanyElevatorCount(int limit);
}
