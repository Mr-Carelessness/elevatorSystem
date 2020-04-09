package cn.edu.zucc.elevator.web;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cn.edu.zucc.elevator.config.dao.UrlConfig;
import cn.edu.zucc.elevator.entity.AES;
import cn.edu.zucc.elevator.entity.AHPBody;
import cn.edu.zucc.elevator.entity.AHPResult;
import cn.edu.zucc.elevator.entity.ConstructionStateDistribution;
import cn.edu.zucc.elevator.entity.CustomException;
import cn.edu.zucc.elevator.entity.Elevator;
import cn.edu.zucc.elevator.entity.ElevatorScoreDistribution;
import cn.edu.zucc.elevator.entity.ElevatorStateDistribution;
import cn.edu.zucc.elevator.entity.MaintainenceStateDistribution;
import cn.edu.zucc.elevator.entity.ManagerIndexData;
import cn.edu.zucc.elevator.entity.Page;
import cn.edu.zucc.elevator.entity.ResultMap;
import cn.edu.zucc.elevator.entity.SuperManagerIndexData;
import cn.edu.zucc.elevator.entity.TestingStateDistribution;
import cn.edu.zucc.elevator.entity.UserDistribution;
import cn.edu.zucc.elevator.service.CompanyService;
import cn.edu.zucc.elevator.service.ConstructionService;
import cn.edu.zucc.elevator.service.ElevatorService;
import cn.edu.zucc.elevator.service.InspectionService;
import cn.edu.zucc.elevator.service.MaintainenceService;
import cn.edu.zucc.elevator.service.ManagerService;
import cn.edu.zucc.elevator.service.MessageService;
import cn.edu.zucc.elevator.service.OperatorService;
import cn.edu.zucc.elevator.service.TestingService;

@Controller
@RestController
@RequestMapping("/other")
public class OtherController {
	@Autowired
	private ElevatorService elevatorService;
	@Autowired
	private CompanyService companyService;
	@Autowired
	private OperatorService operatorService;
	@Autowired
	private ManagerService managerService;
	@Autowired
	private MessageService messageService;
	@Autowired
	private ConstructionService constructionService;
	@Autowired
	private InspectionService inspectionService;
	@Autowired
	private MaintainenceService maintainenceService;
	@Autowired
	private TestingService testingService;
	
	
	
	// 资源上传
	@CrossOrigin
	@RequestMapping(value = "/upload/img", method = { RequestMethod.POST })
	@ResponseBody
	public ResultMap<String> upload(@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<>();
		String name = request.getParameter("name");// 获取data中数据
		if (file != null) {
			try {
				// 获取文件名（已进行加密）
				String fileName = changeFileName(file.getOriginalFilename());
				// 将接收到的图片以文件形式转存到对应文件夹下面
				File dest = new File(UrlConfig.getImgLocalUrl()+fileName);
				file.transferTo(dest);
				dest.setReadable(true);
				dest.setWritable(true);
				dest.setExecutable(true);
				// 通过调用系统命令行给文件添加权限
				Runtime rt = Runtime.getRuntime();
				Process proc = rt.exec("Icacls "+UrlConfig.getImgLocalUrl()+fileName+" /grant EveryOne:f");
				
				/*System.out.println("step1");
				Set<PosixFilePermission> perms = new HashSet<PosixFilePermission>();
				perms.add(PosixFilePermission.OWNER_READ); //设置所有者的读取权限  
				perms.add(PosixFilePermission.OWNER_WRITE); //设置所有者的写权限  
				perms.add(PosixFilePermission.OWNER_EXECUTE); //设置所有者的执行权限   
				perms.add(PosixFilePermission.GROUP_READ); //设置组的读取权限  
				perms.add(PosixFilePermission.GROUP_EXECUTE); //设置组的执行权限  
				perms.add(PosixFilePermission.OTHERS_READ); //设置其他的读取权限   
				perms.add(PosixFilePermission.OTHERS_EXECUTE); //设置其他的执行权限
				//修改文件权限主要方法
				System.out.println("step2");
				Files.setPosixFilePermissions(Paths.get(UrlConfig.getImgLocalUrl()+fileName), perms);//修改文件的权限
				System.out.println("step3");*/
				
				return new ResultMap<String>("操作成功！",UrlConfig.getImgPublicUrl()+fileName,0,1);
			}catch(IOException e) {
				throw new CustomException("错误提示：" + e.getMessage(), -1);
			}
			
		} else {
			return new ResultMap<String>("上传图片失败！","",-4,0);
		}
	}
	
