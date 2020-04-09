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
import cn.edu.zucc.elevator.service.ManagerService;



@RestController
@RequestMapping("/manager")
public class ManagerController {
	@Autowired
	private ManagerService managerService;
	

	@CrossOrigin
	@RequestMapping(value="/addManager")
	@ResponseBody
	private ResultMap<String> addManager(@RequestBody Manager manager){
		boolean ans = managerService.addManager(manager);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyManager")
	@ResponseBody
	private ResultMap<String> modifyManager(@RequestBody Manager manager){
		boolean ans = managerService.modifyManager(manager);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/removeManager")
	@ResponseBody
	private ResultMap<String> removeManager(Integer id){
		boolean ans = managerService.removeManager(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping("/getManagerById") 
	@ResponseBody
	public ResultMap<Manager> getElevatorById(@RequestParam("id") Integer id){
		Manager manager = managerService.getManagerById(id);
	    return new ResultMap<Manager>("",manager,0,1);
	}
	
	
	@CrossOrigin
	@RequestMapping("/getManagerListByType")
	@ResponseBody
	public ResultMap<List<Manager>> getManagerListByType(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("type") String type){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(type) && type!=null && Integer.valueOf(type) != -1) {
			pg.setKeyWord(type);
		}	
	    //System.out.println("page:"+page.toString());
	    List<Manager> contentList = managerService.getManagerPageListByType(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = managerService.getPageCountByType(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Manager>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getManagerListByCompanyIdAndName") 
	@ResponseBody
	public ResultMap<List<Manager>> getManagerListByCompanyIdAndName(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("companyId") String id, String mname){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		//System.out.println(pg.getStart());
		pg.setStart(pg.getStart());
		if(id!="") {
			pg.setKeyWord(id);
		}	
		if(mname!="") {
			pg.setSubkeyWord(mname);
		}	
	    //System.out.println("page:"+page.toString());
	    List<Manager> contentList = managerService.getManagerPageListByCompanyIdAndName(pg);
	    int totals = managerService.getPageCountByCompanyIdAndName(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Manager>>("操作成功！",contentList,0,totals);
	}

	@CrossOrigin
	@RequestMapping(value="/loginManager")
	@ResponseBody
	private ResultMap<Manager> Manager(@RequestParam("username") String username, @RequestParam("password") String password){
		Manager m = managerService.loginManager(username, password);
		if(m != null) {
			return new ResultMap<Manager>("登录成功！",m,0,0);
		}else {
			return new ResultMap<Manager>("登录失败！",null,-1,0);
		}
	}
}
