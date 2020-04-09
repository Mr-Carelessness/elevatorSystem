package cn.edu.zucc.elevator.web;

import java.sql.Date;
import java.sql.Timestamp;
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

import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Inspection;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.ElevatorService;
import cn.edu.zucc.elevator.service.IndicesService;
import cn.edu.zucc.elevator.service.InspectionService;



@RestController
@RequestMapping("/inspection")
public class InspectionController {
	@Autowired
	private InspectionService inspectionService;
	@Autowired
	private IndicesService indicesService;
	@Autowired
	private ElevatorService elevatorService;

	
	@CrossOrigin
	@RequestMapping(value="/addInspection")
	@ResponseBody
	private ResultMap<String> addInspection(@RequestBody Inspection inspection){
		boolean ans = inspectionService.addInspection(inspection);
		if(ans == true) {
			int ef2;
			// ▲ 修改巡查情况平均分
			float avgScore =  inspectionService.getInspectionAvgScore(inspection.getElevatorId());
			ElevatorIndices indices = indicesService.getElevatorIndicesByElevatorId(inspection.getElevatorId());
			indices.setInd4(avgScore);
			ans = indicesService.modifyElevatorIndices(indices);
			// 修改电梯总得分
			if(ans == true) {
				Elevator elevator = new Elevator();
				elevator.setId(inspection.getElevatorId());
				elevator.setScore(indicesService.calculateElevatorScore(inspection.getElevatorId()));
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
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
		
	}

	@CrossOrigin
	@RequestMapping(value="/removeInspection")
	@ResponseBody
	private ResultMap<String> removeInspection(@RequestParam("id") Integer id){
		boolean ans = inspectionService.removeInspection(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/getInspectionById")
	@ResponseBody
	private ResultMap<Inspection> getInspectionById(@RequestParam("id") Integer id){
		Inspection ans = inspectionService.getInspectionById(id);
		return new ResultMap<Inspection>("操作成功！",ans,0,0);
	}

	@CrossOrigin
	@RequestMapping("/getInspectionListByOperatorIdAndDate")
	@ResponseBody
	public ResultMap<List<Inspection>> getInspectionListByOperatorIdAndDate(@RequestParam("operatorId") Integer operatorId, @RequestParam("currentDate") Long currentDate){
		Date date = null;
		if(currentDate != null && currentDate > 0) {
			date = new Date(currentDate);
		}
		List<Inspection> contentList = inspectionService.getInspectionListByOperatorIdAndDate(operatorId, date);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = contentList.size();
	    return new ResultMap<List<Inspection>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getInspectionPageListByElevatorId") 
	@ResponseBody
	public ResultMap<List<Inspection>> getInspectionPageListByElevatorId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("elevatorId") Integer elevatorId){
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		//System.out.println(pg.getStart());
		pg.setStart(pg.getStart());
		if(elevatorId!=null && elevatorId>0) {
			pg.setUserid(String.valueOf(elevatorId));
		}	
	    //System.out.println("page:"+page.toString());
	    List<Inspection> contentList = inspectionService.getInspectionPageListByElevatorId(pg);
	    int totals = inspectionService.getInspectionPageCountByElevatorId(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Inspection>>("操作成功！",contentList,0,totals);
	}

	@CrossOrigin
	@RequestMapping("/getInspectionPageListByOperatorId")
	@ResponseBody
	public ResultMap<List<Inspection>> getInspectionPageListByOperatorId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("operatorId") Integer operatorId){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(operatorId!=null && operatorId>0) {
			pg.setUserid(String.valueOf(operatorId));
		}	
	    //System.out.println("page:"+page.toString());
	    List<Inspection> contentList = inspectionService.getInspectionPageListByOperatorId(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = inspectionService.getInspectionPageCountByOperatorId(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Inspection>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getInspectionPageListByCompanyIdAndDate") 
	@ResponseBody
	public ResultMap<List<Inspection>> getInspectionPageListByCompanyIdAndDate(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") Integer companyId, @RequestParam("currentDate") Long currentDate){
		Date date = null;
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		//System.out.println(pg.getStart());
		pg.setStart(pg.getStart());
		if(currentDate != null && currentDate > 0) {
			date = new Date(currentDate); 
			//currentDate = null;
		}
		if(companyId!=null && companyId>0) {
			pg.setUserid(String.valueOf(companyId));
		}	
	    //System.out.println("page:"+pg.toString());
	    List<Inspection> contentList = inspectionService.getInspectionPageListByCompanyIdAndDate(pg, companyId, date);
	    int totals = inspectionService.getInspectionPageCountByCompanyIdAndDate(pg, companyId, date);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Inspection>>("操作成功！",contentList,0,totals);
	}
}
