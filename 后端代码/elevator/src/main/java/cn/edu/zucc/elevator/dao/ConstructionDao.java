package cn.edu.zucc.elevator.dao;

import java.sql.Timestamp;
import java.util.List;

import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;

public interface ConstructionDao {
	//新增施工记录
	int insertConstruction(Construction construction);
	//修改施工记录
	int updateConstruction(Construction construction);
	//删除施工记录
	int deleteConstruction(int constructionId);
	//根据id查询施工记录
	Construction selectConstructionById(int constructionId);
	//根据电梯id查询施工记录
	Construction selectConstructionByElevatorId(int elevatorId);
	
	
	//根据施工公司id与施工状态获取施工记录列表(获取数据总数)
	Integer selectConstructionPageCountByCompanyIdAndState(Page page);
	//根据施工公司id与施工状态获取施工记录列表(获取分页数据)
	List<Construction> selectConstructionPageListByCompanyIdAndState(Page page);
	List<Construction> selectConstructionPageListByCompanyIdAndState2(Page page);
	//按照日期与操作者id获取施工记录列表
	List<Construction> selectConstructionListByOperatorIdAndDate(int operatorId, Timestamp date);
}
