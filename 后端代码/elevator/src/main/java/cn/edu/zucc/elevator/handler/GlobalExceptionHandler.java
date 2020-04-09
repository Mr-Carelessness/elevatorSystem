package cn.edu.zucc.elevator.handler;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu.zucc.elevator.entity.CustomException;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(value=CustomException.class)
	@ResponseBody
	private Map<String, Object> customExceptionHandler(HttpServletRequest req, CustomException e){
		Map<String, Object> modelMap = new HashMap<String, Object>();
		modelMap.put("errMsg", e.getMessage());
		modelMap.put("code", e.getCode());
		return modelMap;
 	}
	
	@ExceptionHandler(value=Exception.class)
	@ResponseBody
	private Map<String, Object> exceptionHandler(HttpServletRequest req, Exception e){
		Map<String, Object> modelMap = new HashMap<String, Object>();
		modelMap.put("errMsg", e.getMessage());
		modelMap.put("code", -1);
		return modelMap;
 	}
	
	
}
