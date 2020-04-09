package cn.edu.zucc.elevator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zucc.elevator.dao.IndicesDao;
import cn.edu.zucc.elevator.dao.UserexprDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Indices;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Userexpr;
import cn.edu.zucc.elevator.service.UserexprService;

@Service
public class UserexprServiceImpl implements UserexprService {
	@Autowired
	private UserexprDao userexprdao;
	@Autowired
	private IndicesDao indicesdao;
	
	@Override
	public boolean addUserexpr(Userexpr userexpr) {
		if(userexpr.getElevatorId() != null && !"".equals(userexpr.getElevatorId()) && 
			userexpr.getOperatorId() != null && !"".equals(userexpr.getOperatorId())) {
			if(userexpr.getScore() != null && userexpr.getScore() >= 0) {
				try {
					userexpr.setDelflag(0);
					int effectedNum = userexprdao.insertUserexpr(userexpr);
					if(effectedNum > 0) {
						Float score = userexprdao.selectUserexprAvgScore(userexpr.getElevatorId());
						ElevatorIndices indices = new ElevatorIndices();
						indices.setInd8(score);
						indices.setElevatorId(userexpr.getElevatorId());
						indicesdao.updateElevatorIndices(indices);
						return true;
					}else {
						throw new CustomException("插入用户体验信息失败！", -1);
					}
				}catch (Exception e) {
					throw new CustomException("错误提示：" + e.getMessage(), -1);
				}
			}else {
				throw new CustomException("用户评分必须≥0, ≤5", -2);
			}

		}else {
			throw new CustomException("用户体验对应的电梯及用户不能为空！", -2);
		}
	}

	@Override
	public boolean removeUserexpr(int userexprId) {
		if(userexprId>0) {
			try {
				int effectedNum = userexprdao.deleteUserexpr(userexprId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除用户体验信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("用户体验信息不能为空！", -2);
		}
	}

	@Override
	public Integer getUserexprPageCountByElevatorId(Page page) {
		return userexprdao.selectUserexprPageCountByElevatorId(page);
	}

	@Override
	public List<Userexpr> getUserexprPageListByElevatorId(Page page) {
		List<Userexpr> list = userexprdao.selectUserexprPageListByElevatorId(page);
        return list;
	}

	@Override
	public List<Userexpr> getUserexprPageListByOperatorIdAndElevatorId(int elevatorId, int operatorId) {
		List<Userexpr> list = userexprdao.selectUserexprPageListByOperatorIdAndElevatorId(elevatorId, operatorId);
        return list;
	}

}
