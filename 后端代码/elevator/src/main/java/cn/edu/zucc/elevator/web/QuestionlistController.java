package cn.edu.zucc.elevator.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zucc.elevator.entity.ArrayBody;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Questionlist;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.ManagerService;
import cn.edu.zucc.elevator.service.QuestionlistService;



@RestController
@RequestMapping("/question")
public class QuestionlistController {
	@Autowired
	private QuestionlistService questionlistService;
	

	@CrossOrigin
	@RequestMapping(value="/addQuestion")
	@ResponseBody
	private ResultMap<String> addQuestion(@RequestBody Questionlist question){
		boolean ans = questionlistService.addQuestion(question);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyQuestion")
	@ResponseBody
	private ResultMap<String> modifyQuestion(@RequestBody Questionlist question){
		boolean ans = questionlistService.modifyQuestion(question);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyQuestionFreq")
	@ResponseBody
	private ResultMap<String> modifyQuestionFreq(@RequestBody ArrayBody arrayBody){
		boolean ans = questionlistService.modifyQuestionFreq(arrayBody.getArr());
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/removeQuestion")
	@ResponseBody
	private ResultMap<String> removeQuestion(Integer id){
		boolean ans = questionlistService.removeQuestion(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/getQuestionById")
	@ResponseBody
	private ResultMap<Questionlist> getQuestionById(@RequestParam("id") Integer id){
		Questionlist m = questionlistService.getQuestionById(id);
		if(m != null) {
			return new ResultMap<Questionlist>("操作成功！",m,0,1);
		}else {
			return new ResultMap<Questionlist>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping("/getQuestionListByKeyword")
	@ResponseBody
	public ResultMap<List<Questionlist>> getQuestionListByKeyword(@RequestParam("page") int page, @RequestParam("limit") int limit, String keyword){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(keyword) && keyword!=null) {
			pg.setKeyWord(keyword);
		}	
	    //System.out.println("page:"+page.toString());
	    List<Questionlist> contentList = questionlistService.getQuestionPageListByKeyword(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = questionlistService.getQuestionPageCountByKeyword(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Questionlist>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getQuestionListByIdArray") 
	@ResponseBody
	public ResultMap<List<Questionlist>> getQuestionListByIdArray(@RequestBody ArrayBody arrayBody){
	    List<Questionlist> contentList = questionlistService.getQuestionListByIdArray(arrayBody.getArr());
	    int totals = contentList.size();
	    return new ResultMap<List<Questionlist>>("操作成功！",contentList,0,totals);
	}

}
