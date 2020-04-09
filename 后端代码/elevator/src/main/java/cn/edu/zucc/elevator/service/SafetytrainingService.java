package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Safetytraining;

public interface SafetytrainingService {
	//新增安全培训
	boolean addSafetyTraining(Safetytraining safetytraining);
	//删除安全培训
	boolean removeSafetyTraining(int safetytrainingId);
	//修改管理员基本信息
	boolean modifySafetyTraining(Safetytraining safetytraining);
	//根据id获取安全培训
	Safetytraining getSafetytrainingById(int safetytrainingId);
	
	//获取公司安全培训列表(获取数据总数)
	Integer getSafetyTrainingPageCountByCompanyId(Page page);
	//获取公司安全培训列表(获取分页数据)
	List<Safetytraining> getSafetyTrainingPageListByCompanyId(Page page);
}
