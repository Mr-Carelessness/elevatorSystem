package cn.edu.zucc.elevator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.ManagerDao;
import cn.edu.zucc.elevator.dao.QuestionlistDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Questionlist;
import cn.edu.zucc.elevator.service.QuestionlistService;

@Service
public class QuestionlistServiceImpl implements QuestionlistService {
	@Autowired
	private QuestionlistDao questionlistdao;

	@Transactional
	@Override
	public boolean addQuestion(Questionlist question) {
		if(question.getQuestion() != null && !"".equals(question.getQuestion()) && 
			question.getAnswerA() != null && !"".equals(question.getAnswerA())) {
			try {
				question.setDelflag(0);
				question.setFrequency(0);
				question.setPriority(0);
				int effectedNum = questionlistdao.insertQuestion(question);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("插入问题信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("问题信息与答案均不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean removeQuestion(int questionId) {
		if(questionId>0) {
			try {
				int effectedNum = questionlistdao.deleteQuestion(questionId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除问题信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("问题信息不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifyQuestion(Questionlist question) {
		if(question.getId() != null && question.getId() > 0) {
			try {
				int effectedNum = questionlistdao.updateQuestion(question);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新问题信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("问题信息不能为空！", -2);
		}
	}

	@Transactional
	@Override
	public boolean modifyQuestionFreq(Integer[] questionsId) {
		if(questionsId != null && questionsId.length > 0) {
			try {
				int effectedNum = questionlistdao.updateQuestionFreq(questionsId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新问题信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("所选问题不能为空！", -2);
		}
	}

	@Override
	public Questionlist getQuestionById(Integer questionId) {
		return questionlistdao.selectQuestionById(questionId);
	}

	@Override
	public Integer getQuestionPageCountByKeyword(Page page) {
		return questionlistdao.selectQuestionPageCountByKeyword(page);
	}

	@Override
	public List<Questionlist> getQuestionPageListByKeyword(Page page) {
		return questionlistdao.selectQuestionPageListByKeyword(page);
	}

	@Override
	public List<Questionlist> getQuestionListByIdArray(Integer []questionsId) {
		return questionlistdao.selectQuestionListByIdArray(questionsId);
	}

}
