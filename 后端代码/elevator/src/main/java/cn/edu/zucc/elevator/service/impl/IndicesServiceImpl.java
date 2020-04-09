package cn.edu.zucc.elevator.service.impl;

import java.io.Console;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.ElevatorDao;
import cn.edu.zucc.elevator.dao.IndicesDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Indices;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.IndicesService;

@Service
public class IndicesServiceImpl implements IndicesService {
	@Autowired
	private IndicesDao indicesdao;
	@Autowired
	private ElevatorDao elevatordao;
	
	@Override
	public boolean addElevatorIndices(ElevatorIndices elevatorIndices) {
		if(elevatorIndices.getCompanyId() != null && !"".equals(elevatorIndices.getCompanyId()) &&
				elevatorIndices.getElevatorId() != null && !"".equals(elevatorIndices.getElevatorId())) {
			try {
				int effectedNum = indicesdao.insertElevatorIndices(elevatorIndices);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("插入电梯信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("电梯名称以及所属公司不能为空！", -2);
		}
	}
	
	@Transactional
	@Override
	public Float calculateElevatorScore(int elevatorId) {
		ElevatorIndices elevatorIndices = indicesdao.selectElevatorIndicesByElevatorId(elevatorId);
		Indices indices = indicesdao.selectWeightOfIndices();
		Float ans = elevatorIndices.getInd1()*indices.getInd1() + elevatorIndices.getInd2()*indices.getInd2() + elevatorIndices.getInd3()*indices.getInd3() +
				elevatorIndices.getInd4()*indices.getInd4() + elevatorIndices.getInd5()*indices.getInd5() + elevatorIndices.getInd6()*indices.getInd6() +
				elevatorIndices.getInd7()*indices.getInd7() + elevatorIndices.getInd8()*indices.getInd8() + elevatorIndices.getInd9()*indices.getInd9() +
				elevatorIndices.getInd10()*indices.getInd10() + elevatorIndices.getInd11()*indices.getInd11() + elevatorIndices.getInd12()*indices.getInd12();
		Elevator elevator = new Elevator();
		elevator.setId(elevatorId);
		elevator.setScore(ans);
		try {
			int effectedNum = elevatordao.updateElevator(elevator);
			if(effectedNum > 0) {
				return ans;
			}else {
				throw new CustomException("未能计算出电梯得分！", -1);
			}
		}catch (Exception e) {
			throw new CustomException("错误提示：" + e.getMessage(), -1);
		}
	}

	@Transactional
	@Override
	public boolean modifyElevatorIndices(ElevatorIndices elevatorIndices) {
		try {
			int effectedNum = indicesdao.updateElevatorIndices(elevatorIndices);
			if(effectedNum > 0) {
				return true;
			}else {
				throw new CustomException("更新电梯指标信息失败！", -1);
			}
		}catch (Exception e) {
			throw new CustomException("错误提示：" + e.getMessage(), -1);
		}
	}

	@Override
	public ElevatorIndices getElevatorIndicesByElevatorId(int elevatorId) {
		return indicesdao.selectElevatorIndicesByElevatorId(elevatorId);
	}
	
	
	
	
	@Transactional
	@Override
	public boolean modifyWeightOfIndices(Indices indices) {
		try {
			int effectedNum = indicesdao.updateWeightOfIndices(indices);
			if(effectedNum > 0) {
				return true;
			}else {
				throw new CustomException("更新指标权重失败！", -1);
			}
		}catch (Exception e) {
			throw new CustomException("错误提示：" + e.getMessage(), -1);
		}
	}

	@Override
	public Indices calculateAverageElevatorIndices() {
		try {
			Indices indices = indicesdao.selectAverageElevatorIndices();
			Indices indicesWeight = indicesdao.selectWeightOfIndices();
			Float ans = indicesWeight.getInd1()*indices.getInd1() + indicesWeight.getInd2()*indices.getInd2() + indicesWeight.getInd3()*indices.getInd3() +
					indicesWeight.getInd4()*indices.getInd4() + indicesWeight.getInd5()*indices.getInd5() + indicesWeight.getInd6()*indices.getInd6() +
					indicesWeight.getInd7()*indices.getInd7() + indicesWeight.getInd8()*indices.getInd8() + indicesWeight.getInd9()*indices.getInd9() +
					indicesWeight.getInd10()*indices.getInd10() + indicesWeight.getInd11()*indices.getInd11() + indicesWeight.getInd12()*indices.getInd12();
			
			int effectedNum = indicesdao.updateAverageElevatorIndices(indices);
			if(effectedNum > 0) {
				indices.setScore(ans);
				indices.setStatement("score为电梯平均分数，其余为各项指标平均分数");
				return indices;
			}else {
				throw new CustomException("计算平均指标失败！", -1);
			}
		}catch (Exception e) {
			throw new CustomException("错误提示：" + e.getMessage(), -1);
		}
	}

	@Override
	public Integer getElevatorPageCountByNameAndCompanyId(Page page) {
		return indicesdao.selectElevatorPageCountByNameAndCompanyId(page);
	}

	@Override
	public List<ElevatorIndices> getElevatorPageListByNameAndCompanyId(Page page) {
		return indicesdao.selectElevatorPageListByNameAndCompanyId(page);
	}

	@Transactional
	@Override
	public boolean modifyElevatorIndicesAndElevatorScoreByCompanyId(int companyId, ElevatorIndices elevatorIndices) {
		try {
			int effectedNum = indicesdao.updateElevatorIndicesByCompanyId(companyId, elevatorIndices);
			if(effectedNum > 0) {
				Indices weight = indicesdao.selectWeightOfIndices();
				int effectedNum2 = indicesdao.updateElevatorScoreByCompanyId(companyId, weight);
				if(effectedNum2 > 0) {
					return true;
				}else {
					throw new CustomException("更新电梯指标失败！", -1);
				}
			}else {
				throw new CustomException("更新电梯指标失败！", -1);
			}
		}catch (Exception e) {
			throw new CustomException("错误提示：" + e.getMessage(), -1);
		}
	}

	@Override
	public Indices getWeightOfIndices() {
		return indicesdao.selectWeightOfIndices();
	}
	
	
}