	// 获取超级管理员首页数据
	@CrossOrigin
	@RequestMapping(value = "/index/getSuperManagerIndexData", method = { RequestMethod.POST })
	@ResponseBody
	public ResultMap<SuperManagerIndexData> getSuperManagerIndexData(@RequestParam("managerId") String managerId, @RequestParam("managerType") String managerType) throws Exception {
		SuperManagerIndexData sm = new SuperManagerIndexData();
		
		// 设置公司信息
		Page pg = new Page();
		pg.setPage(1);
		pg.setRows(10);
		pg.setStart(pg.getStart());
		sm.setCompanyNumber(companyService.getCompanyPageCountByName(pg));
		sm.setRecentAddCompany(companyService.getCompanyPageListByName2(pg));
		sm.setSortByOperatorNumberCompany(companyService.selectCompanyOperatorCount(10));
		sm.setSortByElevatorNumberCompany(companyService.selectCompanyElevatorCount(10));
		
		// 设置消息信息
		Page pg2 = new Page();
		pg2.setPage(1);
		pg2.setRows(10);
		pg2.setStart(pg2.getStart());
		pg2.setUserid(managerId);
		pg2.setKeyWord(managerType);
		sm.setSendMessageNumber(messageService.getMessagePageCountBySender(pg2));
		sm.setReceivedMessageNumber(messageService.getMessagePageCountByReceiverAndState(pg2));
		pg2.setSubkeyWord(String.valueOf(0));
		sm.setReceivedMessageNumberUnread(messageService.getMessagePageCountByReceiverAndState(pg2));
		pg2.setSubkeyWord(String.valueOf(1));
		sm.setReceivedMessageNumberRead(messageService.getMessagePageCountByReceiverAndState(pg2));
		
		
		// 设置电梯信息
		Page pg3 = new Page();
		pg3.setPage(1);
		pg3.setRows(10);
		pg3.setStart(pg3.getStart());
		ElevatorScoreDistribution eso = elevatorService.getElevatorScoreCountInfoByCompanyId(-1);
		ElevatorStateDistribution est = elevatorService.getElevatorStateCountInfoByCompanyId(-1);
		sm.setElevatorNumber(elevatorService.getElevatorPageCountByNameAndCompanyId(pg3));
		sm.setElevator(elevatorService.getElevatorListByCompanyId(pg3));
		sm.setElevatorScoreDistribution(eso);
		sm.setElevatorStateDistribution(est);
		
		// 设置单位成员信息
		Page pg4 = new Page();
		pg4.setPage(1);
		pg4.setRows(10);
		pg4.setStart(pg4.getStart());
		UserDistribution ud = new UserDistribution();
		ud.setManagerCount(managerService.getPageCountByType(pg4));
		pg4.setKeyWord("1");
		ud.setSuperManagerCount(managerService.getPageCountByType(pg4));
		pg4.setKeyWord("0");
		ud.setCompanyManagerCount(managerService.getPageCountByType(pg4));
		Page pg5 = new Page();
		pg5.setPage(1);
		pg5.setRows(10);
		pg5.setStart(pg5.getStart());
		ud.setOperatorCount(operatorService.getOperatorPageCountByCompanyAndTypeGT0AndName(pg5));
		pg5.setKeyWord("0");
		ud.setUserCount(operatorService.getOperatorPageCountByCompanyAndTypeGT0AndName(pg5));
		pg5.setKeyWord("1");
		ud.setConstructorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		pg5.setKeyWord("2");
		ud.setInspectorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		pg5.setKeyWord("3");
		ud.setMaintainorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		pg5.setKeyWord("4");
		ud.setTestorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		ud.setAllCount(ud.getManagerCount()+ud.getOperatorCount()+ud.getUserCount());
		sm.setUserDistribution(ud);
		
		return new ResultMap<SuperManagerIndexData>("操作成功！",sm,0,1);
	}
	
