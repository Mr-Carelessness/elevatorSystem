package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Company;
import cn.edu.zucc.elevator.entity.CompanyElevatorCount;
import cn.edu.zucc.elevator.entity.CompanyOperatorCount;
import cn.edu.zucc.elevator.entity.Page;

public interface CompanyDao {
	//新增公司
	int insertCompany(Company company);
	//修改公司基本信息
	int updateCompany(Company company);	
	//删除公司
	int deleteCompany(int id);
	//根据公司id查询公司信息
	Company selectCompanyById(int id);
	//根据公司名称获取公司信息(获取数据总数)
	Integer selectCompanyPageCountByName(Page page);
	//根据公司名称获取公司信息(获取分页数据)
	List<Company> selectCompanyPageListByName(Page page);
	//根据公司名称获取公司信息(获取分页数据)
	List<Company> selectCompanyPageListByName2(Page page);
	//根据公司类型获取公司信息(获取数据总数)
	Integer selectCompanyPageCountByType(Page page);
	//根据公司类型获取公司信息(获取分页数据)
	List<Company> selectCompanyPageListByType(Page page);
	
	//统计公司操作者总数
	List<CompanyOperatorCount> selectCompanyOperatorCount(int limit);
	//统计公司电梯总数
	List<CompanyElevatorCount> selectCompanyElevatorCount(int limit);
}
