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

import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.entity.Userexpr;
import cn.edu.zucc.elevator.service.ElevatorService;
import cn.edu.zucc.elevator.service.IndicesService;
import cn.edu.zucc.elevator.service.ManagerService;
import cn.edu.zucc.elevator.service.UserexprService;



@RestController
@RequestMapping("/userexpr")
public class UserexprController {
	@Autowired
	private UserexprService userexprService;
	@Autowired
	private IndicesService indicesService;
	@Autowired
	private ElevatorService elevatorService;
	

	@CrossOrigin
	@RequestMapping(value="/addUserexpr")
	@ResponseBody
	private ResultMap<String> addUserexpr(@RequestBody Userexpr userexpr){
		boolean ans = userexprService.addUserexpr(userexpr);
		if(ans == true) {
			Elevator elevator = new Elevator();
			elevator.setId(userexpr.getElevatorId());
			elevator.setScore(indicesService.calculateElevatorScore(userexpr.getElevatorId())); 
			elevatorService.modifyElevator(elevator);
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/removeUserexpr")
	@ResponseBody
	private ResultMap<String> removeUserexpr(Integer id){
		boolean ans = userexprService.removeUserexpr(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping("/getUserexprListByElevatorId")
	@ResponseBody
	public ResultMap<List<Userexpr>> getUserexprPageListByElevatorId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("elevatorId") String elevatorId){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(elevatorId) && elevatorId!=null && Integer.valueOf(elevatorId)>0) {
			pg.setKeyWord(elevatorId);
		}	
	    //System.out.println("page:"+page.toString());
	    List<Userexpr> contentList = userexprService.getUserexprPageListByElevatorId(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = userexprService.getUserexprPageCountByElevatorId(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Userexpr>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getUserexprPageListByOperatorIdAndElevatorId") 
	@ResponseBody
	public ResultMap<List<Userexpr>> getManagerListByCompanyId(@RequestParam("elevatorId") int elevatorId, @RequestParam("operatorId") int operatorId){
	    //System.out.println("page:"+page.toString());
	    List<Userexpr> contentList = userexprService.getUserexprPageListByOperatorIdAndElevatorId(elevatorId, operatorId);
	    int totals = contentList.size();
	    return new ResultMap<List<Userexpr>>("操作成功！",contentList,0,totals);
	}
	
}
