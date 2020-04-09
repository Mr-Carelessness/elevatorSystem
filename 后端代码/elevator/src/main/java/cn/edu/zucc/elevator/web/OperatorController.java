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
import cn.edu.zucc.elevator.entity.Operator;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.ManagerService;
import cn.edu.zucc.elevator.service.OperatorService;



@RestController
@RequestMapping("/operator")
public class OperatorController {
	@Autowired
	private OperatorService operatorService;

	@CrossOrigin
	@RequestMapping(value="/addOperator")
	@ResponseBody
	private ResultMap<String> addOperator(@RequestBody Operator operator){
		boolean ans = operatorService.addOperator(operator);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyOperator")
	@ResponseBody
	private ResultMap<String> modifyOperator(@RequestBody Operator operator){
		boolean ans = operatorService.modifyOperator(operator);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/removeOperator")
	@ResponseBody
	private ResultMap<String> removeOperator(Integer id){
		boolean ans = operatorService.removeOperator(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping("/getOperatorListByCompanyIdAndTypeAndRealname")
	@ResponseBody
	public ResultMap<List<Operator>> getOperatorListByCompanyIdAndTypeAndRealname(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") String companyId, @RequestParam("type") String type, String realname){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(companyId) && companyId!=null && Integer.valueOf(companyId) != -1) {
			pg.setUserid(companyId);
		}			
		if(!"".equals(realname) && realname!=null && Integer.valueOf(realname) != -1) {
			pg.setSubkeyWord(realname);;
		}			
		List<Operator> contentList = null;
		int totals = 0;
		if(type.equals(">0")==true || type.equals("GT0")==true) {
			contentList = operatorService.getOperatorPageListByCompanyAndTypeGT0AndName(pg);
			totals = operatorService.getOperatorPageCountByCompanyAndTypeGT0AndName(pg);
			pg.setTotalRecord(totals);
		}else {
			if(!"".equals(type) && type!=null && Integer.valueOf(type) != -1) {
				pg.setKeyWord(type);
			}	
			//System.out.println("page:"+page.toString());
			contentList = operatorService.getOperatorPageListByCompanyAndTypeAndName(pg);
			//System.out.println("结果大小："+contentList.size());
		    totals = operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg);
		    pg.setTotalRecord(totals);
		}
	    
	    return new ResultMap<List<Operator>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping(value="/getOperatorById")
	@ResponseBody
	private ResultMap<Operator> getOperatorById(@RequestParam("id") Integer id){
		Operator o = operatorService.getOperatorById(id);
		return new ResultMap<Operator>("操作成功！",o,0,0);
	}

	@CrossOrigin
	@RequestMapping(value="/getOperatorByUsername")
	@ResponseBody
	private ResultMap<Operator> getOperatorByUsername(@RequestParam("username") String username){
		Operator o = operatorService.getOperatorByUsername(username);
		return new ResultMap<Operator>("操作成功！",o,0,0);
	}

	@CrossOrigin
	@RequestMapping(value="/generateOperatorUsername")
	@ResponseBody
	private ResultMap<String> Manager(){
		Integer sd;
		String str;
		while(true) {
			sd = (int) Math.ceil(Math.random() * 99999);
			str = "user_" + String.valueOf(sd);
			if(operatorService.getOperatorByUsername(str) == null)
				break;
		}
		return new ResultMap<String>("操作成功！",str,0,0);
	}
}
