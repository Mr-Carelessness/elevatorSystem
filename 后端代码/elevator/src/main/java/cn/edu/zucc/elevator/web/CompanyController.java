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

import cn.edu.zucc.elevator.entity.Company;
import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Example;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.CompanyService;
import cn.edu.zucc.elevator.service.DemoService;

@RestController
@RequestMapping("/company")
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	
	@CrossOrigin
	@RequestMapping(value="/addCompany")
	@ResponseBody
	private ResultMap<String> addCompany(@RequestBody Company company){
		boolean ans = companyService.addCompany(company);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/modifyCompany")
	@ResponseBody
	private ResultMap<String> modifyCompany(@RequestBody Company company){
		boolean ans = companyService.modifyCompany(company);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/removeCompany")
	@ResponseBody
	private ResultMap<String> removeCompany(Integer id){
		boolean ans = companyService.removeCompany(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value="/getCompanyById")
	@ResponseBody
	private ResultMap<Company> getCompanyById(@RequestParam("id") int id){
		Company company = companyService.getCompanyById(id);
		return new ResultMap<Company>("操作成功！",company,0,1);
	}

	@CrossOrigin
	@RequestMapping("/getCompanyListByType")
	@ResponseBody
	public ResultMap<List<Company>> getCompanyListByType(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("type") String type){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(type) && type!=null) {
			int tp = Integer.valueOf(type);
			if(tp == 1) {
				pg.setKeyWord("1___");
			}else if(tp == 2) {
				pg.setKeyWord("_1__");
			}else if(tp == 3) {
				pg.setKeyWord("__1_");
			}else if(tp == 4) {
				pg.setKeyWord("___1");
			}
		}	
	    //System.out.println("page:"+page.toString());
	    List<Company> contentList = companyService.getCompanyPageListByType(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = companyService.getCompanyPageCountByType(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Company>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getCompanyListByName") 
	@ResponseBody
	public ResultMap<List<Company>> getManagerListByCompanyId(@RequestParam("page") int page, @RequestParam("limit") int limit, String name){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		//System.out.println(pg.getStart());
		pg.setStart(pg.getStart());
		System.out.println("★名字："+name);
		if(name!=null && !"".equals(name)) {
			pg.setKeyWord(name);
		}	
	    //System.out.println("page:"+page.toString());
	    List<Company> contentList = companyService.getCompanyPageListByName(pg);
	    int totals = companyService.getCompanyPageCountByName(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Company>>("操作成功！",contentList,0,totals);
	}
	
}
