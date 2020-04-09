package cn.edu.zucc.elevator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.CompanyDao;
import cn.edu.zucc.elevator.dao.ManagerDao;
import cn.edu.zucc.elevator.entity.Company;
import cn.edu.zucc.elevator.entity.CompanyElevatorCount;
import cn.edu.zucc.elevator.entity.CompanyOperatorCount;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {
	@Autowired
	private CompanyDao companydao;
	
	@Transactional
	@Override
	public boolean addCompany(Company company) {
		if(company.getCname() != null && !"".equals(company.getCname())) {
			if(company.getAuthority() != null && !"".equals(company.getAuthority()) && company.getAuthority().length() == 4 ) {
				try {
					company.setDelflag(0);
					int effectedNum = companydao.insertCompany(company);
					if(effectedNum > 0) {
						return true;
					}else {
						throw new CustomException("插入公司信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("公司权限类型必须由四位由0或1的数字表示", -2);
			}
		}else {
			throw new CustomException("公司名称不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean removeCompany(int id) {
		if(id>0) {
			try {
				int effectedNum = companydao.deleteCompany(id);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除公司信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("公司信息不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifyCompany(Company company) {
		if(company.getId() != null && company.getId() > 0) {
			if(company.getAuthority() != null && !"".equals(company.getAuthority()) && company.getAuthority().length() != 4) {
				throw new CustomException("公司权限类型必须由四位由0或1的数字表示", -2);
			}
			try {
				int effectedNum = companydao.updateCompany(company);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新公司信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("公司信息不能为空！", -2);
		}
	}

	@Override
	public Company getCompanyById(int id) {
		return companydao.selectCompanyById(id);
	}

	@Override
	public Integer getCompanyPageCountByName(Page page) {
		return companydao.selectCompanyPageCountByName(page);
	}

	@Override
	public List<Company> getCompanyPageListByName(Page page) {
		return companydao.selectCompanyPageListByName(page);
	}
	
	@Override
	public List<Company> getCompanyPageListByName2(Page page) {
		return companydao.selectCompanyPageListByName2(page);
	}

	@Override
	public Integer getCompanyPageCountByType(Page page) {
		return companydao.selectCompanyPageCountByType(page);
	}

	@Override
	public List<Company> getCompanyPageListByType(Page page) {
		return companydao.selectCompanyPageListByType(page);
	}

	@Override
	public List<CompanyOperatorCount> selectCompanyOperatorCount(int limit) {
		return companydao.selectCompanyOperatorCount(limit);
	}

	@Override
	public List<CompanyElevatorCount> selectCompanyElevatorCount(int limit) {
		return companydao.selectCompanyElevatorCount(limit);
	}

}
