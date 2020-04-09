package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Questionlist;

public interface QuestionlistService {
	//新增问题
	boolean addQuestion(Questionlist question);
	//删除管理员
	boolean removeQuestion(int questionId);
	//修改问题基本信息
	boolean modifyQuestion(Questionlist question);
	//增加问题的频度
	boolean modifyQuestionFreq(Integer []questionsId);
	//根据id查询问题
	Questionlist getQuestionById(Integer questionId);
	
	//根据问题关键字获取问题列表(获取数据总数)
	Integer getQuestionPageCountByKeyword(Page page);
	//根据问题关键字获取问题列表(获取分页数据)
	List<Questionlist> getQuestionPageListByKeyword(Page page);
	//根据问题id数组获取问题列表
	List<Questionlist> getQuestionListByIdArray(Integer []questionsId);
	
}
