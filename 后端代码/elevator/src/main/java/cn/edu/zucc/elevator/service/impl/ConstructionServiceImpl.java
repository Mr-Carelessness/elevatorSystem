package cn.edu.zucc.elevator.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.ConstructionDao;
import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.ConstructionService;

@Service
public class ConstructionServiceImpl implements ConstructionService {
	@Autowired
	private ConstructionDao constructiondao;
	
	@Transactional
	@Override
	public boolean addConstruction(Construction construction) {
		if(construction.getElevatorId() != null && construction.getElevatorId()>0 && 
			construction.getCompanyId() != null && construction.getCompanyId()>0 ) {
			try {
				construction.setDelflag(0);
				construction.setState(0);//状态：未完成并且未安排人员
				int effectedNum = constructiondao.insertConstruction(construction);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("插入施工信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("请选择施工电梯以及施工公司！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifyOrArrangeConstructionCompany(Construction construction) {
		if(construction.getId() != null && construction.getId() > 0 && 
			construction.getElevatorId() != null && construction.getElevatorId()>0) {
			try {
				Construction cs = constructiondao.selectConstructionById(construction.getId());
				if(cs.getState() != 0) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				int effectedNum = constructiondao.updateConstruction(construction);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新施工记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("施工记录信息以及对应施工负责公司不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifyOrArrangeConstructionTask(Construction construction) {
		if(construction.getId() != null && construction.getId() > 0 && 
			construction.getOperatorId() != null && construction.getOperatorId()>0) {
			try {
				Construction cs = constructiondao.selectConstructionById(construction.getId());
				if(cs.getState() > 1) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				construction.setState(1);
				int effectedNum = constructiondao.updateConstruction(construction);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新施工记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("施工记录信息以及施工负责人不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean finishConstructionTask(Construction construction, Integer type) {
		if(construction.getId() != null && construction.getId() > 0) {
			try {
				Construction cs = constructiondao.selectConstructionById(construction.getId());
				if(cs.getState() < 1) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				if(type == 1) {
					construction.setState(2);
				}
				construction.setRealFinishDate(new Timestamp(System.currentTimeMillis()));
				int effectedNum = constructiondao.updateConstruction(construction);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新施工记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("施工记录信息不能为空！", -2);
		}
	}

	@Override
	public Construction getConstructionById(Integer id) {
		return constructiondao.selectConstructionById(id);
	}

	@Override
	public Construction getConstructionByElevatorId(Integer elevatorId) {
		return constructiondao.selectConstructionByElevatorId(elevatorId);
	}

	@Override
	public Integer getConstructionPageCountByCompanyIdAndState(Page page) {
		return constructiondao.selectConstructionPageCountByCompanyIdAndState(page);
	}
	
	@Override
	public List<Construction> getConstructionPageListByCompanyIdAndState(Page page) {
		List<Construction> list = constructiondao.selectConstructionPageListByCompanyIdAndState(page);
        return list;
	}
	@Override
	public List<Construction> getConstructionPageListByCompanyIdAndState2(Page page) {
		List<Construction> list = constructiondao.selectConstructionPageListByCompanyIdAndState2(page);
        return list;
	}

	@Override
	public List<Construction> getConstructionPageListByOperatorIdAndDate(Integer operatorId, Timestamp date) {
		List<Construction> list = constructiondao.selectConstructionListByOperatorIdAndDate(operatorId, date);
        return list;
	}

}