	// 获取超级管理员首页数据
	@CrossOrigin
	@RequestMapping(value = "/index/getManagerIndexData", method = { RequestMethod.POST })
	@ResponseBody
	public ResultMap<ManagerIndexData> getManagerIndexData(@RequestParam("managerId") String managerId, @RequestParam("managerType") String managerType, @RequestParam("companyId") String companyId) throws Exception {
		ManagerIndexData m = new ManagerIndexData();
		
		// 设置消息信息
		Page pg2 = new Page();
		pg2.setPage(1);
		pg2.setRows(10);
		pg2.setStart(pg2.getStart());
		pg2.setUserid(managerId);
		pg2.setKeyWord(managerType);
		m.setSendMessageNumber(messageService.getMessagePageCountBySender(pg2));
		m.setReceivedMessageNumber(messageService.getMessagePageCountByReceiverAndState(pg2));
		pg2.setSubkeyWord(String.valueOf(0));
		m.setReceivedMessageNumberUnread(messageService.getMessagePageCountByReceiverAndState(pg2));
		pg2.setSubkeyWord(String.valueOf(1));
		m.setReceivedMessageNumberRead(messageService.getMessagePageCountByReceiverAndState(pg2));
		
		//设置电梯信息
		Page pg3 = new Page();
		pg3.setPage(1);
		pg3.setRows(10);
		pg3.setStart(pg3.getStart());
		pg3.setUserid(companyId);
		ElevatorScoreDistribution eso = elevatorService.getElevatorScoreCountInfoByCompanyId(Integer.valueOf(companyId));
		ElevatorStateDistribution est = elevatorService.getElevatorStateCountInfoByCompanyId(Integer.valueOf(companyId));
		m.setElevatorNumber(elevatorService.getElevatorPageCountByNameAndCompanyId(pg3));
		m.setElevator(elevatorService.getElevatorListByCompanyId(pg3));
		m.setElevatorScoreDistribution(eso);
		m.setElevatorStateDistribution(est);
		
		//设置单位成员信息
		Page pg4 = new Page();
		pg4.setPage(1);
		pg4.setRows(10);
		pg4.setStart(pg4.getStart());
		pg4.setUserid(companyId);
		UserDistribution ud = new UserDistribution();
		ud.setManagerCount(managerService.getPageCountByTypeAndCompanyId(pg4));
		pg4.setKeyWord("1");
		ud.setSuperManagerCount(managerService.getPageCountByTypeAndCompanyId(pg4));
		pg4.setKeyWord("0");
		ud.setCompanyManagerCount(managerService.getPageCountByTypeAndCompanyId(pg4));
		Page pg5 = new Page();
		pg5.setPage(1);
		pg5.setRows(10);
		pg5.setStart(pg5.getStart());
		pg5.setUserid(companyId);
		ud.setOperatorCount(operatorService.getOperatorPageCountByCompanyAndTypeGT0AndName(pg5));
		pg5.setKeyWord("0");
		ud.setUserCount(operatorService.getOperatorPageCountByCompanyAndTypeGT0AndName(pg5));
		pg5.setKeyWord("1");
		ud.setConstructorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		pg5.setKeyWord("2");
		ud.setInspectorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		pg5.setKeyWord("3");
		ud.setMaintainorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		pg5.setKeyWord("4");
		ud.setTestorCount(operatorService.getOperatorPageCountByCompanyAndTypeAndName(pg5));
		ud.setAllCount(ud.getManagerCount()+ud.getOperatorCount()+ud.getUserCount());
		m.setUserDistribution(ud);
		
		//设置施工信息
		Page pg6 = new Page();
		pg6.setPage(1);
		pg6.setRows(5);
		pg6.setStart(pg6.getStart());
		pg6.setUserid(companyId);
		//pg6.setKeyWord(keyWord);
		m.setRecentConstruction(constructionService.getConstructionPageListByCompanyIdAndState2(pg6));
		ConstructionStateDistribution csd = new ConstructionStateDistribution();
		pg6.setKeyWord("0");
		csd.setCount0(constructionService.getConstructionPageCountByCompanyIdAndState(pg6));
		pg6.setKeyWord("1");
		csd.setCount1(constructionService.getConstructionPageCountByCompanyIdAndState(pg6));
		pg6.setKeyWord("2");
		csd.setCount2(constructionService.getConstructionPageCountByCompanyIdAndState(pg6));
		m.setConstructionStateDistribution(csd);
		
		//设置巡查信息
		Page pg7 = new Page();
		pg7.setPage(1);
		pg7.setRows(5);
		pg7.setStart(pg7.getStart());
		pg7.setUserid(companyId);
		m.setRecentInspection(inspectionService.getInspectionPageListByCompanyIdAndDate(pg7, Integer.valueOf(companyId), null));
		m.setInspectionCount(inspectionService.getInspectionPageCountByCompanyIdAndDate(pg7, Integer.valueOf(companyId), null));
		
		//设置维护信息
		Page pg8 = new Page();
		pg8.setPage(1);
		pg8.setRows(5);
		pg8.setStart(pg8.getStart());
		pg8.setUserid(companyId);
		//pg6.setKeyWord(keyWord);
		m.setRecentMaintainence(maintainenceService.getMaintainencePageListByCompanyIdAndState2(pg8));
		MaintainenceStateDistribution msd = new MaintainenceStateDistribution();
		pg8.setKeyWord("0");
		msd.setCount0(maintainenceService.getMaintainencePageCountByCompanyIdAndState(pg8));
		pg8.setKeyWord("1");
		msd.setCount1(maintainenceService.getMaintainencePageCountByCompanyIdAndState(pg8));
		pg8.setKeyWord("2");
		msd.setCount2(maintainenceService.getMaintainencePageCountByCompanyIdAndState(pg8));
		m.setMaintainenceStateDistribution(msd);
		
		
		//设置检测信息
		Page pg9 = new Page();
		pg9.setPage(1);
		pg9.setRows(5);
		pg9.setStart(pg9.getStart());
		pg9.setUserid(companyId);
		m.setRecentTesting(testingService.getTestingPageListByCompanyIdAndState2(pg9));
		TestingStateDistribution tsd = new TestingStateDistribution();
		pg9.setKeyWord("0");
		tsd.setCount0(testingService.getTestingPageCountByCompanyIdAndState(pg9));
		pg9.setKeyWord("1");
		tsd.setCount1(testingService.getTestingPageCountByCompanyIdAndState(pg9));
		pg9.setKeyWord("2");
		tsd.setCount2(testingService.getTestingPageCountByCompanyIdAndState(pg9));
		m.setTestingStateDistribution(tsd);
		
		return new ResultMap<ManagerIndexData>("操作成功！",m,0,1);
	}		
	
