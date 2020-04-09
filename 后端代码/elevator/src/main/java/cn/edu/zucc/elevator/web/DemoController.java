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

import cn.edu.zucc.elevator.entity.ArrayBody;
import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.DemoService;


//@CrossOrigin
@RestController
@RequestMapping("/demo")
public class DemoController {
	@Autowired
	private DemoService demoService;

	@CrossOrigin
	@RequestMapping(value="/listDemo", method=RequestMethod.GET)
	private Map<String,Object> listDemo(HttpServletResponse response){
		Map<String,Object> modelMap = new HashMap<String,Object>();
		response.addHeader("Access-Control-Allow-Origin", "*");
		List<Demo> list = demoService.queryDemo();
		modelMap.put("demoList", list);
		modelMap.put("code", 0);
		return modelMap;
	}

	@CrossOrigin
	@RequestMapping(value="/getDemoById", method=RequestMethod.GET)
	private Map<String, Object> getDemoById(Integer id){
		Map<String, Object> modelMap = new HashMap<String, Object>();
		Demo device = demoService.queryDemoById(id);
		modelMap.put("demo", device);
		modelMap.put("code", 0);
		return modelMap;
	}

	@CrossOrigin
	@RequestMapping("/getDemoPageByName")
	@ResponseBody
	public ResultMap<List<Demo>> backContent(Page page,@RequestParam("limit") int limit){
	    //System.out.println("backContent========================"+limit);
	    page.setRows(limit);
	    //System.out.println("page:"+page.toString());
	    List<Demo> contentList = demoService.selectPageList(page);
	    int totals = demoService.selectPageCount(page);
	    page.setTotalRecord(totals);
	    return new ResultMap<List<Demo>>("",contentList,0,totals);
	}

	@CrossOrigin
	@RequestMapping(value="/addDemo", method=RequestMethod.POST)
	private Map<String, Object> addDemo(@RequestBody Demo demo){
		Map<String,Object> modelMap = new HashMap<String,Object>();
		modelMap.put("success", demoService.addDemo(demo));
		modelMap.put("code", 0);
		return modelMap;
	}

	@CrossOrigin
	@RequestMapping(value="/modifyDemo", method=RequestMethod.POST)
	private Map<String, Object> modifyDemo(@RequestBody Demo demo){
		Map<String,Object> modelMap = new HashMap<String,Object>();
		modelMap.put("success", demoService.modifyDemo(demo));
		modelMap.put("code", 0);
		return modelMap;
	}

	@CrossOrigin
	@RequestMapping(value="/removeDemo", method=RequestMethod.GET)
	private Map<String, Object> removeDemo(Integer id){
		Map<String,Object> modelMap = new HashMap<String,Object>();
		modelMap.put("success", demoService.deleteDemo(id));
		modelMap.put("code", 0);
		return modelMap;
	}
	
	@CrossOrigin
	@RequestMapping(value="/test")
	private Map<String, Object> arrDemo(@RequestBody ArrayBody arrayBody){
		// ★碰到requestBody的全部用post方法给发出去
		/* ajax传送数据示例：
			var data = {'arr': [1,2,3,4,5]};
			$.ajax({
	           url : "http://localhost:8080/elevator/demo/test",
	           type : "post",
			   contentType : 'application/json',
			   dataType : 'json',
	           data : JSON.stringify(data),
	           
	           success : function(result) {
	              console.log(JSON.stringify(result));
	           },
	           error:function(msg){
	             $(".notice").html('Error:'+msg);
	           }
			})		 
		 */
		Map<String,Object> modelMap = new HashMap<String,Object>();
		System.out.println("数组内容：");
		for(int i=0;i<arrayBody.getArr().length;i++) {
			System.out.println(arrayBody.getArr()[i]);
		}
		modelMap.put("success", 1);
		modelMap.put("code", 0);
		return modelMap;
	}
	
}
