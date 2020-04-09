package cn.edu.zucc.elevator.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.zucc.elevator.dao.DemoDao;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Demo;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.service.DemoService;

@Service
public class DemoServiceImpl implements DemoService {
	@Autowired
	private DemoDao demodao;
	
	@Override
	public List<Demo> queryDemo() {
		return demodao.queryDemo();
	}

	@Override
	public Demo queryDemoById(int demoId) {
		return demodao.queryDemoById(demoId);
	}
	
	@Transactional
	@Override
	public boolean addDemo(Demo demo) {
		if(demo.getName() != null && !"".equals(demo.getName())) {
			try {
				int effectedNum = demodao.insertDemo(demo);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("插入xx信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("插入xx信息失败：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("区域信息不能为空！", -2);
		}
	}
	
	@Transactional
	@Override
	public boolean modifyDemo(Demo demo) {
		if(demo.getId() != null && demo.getId()>0) {
			try {
				int effectedNum = demodao.updateDemo(demo);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("更新区域信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("更新区域信息失败：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("区域信息不能为空！", -2);
		}
	}
	
	@Transactional
	@Override
	public boolean deleteDemo(int demoId) {
		if(demoId>0) {
			try {
				int effectedNum = demodao.deleteDemo(demoId);
				if(effectedNum > 0) {
					return true;
				}else {
					throw new CustomException("删除区域信息失败！", -1);
				}
			}catch (Exception e) {
				throw new CustomException("删除区域信息失败：" + e.getMessage(), -1);
			}
		}else {
			throw new CustomException("区域信息不能为空！", -2);
		}
	}

	@Override
	public List<Demo> selectPageList(Page page) {
		List<Demo> list = demodao.selectPageList(page);
        return list;
	}

	@Override
	public Integer selectPageCount(Page page) {
		return demodao.selectPageCount(page);
	}

}
