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

import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Example;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.DemoService;
import cn.edu.zucc.elevator.service.ExampleService;


@RestController
@RequestMapping("/example")
public class ExampleController {
	@Autowired
	private ExampleService exampleService;

	@CrossOrigin
	@RequestMapping(value="/getExampleById", method=RequestMethod.GET)
	private Map<String, Object> getExampleById(Integer id){
		Map<String, Object> modelMap = new HashMap<String, Object>();
		Example example = exampleService.queryExampleById(id);
		modelMap.put("example", example);
		modelMap.put("code", 0);
		return modelMap;
	}

	@CrossOrigin
	@RequestMapping("/getExamplePageByName")
	@ResponseBody
	public ResultMap<List<Example>> backContent(Page page,@RequestParam("limit") int limit){
	    //System.out.println("backContent========================"+limit);
	    page.setRows(limit);
	    //System.out.println("page:"+page.toString());
	    List<Example> contentList = exampleService.selectPageList(page);
	    int totals = exampleService.selectPageCount(page);
	    page.setTotalRecord(totals);
	    return new ResultMap<List<Example>>("",contentList,0,totals);
	}
	
}
