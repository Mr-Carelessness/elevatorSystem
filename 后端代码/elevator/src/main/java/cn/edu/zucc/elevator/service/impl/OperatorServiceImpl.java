package cn.edu.zucc.elevator.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.OperatorDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Operator;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.OperatorService;

@Service
public class OperatorServiceImpl implements OperatorService {
	@Autowired
	private OperatorDao operatordao;
	
	@Transactional
	@Override
	public boolean addOperator(Operator operator) {
		if(operator.getUsername() != null && !"".equals(operator.getUsername()) ) {
			if(operator.getType() != null && operator.getType() >= 0 && operator.getType() <= 5) {
				try {
					operator.setDelflag(0);
					operator.setCreateTime(new Timestamp(System.currentTimeMillis()));
					int effectedNum = operatordao.insertOperator(operator);
					if(effectedNum > 0) {
						return true;
					}else {
						throw new CustomException("插入操作者信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("type参数必须为0(普通用户)或1(建造单位-操作者/建造负责人)或2(使用单位-操作者/巡查人员)或3(维护单位-操作者/维护人员)或4(检测单位-操作者/检测人员)", -2);
			}

		}else {
			throw new CustomException("用户名不能为空！", -2);
		}
	}
	
	@Transactional
	@Override
	public boolean removeOperator(int operatorId) {
		if(operatorId>0) {
			try {
				int effectedNum = operatordao.deleteOperator(operatorId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除操作者信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("操作者信息不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifyOperator(Operator operator) {
		if(operator.getId() != null && operator.getId() > 0) {
			if(operator.getType() != null && !"".equals(operator.getType()) && (operator.getType() < 0 || operator.getType() > 5)) {
				throw new CustomException("type参数必须为0(普通用户)或1(建造单位-操作者/建造负责人)或2(使用单位-操作者/巡查人员)或3(维护单位-操作者/维护人员)或4(检测单位-操作者/检测人员)", -2);
			}
			try {
				int effectedNum = operatordao.updateOperator(operator);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新操作者信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("操作者信息不能为空！", -2);
		}
	}

	@Override
	public Operator getOperatorById(int operatorId) {
		return operatordao.selectOperatorById(operatorId);
	}

	@Override
	public Operator getOperatorByUsername(String username) {
		return operatordao.selectOperatorByUsername(username);
	}

	@Override
	public Integer getOperatorPageCountByCompanyAndTypeAndName(Page page) {
		return operatordao.selectOperatorPageCountByCompanyAndTypeAndName(page);
	}

	@Override
	public List<Operator> getOperatorPageListByCompanyAndTypeAndName(Page page) {
		return operatordao.selectOperatorPageListByCompanyAndTypeAndName(page);
	}

	@Override
	public Integer getOperatorPageCountByCompanyAndTypeGT0AndName(Page page) {
		return operatordao.selectOperatorPageCountByCompanyAndTypeGT0AndName(page);
	}

	@Override
	public List<Operator> getOperatorPageListByCompanyAndTypeGT0AndName(Page page) {
		return operatordao.selectOperatorPageListByCompanyAndTypeGT0AndName(page);
	}
	
	
	
}
