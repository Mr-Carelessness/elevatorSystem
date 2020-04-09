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

import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.Questionlist;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.entity.Safetytraining;
import cn.edu.zucc.elevator.service.ManagerService;
import cn.edu.zucc.elevator.service.SafetytrainingService;



@RestController
@RequestMapping("/safetyTraining")
public class SafetytrainingController {
	@Autowired
	private SafetytrainingService safetytrainingService;

	@CrossOrigin
	@RequestMapping(value="/addSafetyTraining")
	@ResponseBody
	private ResultMap<String> addSafetyTraining(@RequestBody Safetytraining safetytraining){
		boolean ans = safetytrainingService.addSafetyTraining(safetytraining);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifySafetyTraining")
	@ResponseBody
	private ResultMap<String> modifySafetyTraining(@RequestBody Safetytraining safetytraining){
		boolean ans = safetytrainingService.modifySafetyTraining(safetytraining);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/removeSafetyTraining")
	@ResponseBody
	private ResultMap<String> removeManager(Integer id){
		boolean ans = safetytrainingService.removeSafetyTraining(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/getSafetyTrainingById")
	@ResponseBody
	private ResultMap<Safetytraining> getQuestionById(@RequestParam("id") Integer id){
		Safetytraining m = safetytrainingService.getSafetytrainingById(id);
		if(m != null) {
			return new ResultMap<Safetytraining>("操作成功！",m,0,1);
		}else {
			return new ResultMap<Safetytraining>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping("/getSafetyTrainingListByCompanyId")
	@ResponseBody
	public ResultMap<List<Safetytraining>> getSafetyTrainingListByCompanyId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") String companyId){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(companyId) && companyId!=null) {
			pg.setKeyWord(companyId);
		}	
	    //System.out.println("page:"+page.toString());
	    List<Safetytraining> contentList = safetytrainingService.getSafetyTrainingPageListByCompanyId(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = safetytrainingService.getSafetyTrainingPageCountByCompanyId(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Safetytraining>>("操作成功！",contentList,0,totals);
	}
}
