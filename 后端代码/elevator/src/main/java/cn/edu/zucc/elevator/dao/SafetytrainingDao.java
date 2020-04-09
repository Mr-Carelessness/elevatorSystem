package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Safetytraining;

public interface SafetytrainingDao {
	//新增安全培训
	int insertSafetyTraining(Safetytraining safetytraining);
	//修改安全培训基本信息
	int updateSafetyTraining(Safetytraining safetytraining);	
	//删除安全培训
	int deleteSafetyTraining(int safetytrainingId);
	//根据id查询安全培训
	Safetytraining selectSafetytrainingById(int safetytrainingId);
	
	//获取公司安全培训列表(获取数据总数)
	Integer selectSafetyTrainingPageCountByCompanyId(Page page);
	//获取公司安全培训列表(获取分页数据)
	List<Safetytraining> selectSafetyTrainingPageListByCompanyId(Page page);
}
