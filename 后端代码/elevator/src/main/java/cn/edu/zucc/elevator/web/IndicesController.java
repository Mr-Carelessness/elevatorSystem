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

import cn.edu.zucc.elevator.dao.IndicesDao;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorIndices;
import cn.edu.zucc.elevator.entity.Indices;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.ElevatorService;
import cn.edu.zucc.elevator.service.IndicesService;
import cn.edu.zucc.elevator.service.ManagerService;



@RestController
@RequestMapping("/indices")
public class IndicesController {
	@Autowired
	private IndicesService indicesService;


	@CrossOrigin
	@RequestMapping(value="/calculateElevatorScore")
	@ResponseBody
	private ResultMap<Float> calculateElevatorScore(@RequestParam("elevatorId") int elevatorId){
		Float ans = indicesService.calculateElevatorScore(elevatorId);
		return new ResultMap<Float>("操作成功！",ans,0,0);
	}

	@CrossOrigin
	@RequestMapping(value="/modifyElevatorIndices")
	@ResponseBody
	private ResultMap<String> modifyElevatorIndices(@RequestBody ElevatorIndices elevatorIndices){
		if(elevatorIndices.getInd1() != null && elevatorIndices.getInd2() != null && elevatorIndices.getInd3() != null && elevatorIndices.getInd9() != null) {
			elevatorIndices.setState(1);
		}
		boolean ans = indicesService.modifyElevatorIndices(elevatorIndices);
		if(ans == true) {
			indicesService.calculateElevatorScore(elevatorIndices.getElevatorId());
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/getElevatorIndicesByElevatorId")
	@ResponseBody
	private ResultMap<ElevatorIndices> getElevatorIndicesByElevatorId(@RequestParam("elevatorId") int elevatorId){
		ElevatorIndices ans = indicesService.getElevatorIndicesByElevatorId(elevatorId);
		return new ResultMap<ElevatorIndices>("操作成功！",ans,0,0); 
	}

	@CrossOrigin
	@RequestMapping(value="/getWeightOfIndices")
	@ResponseBody
	private ResultMap<Indices> getWeightOfIndices(){
		Indices ans = indicesService.getWeightOfIndices();
		return new ResultMap<Indices>("操作成功！",ans,0,0); 
	}
	
	@CrossOrigin
	@RequestMapping(value="/updateWeightOfIndices")
	@ResponseBody
	private ResultMap<String> updateWeightOfIndices(@RequestBody Indices indices){
		boolean ans = indicesService.modifyWeightOfIndices(indices);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/calculateAverageElevatorIndices")
	@ResponseBody
	private ResultMap<Indices> calculateAverageElevatorIndices(){
		Indices ans = indicesService.calculateAverageElevatorIndices();
		return new ResultMap<Indices>("操作成功！",ans,0,0);
	}

	@CrossOrigin
	@RequestMapping(value="/getElevatorListByNameAndCompanyId")
	@ResponseBody
	private ResultMap<List<ElevatorIndices>> getElevatorListByNameAndCompanyId(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("name") String name, @RequestParam("companyId") String companyId){
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		//System.out.println(pg.getStart());
		pg.setStart(pg.getStart());
		if(!"".equals(companyId) && companyId!=null) {
			pg.setUserid(companyId);
		}
		if(!"".equals(name) && name!=null) {
			pg.setKeyWord(name);
		}
	    //System.out.println("page:"+page.toString());
	    List<ElevatorIndices> contentList = indicesService.getElevatorPageListByNameAndCompanyId(pg);
	    int totalCount = indicesService.getElevatorPageCountByNameAndCompanyId(pg);
	    pg.setTotalRecord(totalCount);
	    return new ResultMap<List<ElevatorIndices>>("操作成功！",contentList,0,totalCount);
	}

	@CrossOrigin
	@RequestMapping(value="/modifyElevatorIndicesAndElevatorScoreByCompanyId")
	@ResponseBody
	private ResultMap<String> modifyElevatorIndicesAndElevatorScoreByCompanyId(@RequestParam("companyId") String companyId, @RequestParam("ind1") float ind1, @RequestParam("ind2") float ind2, @RequestParam("ind3") float ind3, @RequestParam("ind9") float ind9){
		ElevatorIndices elevatorIndices = new ElevatorIndices();
		elevatorIndices.setInd1(ind1);
		elevatorIndices.setInd2(ind2);
		elevatorIndices.setInd3(ind3);
		elevatorIndices.setInd9(ind9);
		boolean ans = indicesService.modifyElevatorIndicesAndElevatorScoreByCompanyId(Integer.valueOf(companyId), elevatorIndices);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
}
