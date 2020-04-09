package cn.edu.zucc.elevator.dao;

import java.util.List;

import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Message;
import cn.edu.zucc.elevator.entity.Page;

public interface MessageDao {
	//新增管理员
	int insertMessage(Message message);
	//修改管理员基本信息
	int updateMessage(Message message);	
	//删除管理员
	int deleteMessage(int messageId);
	//根据Id列出具体消息
	Message selectMessageById(int messageId);
	
	//根据消息发送者获取消息列表(获取数据总数)
	Integer selectMessagePageCountBySender(Page page);
	//根据消息发送者获取消息列表(获取分页数据)
	List<Message> selectMessagePageListBySender(Page page);
	//根据消息接收者以及接收状态获取消息列表(获取数据总数)
	Integer selectMessagePageCountByReceiverAndState(Page page);
	//根据消息接收者以及接收状态获取消息列表(获取分页数据)
	List<Message> selectMessagePageListByReceiverAndState(Page page);
	
	//根据消息双方获取消息列表(获取数据总数)
	Integer selectMessagePageCountBySenderAndReceiver(Page page, Integer id1, Integer type1, Integer id2, Integer type2);
	//根据消息双方获取消息列表(获取分页数据)
	List<Message> selectMessagePageListBySenderAndReceiver(Page page, Integer id1, Integer type1, Integer id2, Integer type2);
	
}
