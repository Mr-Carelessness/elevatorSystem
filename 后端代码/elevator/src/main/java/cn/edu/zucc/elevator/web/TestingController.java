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
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.Maintainence;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.entity.Testing;
import cn.edu.zucc.elevator.service.ConstructionService;
import cn.edu.zucc.elevator.service.ElevatorService;
import cn.edu.zucc.elevator.service.IndicesService;
import cn.edu.zucc.elevator.service.MaintainenceService;
import cn.edu.zucc.elevator.service.ManagerService;
import cn.edu.zucc.elevator.service.TestingService;



@RestController
@RequestMapping("/testing")
public class TestingController {
	@Autowired
	private TestingService testingService;
	@Autowired
	private IndicesService indicesService;
	@Autowired
	private ElevatorService elevatorService;

	@CrossOrigin
	@RequestMapping(value="/addTesting")
	@ResponseBody
	private ResultMap<String> addTesting(@RequestBody Testing testing){
		boolean ans = testingService.addTesting(testing);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyOrArrangeTestingCompany")
	@ResponseBody
	private ResultMap<String> modifyOrArrangeTestingCompany(@RequestBody Testing testing){
		boolean ans = testingService.modifyOrArrangeTestingCompany(testing);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyOrArrangeTestingTask")
	@ResponseBody
	private ResultMap<String> modifyOrArrangeTestingTask(@RequestBody Testing testing){
		boolean ans = testingService.modifyOrArrangeTestingTask(testing);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/finishTestingTask")
	@ResponseBody
	private ResultMap<String> finishTestingTask(@RequestBody Testing testing, @RequestParam("type") Integer type){
		boolean ans = testingService.finishTestingTask(testing, type);
		if(ans == true) {
			Testing m = testingService.getTestingById(testing.getId());
			Elevator elevator = new Elevator();
			elevator.setId(m.getElevator().getId());
			elevator.setScore(indicesService.calculateElevatorScore(m.getElevator().getId())); 
			elevatorService.modifyElevator(elevator);
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/addTestingImg")
	@ResponseBody
	private ResultMap<String> addTestingImg(@RequestBody Testing testing){
		boolean ans = testingService.addTestingImg(testing);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/removeTesting")
	@ResponseBody
	private ResultMap<String> removeTesting(@RequestParam("id") Integer id){
		boolean ans = testingService.removeTesting(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/getTestingById")
	@ResponseBody
	private ResultMap<Testing> getTestingById(@RequestParam("id") Integer id){
		Testing testing = testingService.getTestingById(id);
		return new ResultMap<Testing>("操作成功！",testing,0,1);
	}
	

	@CrossOrigin
	@RequestMapping(value="/getTestingByElevatorId")
	@ResponseBody
	private ResultMap<List<Testing>> getTestingByElevatorId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("elevatorId") Integer elevatorId){
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(elevatorId) && elevatorId!=null && Integer.valueOf(elevatorId) > 0) {
			pg.setUserid(String.valueOf(elevatorId));
		}	
	    //System.out.println("page:"+page.toString());
	    List<Testing> contentList = testingService.getTestingPageListByElevatorId(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = testingService.getTestingPageCountByElevatorId(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Testing>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getTestingListByCompanyIdAndState")
	@ResponseBody
	public ResultMap<List<Testing>> getTestingListByCompanyIdAndState(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") String companyId, @RequestParam("state") String state){
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
	    List<Testing> contentList = testingService.getTestingPageListByCompanyIdAndState(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = testingService.getTestingPageCountByCompanyIdAndState(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Testing>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getTestingListByOperatorIdAndDate") 
	@ResponseBody
	public ResultMap<List<Testing>> getTestingListByOperatorIdAndDate(@RequestParam("operatorId") String operatorId, @RequestParam("currentDate") Long currentDate){
		Timestamp date = null;
		if(currentDate != null && currentDate > 0) {
			date = new Timestamp(currentDate);
		}	
	    List<Testing> contentList = testingService.getTestingListByOperatorIdAndDate(Integer.valueOf(operatorId), date);
	    int totals = contentList.size();
	    return new ResultMap<List<Testing>>("操作成功！",contentList,0,totals);
	}
	
}
