package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Questionlist;

public interface QuestionlistDao {
	//新增问题
	int insertQuestion(Questionlist question);
	//修改问题
	int updateQuestion(Questionlist question);	
	//增加问题的频度
	int updateQuestionFreq(Integer []questionsId);
	//删除问题
	int deleteQuestion(int questionId);
	//根据id查询问题
	Questionlist selectQuestionById(Integer questionId);
	
	//根据问题关键字获取问题列表(获取数据总数)
	Integer selectQuestionPageCountByKeyword(Page page);
	//根据问题关键字获取问题列表(获取分页数据)
	List<Questionlist> selectQuestionPageListByKeyword(Page page);
	//根据问题id数组获取问题列表
	List<Questionlist> selectQuestionListByIdArray(Integer []questionsId);
}
