package cn.edu.zucc.elevator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.ElevatorDao;
import cn.edu.zucc.elevator.dao.IndicesDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorScoreDistribution;
import cn.edu.zucc.elevator.entity.ElevatorStateDistribution;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.ElevatorService;

@Service
public class ElevatorServiceImpl implements ElevatorService {
	@Autowired
	private ElevatorDao elevatordao;
	@Autowired
	private IndicesDao indicesdao;
	
	@Transactional
	@Override
	public int addElevator(Elevator elevator) {
		if(elevator.getCompanyId() != null && !"".equals(elevator.getCompanyId()) &&
			elevator.getElevatorName() != null && !"".equals(elevator.getElevatorName())) {
			try {
				elevator.setDelflag(0);
				int effectedNum = elevatordao.insertElevator(elevator);
				if(effectedNum > 0) {
					return elevator.getId();
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
	public boolean removeElevator(int elevatorId) {
		if(elevatorId>0) {
			try {
				int effectedNum = elevatordao.deleteElevator(elevatorId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除电梯信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("电梯信息不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifyElevator(Elevator elevator) {
		if(elevator.getId() != null && elevator.getId() > 0) {
			try {
				int effectedNum = elevatordao.updateElevator(elevator);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新电梯信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("电梯信息不能为空！", -2);
		}
	}

	@Override
	public Elevator getElevatorById(int id) {
		return elevatordao.selectElevatorById(id);
	}

	@Override
	public Integer getElevatorPageCountByNameAndCompanyId(Page page) {
		return elevatordao.selectElevatorPageCountByNameAndCompanyId(page);
	}

	@Override
	public List<Elevator> getElevatorPageListByNameAndCompanyId(Page page) {
		return elevatordao.selectElevatorPageListByNameAndCompanyId(page);
	}

	@Override
	public List<Elevator> getElevatorListByCompanyId(Page page) {
		return elevatordao.selectElevatorListByCompanyId(page);
	}

	@Override
	public List<Elevator> getElevatorListByGeoPosition(Page page) {
		return elevatordao.selectElevatorListByGeoPosition(page);
	}

	@Override
	public ElevatorScoreDistribution getElevatorScoreCountInfoByCompanyId(int companyId) {
		ElevatorScoreDistribution eso = new ElevatorScoreDistribution();
		eso.setCount1(elevatordao.selectElevatorCountByCompanyIdAndScore(companyId, 1));
		eso.setCount2(elevatordao.selectElevatorCountByCompanyIdAndScore(companyId, 2));
		eso.setCount3(elevatordao.selectElevatorCountByCompanyIdAndScore(companyId, 3));
		eso.setCount4(elevatordao.selectElevatorCountByCompanyIdAndScore(companyId, 4));
		return eso;
	}

	@Override
	public ElevatorStateDistribution getElevatorStateCountInfoByCompanyId(int companyId) {
		ElevatorStateDistribution est = new ElevatorStateDistribution();
		est.setCount0(elevatordao.selectElevatorCountByCompanyIdAndState(companyId, 0));
		est.setCount1(elevatordao.selectElevatorCountByCompanyIdAndState(companyId, 1));
		est.setCount2(elevatordao.selectElevatorCountByCompanyIdAndState(companyId, 2));
		est.setCount3(elevatordao.selectElevatorCountByCompanyIdAndState(companyId, 3));
		return est;
	}

}
