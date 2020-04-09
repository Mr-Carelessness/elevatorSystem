package cn.edu.zucc.elevator.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zucc.elevator.dao.IndicesDao;
import cn.edu.zucc.elevator.dao.TestingDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Maintainence;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Testing;
import cn.edu.zucc.elevator.service.TestingService;

@Service
public class TestingServiceImpl implements TestingService {
	@Autowired
	private TestingDao testingdao;
	@Autowired
	private IndicesDao indicesdao;
	
	@Override
	public boolean addTesting(Testing testing) {
		if(testing.getElevatorId() != null && testing.getElevatorId()>0 && 
			testing.getCompanyId() != null && testing.getCompanyId()>0 ) {
			try {
				testing.setScore(Float.valueOf(0));
				testing.setDelflag(0);
				testing.setState(0);//状态：未完成并且未安排人员
				int effectedNum = testingdao.insertTesting(testing);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("插入检测信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("请选择检测电梯以及检测公司！", -2);
		}
	}

	@Override
	public boolean removeTesting(Integer testingId) {
		if(testingId != null && testingId > 0) {
			try {
				Testing ms = testingdao.selectTestingById(testingId);
				if(ms.getState() > 0) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				int effectedNum = testingdao.deleteTesting(testingId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除检测记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("检测记录信息不能为空！", -2);
		}
	}

	@Override
	public boolean modifyOrArrangeTestingCompany(Testing testing) {
		if(testing.getId() != null && testing.getId() > 0 && 
			testing.getElevatorId() != null && testing.getElevatorId()>0) {
			try {
				Testing ms = testingdao.selectTestingById(testing.getId());
				if(ms.getState() != 0) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				int effectedNum = testingdao.updateTesting(testing);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新检测记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("检测记录信息以及对应检测负责公司不能为空！", -2);
		}
	}

	@Override
	public boolean modifyOrArrangeTestingTask(Testing testing) {
		if(testing.getId() != null && testing.getId() > 0 && 
			testing.getOperatorId() != null && testing.getOperatorId()>0) {
			try {
				Testing ms = testingdao.selectTestingById(testing.getId());
				if(ms.getState() > 1) {
					throw new CustomException("当前状态下不能进行此操作！", -3);
				}
				testing.setState(1);
				int effectedNum = testingdao.updateTesting(testing);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新检测记录信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("检测记录信息以及检测负责人不能为空！", -2);
		}
	}

	@Override
	public boolean finishTestingTask(Testing testing, Integer type) {
		if(testing.getId() != null && testing.getId() > 0) {
			if(testing.getScore() != null && testing.getScore()>=0 && testing.getScore()<=5) {
				try {
					Testing ms = testingdao.selectTestingById(testing.getId());
					if(ms.getState() < 1) {
						throw new CustomException("当前状态下不能进行此操作！", -3);
					}
					if(type == 1) {
						testing.setState(2);
					}
					testing.setRealFinishDate(new Timestamp(System.currentTimeMillis()));
					int effectedNum = testingdao.updateTesting(testing);
					if(effectedNum > 0) {
						//System.out.println("电梯编号："+ms.getElevator().getId());
						float avgScore = testingdao.selectTestingAvgScore(ms.getElevator().getId());
						ElevatorIndices indices = new ElevatorIndices();
						indices.setInd5(avgScore);
						indices.setElevatorId(ms.getElevator().getId());
						indicesdao.updateElevatorIndices(indices);
						return true;
					}else {
						throw new CustomException("更新检测记录信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("打分必须在0~5分范围之内", -2);
			}
		}else {
			throw new CustomException("检测记录信息不能为空！", -2);
		}
	}

	@Override
	public boolean addTestingImg(Testing testing) { 
		if(testing.getId() != null && testing.getId() > 0) {
			if(testing.getResultUrl() != null && !"".equals(testing.getResultUrl())) {
				try {
					Testing ms = testingdao.selectTestingById(testing.getId());
					if(ms.getState() < 1) {
						throw new CustomException("当前状态下不能进行此操作！", -3);
					}
					int effectedNum = testingdao.updateTesting(testing);
					if(effectedNum > 0) {
						return true;
					}else {
						throw new CustomException("更新检测记录信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("必须含有检测结果图片地址", -2);
			}
		}else {
			throw new CustomException("检测记录信息不能为空！", -2);
		}
	}

	@Override
	public Testing getTestingById(Integer testingId) {
		return testingdao.selectTestingById(testingId);
	}

	@Override
	public Integer getTestingPageCountByElevatorId(Page page) {
		return testingdao.selectTestingPageCountByElevatorId(page);
	}

	@Override
	public List<Testing> getTestingPageListByElevatorId(Page page) {
		return testingdao.selectTestingPageListByElevatorId(page);
	}

	@Override
	public Integer getTestingPageCountByCompanyIdAndState(Page page) {
		return testingdao.selectTestingPageCountByCompanyIdAndState(page);
	}

	@Override
	public List<Testing> getTestingPageListByCompanyIdAndState(Page page) {
		return testingdao.selectTestingPageListByCompanyIdAndState(page);
	}
	public List<Testing> getTestingPageListByCompanyIdAndState2(Page page) {
		return testingdao.selectTestingPageListByCompanyIdAndState2(page);
	}

	@Override
	public List<Testing> getTestingListByOperatorIdAndDate(Integer operatorId, Timestamp date) {
		return testingdao.selectTestingListByOperatorIdAndDate(operatorId, date);
	}

}
