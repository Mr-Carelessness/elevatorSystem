package cn.edu.zucc.elevator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.ManagerDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.ManagerService;

@Service
public class ManagerServiceImpl implements ManagerService {
	@Autowired
	private ManagerDao managerdao;
	
	@Transactional
	@Override
	public boolean addManager(Manager manager) {
		if(manager.getUsername() != null && !"".equals(manager.getUsername()) && 
			manager.getPassword() != null && !"".equals(manager.getPassword())) {
			if(manager.getType() != null && manager.getType() >= 0 && manager.getType() <= 1) {
				try {
					manager.setDelflag(0);
					int effectedNum = managerdao.insertManager(manager);
					if(effectedNum > 0) {
						return true;
					}else {
						throw new CustomException("插入管理员信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("type参数必须为0(普通管理员)或1(超级管理员)", -2);
			}

		}else {
			throw new CustomException("用户名和密码信息不能为空！", -2);
		}
	}
	
	@Transactional
	@Override
	public boolean removeManager(int managerId) {
		if(managerId>0) {
			try {
				int effectedNum = managerdao.deleteManager(managerId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除管理员信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("管理员信息不能为空！", -2);
		}
	}
	
	@Transactional
	@Override
	public boolean modifyManager(Manager manager) {
		if(manager.getId() != null && manager.getId() > 0) {
			if(manager.getType() != null && !"".equals(manager.getType()) && (manager.getType() < 0 || manager.getType() > 1)) {
				throw new CustomException("type参数必须为0(普通管理员)或1(超级管理员)", -2);
			}
			try {
				int effectedNum = managerdao.updateManager(manager);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新管理员信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("管理员信息不能为空！", -2);
		}
	}

	@Override
	public Integer getPageCountByType(Page page) {
        return managerdao.selectManagerPageCountByType(page);
	}

	@Override
	public List<Manager> getManagerPageListByType(Page page) {
		List<Manager> list = managerdao.selectManagerPageListByType(page);
        return list;
	}

	@Override
	public Integer getPageCountByTypeAndCompanyId(Page page) {
		return managerdao.selectManagerPageCountByTypeAndCompanyId(page);
	}

	@Override
	public List<Manager> getManagerPageListByTypeAndCompanyId(Page page) {
		List<Manager> list = managerdao.selectManagerPageListByTypeAndCompanyId(page);
        return list;
	}
	
	@Override
	public Integer getPageCountByCompanyIdAndName(Page page) {
		 return managerdao.selectManagerPageCountByCompanyIdAndName(page);
	}

	@Override
	public List<Manager> getManagerPageListByCompanyIdAndName(Page page) {
		List<Manager> list = managerdao.selectManagerPageListByCompanyIdAndName(page);
        return list;
	}

	@Override
	public Manager loginManager(String username, String password) {
		List<Manager> list = managerdao.selectManagerPageListByUsername(username, password);
		if(list.size() > 0) {
			return list.get(0);
		}else {
			return null;
		}
	}

	@Override
	public Manager getManagerById(Integer id) {
		return managerdao.selectManagerById(id);
	}


}