	@CrossOrigin
	@RequestMapping(value = "/AHPcalc")
	@ResponseBody
	public ResultMap<AHPResult> AHP(@RequestBody AHPBody ahpBody) throws Exception {
		AHPResult ahpResult = new AHPResult();
		
		// 初始化参数
		int n = ahpBody.getSize();
		double [][]d = ahpBody.getArr();
		double [][]temp = ahpBody.getTmp();
		
		// 1.对判断矩阵进行求和
		//System.out.println("列相加结果"); 
		double w1[] = new double[n];
		Arrays.fill(w1, 0);
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				w1[i] = w1[i] + d[j][i];
			}
		}
		
		// 2.相除
		System.out.println();
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				d[i][j] = d[i][j] / w1[j];
			}
		}
		double w2[] = new double[n];
		Arrays.fill(w2, 0);
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				w2[i] = w2[i] + d[i][j];
			}
		}
		double sum = 0.0;
		for (int i = 0; i < n; i++) {
			sum += w2[i];
		}
		double w3[] = new double[n];
		Arrays.fill(w3, 0);
		for (int i = 0; i < n; i++) {
			w3[i] = w2[i] / sum;
			//System.out.printf("\t%.2f\n", w3[i]);  //权重向量
		}
		ahpResult.setWeight(w3);
		
		double w4[] = new double[n];
		Arrays.fill(w4, 0);
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				w4[i] = w4[i] + temp[i][j] * w3[j];
			}
			//System.out.printf("%.3f \t", w4[i]);
		}
		//System.out.println("\n----------------------------------------");
		double sum2 = 0.0;
		for (int i = 0; i < n; i++) {
			sum2 = sum2 + w4[i];
		}
		double result = 0.0;
		for (int i = 0; i < n; i++) {
			result = result + w4[i] / (n * w3[i]);
		}
		
		//System.out.println("最大的特征向量为 ：  ");
		//System.out.printf(" %.2f \n", result);
		// 3. 一致性检验
		double CI = (result - n) / (n - 1);
		ahpResult.setCI(CI);
		/*
		 * 
		 n  1  2  3  	4  		5	  6	  7		  8		 9	  10	  11
		RI  0  0  0.58  0.90  1.12  1.24  1.32  1.41  1.45  1.49  1.51 
		一般，当一致性比率 <0.1 时
		的不一致程度在容许范围之内，可用其归一化特征向量
		作为权向量，否则要重新构造成对比较矩阵，对  加
		以调整
		 */
		double RI = 0.0;
		switch (n) {
			case 0:RI=0;break;
			case 1:RI=0;break;
			case 2:RI=0;break;
			case 3:RI=0.58;break;
			case 4:RI=0.90;break;
			case 5:RI=1.12;break;
			case 6:RI=1.24;break;
			case 7:RI=1.32;break;
			case 8:RI=1.41;break; 
			case 9:RI=1.45;break;
			case 10:RI=1.49;break;
			case 11:RI=1.52;break;
			case 12:RI=1.54;break;
			default:break;
		}
		double CR = CI / RI;
		//System.out.println("操作7:"+CR);
		if(CR < 0.1) {
			ahpResult.setCR(CR);
			ahpResult.setTestResult(true);
			ahpResult.setTestInfo("一致性检验通过");
			return new ResultMap<AHPResult>("操作成功！",ahpResult,0,1);
		}else {
			ahpResult.setCR(CR);
			ahpResult.setTestResult(true);
			ahpResult.setTestInfo("一致性检验未通过");
			return new ResultMap<AHPResult>("操作成功！",ahpResult,1,1);
		}
	}
	
	//========================================================================================
	
	// 私有方法，用于加密文件名字
	private String changeFileName(String fileName) {
		String headencypt = AES.encrypt(fileName).substring(0, 6);
		String time = String.valueOf(System.currentTimeMillis());
		String ext = this.getFileExtendName(fileName);
		return headencypt + time + "." + ext;
	}
	
	// 私有方法，获取文件扩展名
	private String getFileExtendName(String name) {
		String filePath = name;
	    String fileName = filePath.substring(filePath.lastIndexOf("\\")+1);
	    //System.out.println(fileName);
	    String extension=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
	    //System.out.println(extension);
	    return extension;
	}
}
