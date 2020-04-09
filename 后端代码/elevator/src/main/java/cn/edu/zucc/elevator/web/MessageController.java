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
import cn.edu.zucc.elevator.entity.Message;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.service.ManagerService;
import cn.edu.zucc.elevator.service.MessageService;



@RestController
@RequestMapping("/message")
public class MessageController {
	@Autowired
	private MessageService messageService;
	

	@CrossOrigin
	@RequestMapping(value="/addMessage")
	@ResponseBody
	private ResultMap<String> addMessage(@RequestBody Message message){
		boolean ans = messageService.addMessage(message);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/modifyMessageStatus")
	@ResponseBody
	private ResultMap<String> modifyMessageStatus(@RequestBody Message message){
		message.setStatus(1);
		boolean ans = messageService.modifyMessage(message); 
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/removeMessage")
	@ResponseBody
	private ResultMap<String> removeMessage(Integer id){
		boolean ans = messageService.removeMessage(id);
		if(ans == true) {
			return new ResultMap<String>("操作成功！",null,0,0);
		}else {
			return new ResultMap<String>("操作失败！",null,-1,0);
		}
	}

	@CrossOrigin
	@RequestMapping(value="/getMessageById")
	@ResponseBody
	private ResultMap<Message> getMessageById(@RequestParam("id") Integer id){
		return new ResultMap<Message>("操作成功！",messageService.getMessageById(id),0,0);
	}

	@CrossOrigin
	@RequestMapping("/getMessageListBySender")
	@ResponseBody
	public ResultMap<List<Message>> getMessageListBySender(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("senderId") String senderId, @RequestParam("senderType") String senderType){
	    //System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(senderId) && senderId!=null) {
			pg.setUserid(senderId);
		}	
		if(!"".equals(senderType) && senderType!=null && Integer.valueOf(senderType) != -1) {
			pg.setKeyWord(senderType);
		}
	    //System.out.println("page:"+page.toString());
	    List<Message> contentList = messageService.getMessagePageListBySender(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = messageService.getMessagePageCountBySender(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Message>>("操作成功！",contentList,0,totals);
	}
	

	@CrossOrigin
	@RequestMapping("/getMessageListByReceiverAndState") 
	@ResponseBody
	public ResultMap<List<Message>> getMessageListByReceiverAndState(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("receiverId") String receiverId, @RequestParam("receiverType") String receiverType, @RequestParam("status") Integer status){
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(receiverId) && receiverId!=null) {
			pg.setUserid(receiverId);
		}	
		if(!"".equals(receiverType) && receiverType!=null && Integer.valueOf(receiverType) != -1) {
			pg.setKeyWord(receiverType);
		}
		if(!"".equals(status) && status!=null && Integer.valueOf(status) != -1) {
			pg.setSubkeyWord(String.valueOf(status));
		}
	    //System.out.println("page:"+page.toString());
	    List<Message> contentList = messageService.getMessagePageListByReceiverAndState(pg);
	    //System.out.println("结果大小："+contentList.size());
	    int totals = messageService.getMessagePageCountByReceiverAndState(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Message>>("操作成功！",contentList,0,totals);
	}

	@CrossOrigin
	@RequestMapping("/getUnreadMessageCountByReceiver") 
	@ResponseBody
	public ResultMap<Integer> getUnreadMessageCountByReceiver(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("receiverId") String receiverId, @RequestParam("receiverType") String receiverType){
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		//System.out.println("类型："+type);
		if(!"".equals(receiverId) && receiverId!=null) {
			pg.setUserid(receiverId);
		}	
		if(!"".equals(receiverType) && receiverType!=null && Integer.valueOf(receiverType) != -1) {
			pg.setKeyWord(receiverType);
		}
	    int totals = messageService.getMessagePageCountByReceiverAndState(pg);
	    pg.setTotalRecord(totals);
	    return new ResultMap<Integer>("操作成功！",totals,0,totals);
	}
	
	@CrossOrigin
	@RequestMapping("/getMessageBySenderAndReceiver") 
	@ResponseBody
	public ResultMap<List<Message>> getMessageBySenderAndReceiver(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("id1") int id1, @RequestParam("type1") int type1, @RequestParam("id2") int id2, @RequestParam("type2") int type2){
		//System.out.println("backContent========================"+limit);
		Page pg = new Page();
		pg.setPage(page);
		pg.setRows(limit);
		pg.setStart(pg.getStart());
		
		
	    int totals = messageService.getMessagePageCountBySenderAndReceiver(pg, id1, type1, id2, type2);
	    List<Message> contentList = messageService.getMessagePageListBySenderAndReceiver(pg, id1, type1, id2, type2);
	    pg.setTotalRecord(totals);
	    return new ResultMap<List<Message>>("操作成功！",contentList,0,totals);
	}
}
