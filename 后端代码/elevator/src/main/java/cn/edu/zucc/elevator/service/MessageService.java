package cn.edu.zucc.elevator.service;

import java.util.List;

import cn.edu.zucc.elevator.entity.Message;
import cn.edu.zucc.elevator.entity.Page;

public interface MessageService {
	//新增消息
	boolean addMessage(Message message);
	//删除消息
	boolean removeMessage(int messageId);
	//修改消息基本信息
	boolean modifyMessage(Message message);
	//根据消息id查询消息记录
	Message getMessageById(Integer id);
	
	//根据消息发送者获取消息列表(获取数据总数)
	Integer getMessagePageCountBySender(Page page);
	//根据消息发送者获取消息列表(获取分页数据)
	List<Message> getMessagePageListBySender(Page page);
	//根据消息接收者以及接收状态获取消息列表(获取数据总数)
	Integer getMessagePageCountByReceiverAndState(Page page);
	//根据消息接收者以及接收状态获取消息列表(获取分页数据)
	List<Message> getMessagePageListByReceiverAndState(Page page);
	
	//根据消息双方获取消息列表(获取数据总数)
	Integer getMessagePageCountBySenderAndReceiver(Page page, Integer id1, Integer type1, Integer id2, Integer type2);
	//根据消息双方获取消息列表(获取分页数据)
	List<Message> getMessagePageListBySenderAndReceiver(Page page, Integer id1, Integer type1, Integer id2, Integer type2);
}
