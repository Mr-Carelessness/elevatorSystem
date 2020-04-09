package cn.edu.zucc.elevator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.SafetytrainingDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Safetytraining;
import cn.edu.zucc.elevator.service.SafetytrainingService;

@Service
public class SafetytrainingServiceImpl implements SafetytrainingService {
	@Autowired
	private SafetytrainingDao safetytrainingdao;
	
	@Transactional
	@Override
	public boolean addSafetyTraining(Safetytraining safetytraining) {
		try {
			safetytraining.setDelFlag(0);
			int effectedNum = safetytrainingdao.insertSafetyTraining(safetytraining);
			if(effectedNum > 0) {
				return true;
			}else {
				throw new CustomException("插入安全培训信息失败！", -1);
			}
		}catch (Exception e) {
			throw new CustomException("错误提示：" + e.getMessage(), -1);
		}
	}

	@Transactional
	@Override
	public boolean removeSafetyTraining(int safetytrainingId) {
		if(safetytrainingId>0) {
			try {
				int effectedNum = safetytrainingdao.deleteSafetyTraining(safetytrainingId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除安全培训信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("安全培训信息不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifySafetyTraining(Safetytraining safetytraining) {
		if(safetytraining.getId() != null && safetytraining.getId() > 0) {
			try {
				int effectedNum = safetytrainingdao.updateSafetyTraining(safetytraining);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新安全培训信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("安全培训信息不能为空！", -2);
		}
	}

	@Override
	public Integer getSafetyTrainingPageCountByCompanyId(Page page) {
		return safetytrainingdao.selectSafetyTrainingPageCountByCompanyId(page);
	}

	@Override
	public List<Safetytraining> getSafetyTrainingPageListByCompanyId(Page page) {
		List<Safetytraining> list = safetytrainingdao.selectSafetyTrainingPageListByCompanyId(page);
        return list;
	}

	@Override
	public Safetytraining getSafetytrainingById(int safetytrainingId) {
		return safetytrainingdao.selectSafetytrainingById(safetytrainingId);
	}

}
