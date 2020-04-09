package cn.edu.zucc.elevator;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hello {
	@RequestMapping(value="/hello", method=RequestMethod.GET)
	public String hello() {
		return "Hello SpringBoot";
		//地址：http://localhost:8080/elevator/hello/
	}
}
