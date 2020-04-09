package cn.edu.zucc.elevator.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.MessageDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Manager;
import cn.edu.zucc.elevator.entity.Message;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {
	@Autowired
	private MessageDao messagedao;
	
	@Transactional
	@Override
	public boolean addMessage(Message message) {
		if(message.getSenderId() != null && message.getSenderType() != null && 
			message.getReceiverId() != null && message.getReceiverType() != null) {
			try {
				message.setStatus(0); //未读
				message.setDelflag(0); //删除标记
				message.setSendTime(new Timestamp(System.currentTimeMillis()));
				int effectedNum = messagedao.insertMessage(message);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("插入消息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("请选择消息发送人和消息接收人！", -2);
		}
	}
	
	@Transactional
	@Override
	public boolean removeMessage(int messageId) {
		if(messageId>0) {
			try {
				int effectedNum = messagedao.deleteMessage(messageId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除消息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("消息不能为空！", -2);
		}
	}
	
	@Transactional
	@Override
	public boolean modifyMessage(Message message) {
		if(message.getId() != null && message.getId() > 0) {
			try {
				int effectedNum = messagedao.updateMessage(message);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新消息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("消息不能为空！", -2);
		}
	}

	@Override
	public Message getMessageById(Integer id) {
		return messagedao.selectMessageById(id);
	}

	@Override
	public Integer getMessagePageCountBySender(Page page) {
		return messagedao.selectMessagePageCountBySender(page);
	}

	@Override
	public List<Message> getMessagePageListBySender(Page page) {
		List<Message> list = messagedao.selectMessagePageListBySender(page);
        return list;
	}

	@Override
	public Integer getMessagePageCountByReceiverAndState(Page page) {
		return messagedao.selectMessagePageCountByReceiverAndState(page);
	}

	@Override
	public List<Message> getMessagePageListByReceiverAndState(Page page) {
		List<Message> list = messagedao.selectMessagePageListByReceiverAndState(page);
        return list;
	}

	@Override
	public Integer getMessagePageCountBySenderAndReceiver(Page page, Integer id1, Integer type1, Integer id2, Integer type2) {
		return messagedao.selectMessagePageCountBySenderAndReceiver(page, id1, type1, id2, type2);
	}

	@Override
	public List<Message> getMessagePageListBySenderAndReceiver(Page page, Integer id1, Integer type1, Integer id2,
			Integer type2) {
		List<Message> list = messagedao.selectMessagePageListBySenderAndReceiver(page, id1, type1, id2, type2);
        return list;
	}

}
