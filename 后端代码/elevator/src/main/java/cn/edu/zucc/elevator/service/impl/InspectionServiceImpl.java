package cn.edu.zucc.elevator.service.impl;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zucc.elevator.dao.ElevatorDao;
import cn.edu.zucc.elevator.dao.IndicesDao;
import cn.edu.zucc.elevator.dao.InspectionDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Inspection;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.InspectionService;

@Service
public class InspectionServiceImpl implements InspectionService {
	@Autowired
	private InspectionDao inspectiondao;
	@Autowired
	private IndicesDao indicesdao;
	
	@Override
	public boolean addInspection(Inspection inspection) {
		if(inspection.getOperatorId() != null && inspection.getOperatorId()>0 && 
			inspection.getElevatorId() != null && inspection.getElevatorId()>0) {
			if(inspection.getScore() != null && inspection.getScore()>=0 && inspection.getScore()<=5) {
				try {
					inspection.setDelflag(0);
					inspection.setInspectionDate(new Timestamp(System.currentTimeMillis()));
					int effectedNum = inspectiondao.insertInspection(inspection);
					if(effectedNum > 0) {
						return true;
					}else {
						throw new CustomException("插入巡查信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("打分必须在0~5分范围之内", -2);
			}

		}else {
			throw new CustomException("必须指定对应巡查者与电梯！", -2);
		}
	}

	@Override
	public boolean removeInspection(Integer inspectionId) {
		if(inspectionId>0) {
			try {
				int effectedNum = inspectiondao.deleteInspection(inspectionId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除巡查信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("巡查信息不能为空！", -2);
		}
	}

	@Override
	public Inspection getInspectionById(Integer inspectionId) {
		return inspectiondao.selectInspectionById(inspectionId);
	}

	@Override
	public List<Inspection> getInspectionListByOperatorIdAndDate(int operatorId, Date date) {
		return inspectiondao.selectInspectionListByOperatorIdAndDate(operatorId, date);
	}

	@Override
	public Integer getInspectionPageCountByElevatorId(Page page) {
		return inspectiondao.selectInspectionPageCountByElevatorId(page);
	}

	@Override
	public List<Inspection> getInspectionPageListByElevatorId(Page page) {
		return inspectiondao.selectInspectionPageListByElevatorId(page);
	}

	@Override
	public Integer getInspectionPageCountByOperatorId(Page page) {
		return inspectiondao.selectInspectionPageCountByOperatorId(page);
	}

	@Override
	public List<Inspection> getInspectionPageListByOperatorId(Page page) {
		return inspectiondao.selectInspectionPageListByOperatorId(page);
	}

	@Override
	public Integer getInspectionPageCountByCompanyIdAndDate(Page page, Integer companyId, Date date) {
		return inspectiondao.selectInspectionPageCountByCompanyIdAndDate(page, companyId, date);
	}

	@Override
	public List<Inspection> getInspectionPageListByCompanyIdAndDate(Page page, Integer companyId, Date date) {
		return inspectiondao.selectInspectionPageListByCompanyIdAndDate(page, companyId, date);
	}

	@Override
	public Float getInspectionAvgScore(int elevatorId) {
		return inspectiondao.selectInspectionAvgScore(elevatorId);
	}
	

}
