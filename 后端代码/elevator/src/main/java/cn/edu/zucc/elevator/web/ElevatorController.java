package cn.edu.zucc.elevator.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.zucc.elevator.dao.ElevatorDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Example;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.ElevatorService;
import cn.edu.zucc.elevator.service.IndicesService;
import cn.edu.zucc.elevator.service.ManagerService;



@RestController
@RequestMapping("/elevator")
public class ElevatorController {
	@Autowired
	private ElevatorService elevatorService;
	@Autowired
	private IndicesService indicesService;

	@CrossOrigin
	@RequestMapping(value="/addElevator")
	@ResponseBody
	private ResultMap<String> addElevator(@RequestBody Elevator elevator){
		int id = elevatorService.addElevator(elevator);
		if(id < 0) {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
		ElevatorIndices elevatorIndices = new ElevatorIndices();
		elevatorIndices.setCompanyId(elevator.getCompanyId());
		elevatorIndices.setElevatorId(id);
		elevatorIndices.setState(0);
		elevatorIndices.setInd1(new Float(0));
		elevatorIndices.setInd2(new Float(0));
		elevatorIndices.setInd3(new Float(0));
		elevatorIndices.setInd4(new Float(5));
		elevatorIndices.setInd5(new Float(5));
		elevatorIndices.setInd6(new Float(5));
		elevatorIndices.setInd7(new Float(0));
		elevatorIndices.setInd8(new Float(5));
		elevatorIndices.setInd9(new Float(0));
		elevatorIndices.setInd10(new Float(5));
		elevatorIndices.setInd11(new Float(5));
		elevatorIndices.setInd12(new Float(5));
		boolean ans = indicesService.addElevatorIndices(elevatorIndices);
		
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			elevatorService.removeElevator(id);
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@Transactional
	@RequestMapping(value="/modifyElevator")
	@ResponseBody
	private ResultMap<String> modifyElevator(@RequestBody Elevator elevator){
		boolean ans;
		float score = 0;
		// 如果电梯当前状态发生了改变，修改电梯及指标得分
		if(elevator.getState()!=null && elevator.getState()>0) {
			// 运行中
			if(elevator.getState() == 2) 			score = 5;
			// 维修中
			else if(elevator.getState() == 3)		score = 2;
			
			// 如果电梯运行或停止维修，电梯开始计算总得分，并且修改变化的指标得分
			if(score > 0) {
				ElevatorIndices ei = indicesService.getElevatorIndicesByElevatorId(elevator.getId());
				ei.setInd7(score);
				ans = indicesService.modifyElevatorIndices(ei);
				if(ans == true) {
					// 计算总得分并且进行修改
					float sc = indicesService.calculateElevatorScore(elevator.getId());
					elevator.setScore(sc);
					ans = elevatorService.modifyElevator(elevator);
					if(ans == true) {
						return new ResultMap<String>("操作成功！",null,0,0);
					}else {
						throw new CustomException("操作失败！", -1);
					}
				}else {
					throw new CustomException("操作失败！", -1);
				}
			}else {
				ans = elevatorService.modifyElevator(elevator);
				if(ans == true) {
					return new ResultMap<String>("操作成功！",null,0,0);
				}else {
					return new ResultMap<String>("操作失败！",null,-1,0);
				}
			}
		}else {
			ans = elevatorService.modifyElevator(elevator);
			if(ans == true) {
				return new ResultMap<String>("操作成功！",null,0,0);
			}else {
				return new ResultMap<String>("操作失败！",null,-1,0);
			}
		}
	}

	@CrossOrigin
	@RequestMapping(value="/removeElevator")
	@ResponseBody
	private ResultMap<String> removeElevator(Integer id){
		boolean ans = elevatorService.removeElevator(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping("/getElevatorById") 
	@ResponseBody
	public ResultMap<Elevator> getElevatorById(@RequestParam("id") Integer id){
	    Elevator elevator = elevatorService.getElevatorById(id);
	    return new ResultMap<Elevator>("",elevator,0,1);
	}

	@CrossOrigin
	@RequestMapping("/getElevatorListByNameAndCompanyId")
	@ResponseBody
	public ResultMap<List<Elevator>> getElevatorListByNameAndCompanyId(@RequestParam("page") int page, @RequestParam("limit") int limit, String name, @RequestParam("companyId") String companyId){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(name) && name!=null) {
			pg.setKeyWord(name);
		}	
		if(!"".equals(companyId) && companyId!=null) {
			pg.setUserid(companyId);
		}
	    //System.out.println("page:"+page.toString());
	    List<Elevator> contentList = elevatorService.getElevatorPageListByNameAndCompanyId(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = elevatorService.getElevatorPageCountByNameAndCompanyId(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Elevator>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getElevatorListByCompanyId") 
	@ResponseBody
	public ResultMap<List<Elevator>> getElevatorListByCompanyId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") String companyId){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		//System.out.println(pg.getStart());
		pg.setStart(pg.getStart());
		if(!"".equals(companyId) && companyId!=null) {
			pg.setUserid(companyId);
		}
	    //System.out.println("page:"+page.toString());
	    List<Elevator> contentList = elevatorService.getElevatorListByCompanyId(pg);
	    pg.setTotalRecord(contentList.size());
	    return new ResultMap<List<Elevator>>("操作成功！",contentList,0,contentList.size());
	}

	@CrossOrigin
	@RequestMapping("/getElevatorListByGeoPosition") 
	@ResponseBody
	public ResultMap<List<Elevator>> getElevatorListByGeoPosition(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("longtitude") double longtitude, @RequestParam("latitude") double latitude){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		//System.out.println(pg.getStart());
		pg.setStart(pg.getStart());
		pg.setKeyWord(String.valueOf(longtitude));
		pg.setSubkeyWord(String.valueOf(latitude));
	    //System.out.println("page:"+page.toString());
	    List<Elevator> contentList = elevatorService.getElevatorListByGeoPosition(pg);
	    pg.setTotalRecord(contentList.size());
	    return new ResultMap<List<Elevator>>("操作成功！",contentList,0,contentList.size());
	}
}
