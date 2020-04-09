package cn.edu.zucc.elevator.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zucc.elevator.dao.IndicesDao;
import cn.edu.zucc.elevator.dao.MaintainenceDao;
import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Maintainence;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.MaintainenceService;

@Service
public class MaintainenceServiceImpl implements MaintainenceService {
	@Autowired
	private MaintainenceDao maintainencedao;
	@Autowired
	private IndicesDao indicesdao;
	
	@Override
	public boolean addMaintainence(Maintainence maintainence) {
		if(maintainence.getElevatorId() != null && maintainence.getElevatorId()>0 && 
			maintainence.getCompanyId() != null && maintainence.getCompanyId()>0 ) {
			try {
				maintainence.setScore(Float.valueOf(0));
				maintainence.setDelflag(0);
				maintainence.setState(0);//状态：未完成并且未安排人员
				int effectedNum = maintainencedao.insertMaintainence(maintainence);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("插入维护信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("请选择维护电梯以及维保公司！", -2);
		}
	}

	@Override
	public boolean modifyOrArrangeMaintainenceCompany(Maintainence maintainence) {
		if(maintainence.getId() != null && maintainence.getId() > 0 && 
			maintainence.getElevatorId() != null && maintainence.getElevatorId()>0) {
			try {
				Maintainence ms = maintainencedao.selectMaintainenceById(maintainence.getId());
				if(ms.getState() != 0) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				int effectedNum = maintainencedao.updateMaintainence(maintainence);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新维护记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("维护记录信息以及对应维护负责公司不能为空！", -2);
		}
	}

	@Override
	public boolean modifyOrArrangeMaintainenceTask(Maintainence maintainence) {
		if(maintainence.getId() != null && maintainence.getId() > 0 && 
			maintainence.getOperatorId() != null && maintainence.getOperatorId()>0) {
			try {
				Maintainence ms = maintainencedao.selectMaintainenceById(maintainence.getId());
				if(ms.getState() > 1) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				maintainence.setState(1);
				int effectedNum = maintainencedao.updateMaintainence(maintainence);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新维护记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("维护记录信息以及维护负责人不能为空！", -2);
		}
	}

	@Override
	public boolean finishMaintainenceTask(Maintainence maintainence, Integer type) {
		if(maintainence.getId() != null && maintainence.getId() > 0) {
			if(maintainence.getScore() != null && maintainence.getScore()>=0 && maintainence.getScore()<=5) {
				try {
					Maintainence ms = maintainencedao.selectMaintainenceById(maintainence.getId());
					if(ms.getState() < 1) {
						throw new CustomException("当前状态下不能进行此操作！", -3);
					}
					if(type == 1) {
						maintainence.setState(2);
					}
					maintainence.setRealFinishDate(new Timestamp(System.currentTimeMillis()));
					int effectedNum = maintainencedao.updateMaintainence(maintainence);
					if(effectedNum > 0) {
						float avgScore = maintainencedao.selectMaintainenceAvgScore(ms.getElevator().getId());
						ElevatorIndices indices = new ElevatorIndices();
						indices.setInd6(avgScore);
						indices.setElevatorId(ms.getElevator().getId());
						indicesdao.updateElevatorIndices(indices);
						return true;
					}else {
						throw new CustomException("更新维护记录信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("打分必须在0~5分范围之内", -2);
			}
		}else {
			throw new CustomException("维护记录信息不能为空！", -2);
		}
	}

	@Override
	public boolean removeMaintainence(Integer maintainenceId) {
		if(maintainenceId != null && maintainenceId > 0) {
			try {
				Maintainence ms = maintainencedao.selectMaintainenceById(maintainenceId);
				if(ms.getState() > 0) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				int effectedNum = maintainencedao.deleteMaintainence(maintainenceId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除维护记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("维护记录信息不能为空！", -2);
		}
	}

	@Override
	public Maintainence getMaintainenceById(Integer maintainenceId) {
		return maintainencedao.selectMaintainenceById(maintainenceId);
	}

	@Override
	public Integer getMaintainencePageCountByElevatorId(Page page) {
		return maintainencedao.selectMaintainencePageCountByElevatorId(page);
	}

	@Override
	public List<Maintainence> getMaintainencePageListByElevatorId(Page page) {
		return maintainencedao.selectMaintainencePageListByElevatorId(page);
	}

	@Override
	public Integer getMaintainencePageCountByCompanyIdAndState(Page page) {
		return maintainencedao.selectMaintainencePageCountByCompanyIdAndState(page);
	}

	@Override
	public List<Maintainence> getMaintainencePageListByCompanyIdAndState(Page page) {
		return maintainencedao.selectMaintainencePageListByCompanyIdAndState(page);
	}
	public List<Maintainence> getMaintainencePageListByCompanyIdAndState2(Page page) {
		return maintainencedao.selectMaintainencePageListByCompanyIdAndState2(page);
	}
	
	@Override
	public List<Maintainence> getMaintainenceListByOperatorIdAndDate(Integer operatorId, Timestamp date) {
		return maintainencedao.selectMaintainenceListByOperatorIdAndDate(operatorId, date);
	}

	
}
