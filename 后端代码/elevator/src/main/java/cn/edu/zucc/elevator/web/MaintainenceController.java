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
import cn.edu.zucc.elevator.service.ConstructionService;
import cn.edu.zucc.elevator.service.ElevatorService;
import cn.edu.zucc.elevator.service.IndicesService;
import cn.edu.zucc.elevator.service.MaintainenceService;
import cn.edu.zucc.elevator.service.ManagerService;



@RestController
@RequestMapping("/maintainence")
public class MaintainenceController {
	@Autowired
	private MaintainenceService maintainenceService;
	@Autowired
	private IndicesService indicesService;
	@Autowired
	private ElevatorService elevatorService;

	@CrossOrigin
	@RequestMapping(value="/addMaintainence")
	@ResponseBody
	private ResultMap<String> addConstruction(@RequestBody Maintainence maintainence){
		boolean ans = maintainenceService.addMaintainence(maintainence);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyOrArrangeMaintainenceCompany")
	@ResponseBody
	private ResultMap<String> modifyOrArrangeMaintainenceCompany(@RequestBody Maintainence maintainence){
		boolean ans = maintainenceService.modifyOrArrangeMaintainenceCompany(maintainence);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyOrArrangeMaintainenceTask")
	@ResponseBody
	private ResultMap<String> modifyOrArrangeConstructionTask(@RequestBody Maintainence maintainence){
		boolean ans = maintainenceService.modifyOrArrangeMaintainenceTask(maintainence);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/finishMaintainenceTask")
	@ResponseBody
	private ResultMap<String> finishMaintainenceTask(@RequestBody Maintainence maintainence, @RequestParam("type") Integer type){
		boolean ans = maintainenceService.finishMaintainenceTask(maintainence, type);
		if(ans == true) {
			Maintainence m = maintainenceService.getMaintainenceById(maintainence.getId());
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
	@RequestMapping(value="/removeMaintainence")
	@ResponseBody
	private ResultMap<String> removeMaintainence(@RequestParam("id") Integer id){
		boolean ans = maintainenceService.removeMaintainence(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/getMaintainenceById")
	@ResponseBody
	private ResultMap<Maintainence> getMaintainenceById(@RequestParam("id") Integer id){
		Maintainence maintainence = maintainenceService.getMaintainenceById(id);
		return new ResultMap<Maintainence>("操作成功！",maintainence,0,1);
	}
	

	@CrossOrigin
	@RequestMapping(value="/getMaintainenceByElevatorId")
	@ResponseBody
	private ResultMap<List<Maintainence>> getMaintainenceByElevatorId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("elevatorId") Integer elevatorId){
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		//System.out.println("电梯编号："+elevatorId);
		if(elevatorId!=null && Integer.valueOf(elevatorId) > 0) {
			pg.setUserid(String.valueOf(elevatorId));
		}	
	    //System.out.println("page:"+page.toString());
	    List<Maintainence> contentList = maintainenceService.getMaintainencePageListByElevatorId(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = maintainenceService.getMaintainencePageCountByElevatorId(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Maintainence>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getMaintainenceListByCompanyIdAndState")
	@ResponseBody
	public ResultMap<List<Maintainence>> getMaintainenceListByCompanyIdAndState(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") String companyId, @RequestParam("state") String state){
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
	    List<Maintainence> contentList = maintainenceService.getMaintainencePageListByCompanyIdAndState(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = maintainenceService.getMaintainencePageCountByCompanyIdAndState(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Maintainence>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getMaintainencePageListByOperatorIdAndDate") 
	@ResponseBody
	public ResultMap<List<Maintainence>> getMaintainencePageListByOperatorIdAndDate(@RequestParam("operatorId") String operatorId, @RequestParam("currentDate") Long currentDate){
		Timestamp date = null;
		if(currentDate != null && currentDate > 0) {
			date = new Timestamp(currentDate);
		}	
	    List<Maintainence> contentList = maintainenceService.getMaintainenceListByOperatorIdAndDate(Integer.valueOf(operatorId), date);
	    int totals = contentList.size();
	    return new ResultMap<List<Maintainence>>("操作成功！",contentList,0,totals);
	}
	
}
