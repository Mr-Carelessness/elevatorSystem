package cn.edu.zucc.elevator.web;

import java.sql.Timestamp;
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

import cn.edu.zucc.elevator.entity.Construction;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.ConstructionService;
import cn.edu.zucc.elevator.service.ManagerService;



@RestController
@RequestMapping("/construction")
public class ConstructionController {
	@Autowired
	private ConstructionService constructionService;
	

	@CrossOrigin
	@RequestMapping(value="/addConstruction")
	@ResponseBody
	private ResultMap<String> addConstruction(@RequestBody Construction construction){
		boolean ans = constructionService.addConstruction(construction);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyOrArrangeConstructionCompany")
	@ResponseBody
	private ResultMap<String> modifyOrArrangeConstructionCompany(@RequestBody Construction construction){
		boolean ans = constructionService.modifyOrArrangeConstructionCompany(construction);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyOrArrangeConstructionTask")
	@ResponseBody
	private ResultMap<String> modifyOrArrangeConstructionTask(@RequestBody Construction construction){
		boolean ans = constructionService.modifyOrArrangeConstructionTask(construction);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/finishConstructionTask")
	@ResponseBody
	private ResultMap<String> finishConstructionTask(@RequestBody Construction construction, @RequestParam("type") Integer type){
		// type为0表示未完成，type为1表示已完成
		boolean ans = constructionService.finishConstructionTask(construction, type);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/getConstructionById")
	@ResponseBody
	private ResultMap<Construction> getConstructionById(@RequestParam("id") Integer id){
		Construction construction = constructionService.getConstructionById(id);
		return new ResultMap<Construction>("操作成功！",construction,0,1);
	}
	

	@CrossOrigin
	@RequestMapping(value="/getConstructionByElevatorId")
	@ResponseBody
	private ResultMap<Construction> getConstructionByElevatorId(@RequestParam("elevatorId") Integer elevatorId){
		Construction construction = constructionService.getConstructionByElevatorId(elevatorId);
		return new ResultMap<Construction>("操作成功！",construction,0,1);
	}
	

	@CrossOrigin
	@RequestMapping("/getConstructionListByCompanyIdAndState")
	@ResponseBody
	public ResultMap<List<Construction>> getConstructionListByCompanyIdAndState(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") String companyId, @RequestParam("state") String state){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(companyId) && companyId!=null && Integer.valueOf(companyId) > 0) {
			pg.setUserid(companyId);
		}	
		if(!"".equals(state) && state!=null && Integer.valueOf(state) != -1) {
			pg.setKeyWord(state);
		}
	    //System.out.println("page:"+page.toString());
	    List<Construction> contentList = constructionService.getConstructionPageListByCompanyIdAndState(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = constructionService.getConstructionPageCountByCompanyIdAndState(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Construction>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getConstructionPageListByOperatorIdAndDate") 
	@ResponseBody
	public ResultMap<List<Construction>> getConstructionPageListByOperatorIdAndDate(@RequestParam("operatorId") String operatorId, @RequestParam("currentDate") Long currentDate){
		Timestamp date = null;
		if(currentDate != null && currentDate > 0) {
			date = new Timestamp(currentDate);
		}	
		//System.out.println("当前时间：");
		//System.out.println(date);
	    List<Construction> contentList = constructionService.getConstructionPageListByOperatorIdAndDate(Integer.valueOf(operatorId), date);
	    int totals = contentList.size();
	    return new ResultMap<List<Construction>>("操作成功！",contentList,0,totals);
	}
	
}
