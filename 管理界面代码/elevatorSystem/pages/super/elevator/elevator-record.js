//========================================
init();
//========================================
function init(){
	layui.use('form', function() {
		form = layui.form;
		layer = layui.layer;
		load();
	});
}

function load(){
	var userInfo = JSON.parse(localStorage.getItem("adminInfo"));
	const LOCAL_ADDRESS = config.elevatorBackUrl;
	
	var id = getUrlParam("id");
	var state = getUrlParam("state");
	var formData = {};
	
	// 巡查记录表格对应列【表格对应后台接口数据全部得更改！】
	var col2 = [[
		{ field: 'id', title: '序号', type:"numbers", width:80, fixed: 'left' },
		{field: 'operator', title: '负责人', templet:'#operator', width:150},
		{field: 'company', title: '所在公司', templet:'#company2', width:240},
		{field: 'telephone', title: '电话', templet:'#telephone', width:150},
		{field: 'inspectionDate', title: '巡查日期', width:180},
		{field: 'result', title: '巡查结果', templet:'#result', width:100},
		{field: 'score', title: '得分', width: 60, toolbar: '#score'},
		{field: 'record', title: '操作', width: 120, toolbar: '#record2', fixed: 'right'}
	]];
	// 维护记录表格对应列
	var col3 = [[
		{ field: 'id', title: '序号', type:"numbers", width:80, fixed: 'left' },
		{field: 'operator', title: '负责人', templet:'#operator', width:150},
		{field: 'company', title: '责任方公司', templet:'#company', width:240},
		{field: 'telephone', title: '电话', templet:'#telephone', width:150},
		{field: 'startDate', title: '开始日期', width:180},
		{field: 'realFinishDate', title: '结束日期', width:180},
		{field: 'state', title: '维护状态', templet:'#state3', width:120},
		{field: 'score', title: '得分', width: 60, toolbar: '#score'},
		//{field: 'qa', title: '维护问题与答案', width: 130, toolbar: '#qa3'},
		{field: 'record', title: '操作', width: 120, toolbar: '#record3', fixed: 'right'}
	]];
	// 检测记录表格对应列
	var col4 = [[
		{ field: 'id', title: '序号', type:"numbers", width:80, fixed: 'left' },
		{field: 'operator', title: '负责人', templet:'#operator', width:150},
		{field: 'company', title: '责任方公司', templet:'#company', width:240},
		{field: 'telephone', title: '电话', templet:'#telephone', width:150},
		{field: 'startDate', title: '开始日期', width:180},
		{field: 'realFinishDate', title: '结束日期', width:180},
		{field: 'state', title: '维护状态', templet:'#state4', width:120},
		{field: 'score', title: '得分', width: 60, toolbar: '#score'},
		{field: 'record', title: '操作', width: 120, toolbar: '#record4', fixed: 'right'}
	]];
	
	//JavaScript代码区域
	layui.use(['layer', 'table', 'element'], function() {
		var layer = layui.layer, 
			table = layui.table,
			element = layui.element;
		
		init(id, state, form);
		
		// 执行一个 table 实例
		var tableIns2 = table.render({
			elem: '#demo2',
			height: '350px',
			url: LOCAL_ADDRESS+'inspection/getInspectionPageListByElevatorId?elevatorId='+id, 
			title: '管理员表',
			totalRow: true, 
			cols: col2,
			page: true, 
			limits: [5,10,15],
			limit: 5,
			request: {pageName: 'page',} 
		});
		
		// 执行一个 table 实例
		var tableIns3 = table.render({
			elem: '#demo3',
			height: '350px',
			url: LOCAL_ADDRESS+'maintainence/getMaintainenceByElevatorId?elevatorId='+id, 
			title: '管理员表',
			totalRow: true, 
			cols: col3,
			page: true, 
			limits: [5,10,15],
			limit: 5,
			request: {pageName: 'page',} 
		});
		
		// 执行一个 table 实例
		var tableIns4 = table.render({
			elem: '#demo4',
			height: '350px',
			url: LOCAL_ADDRESS+'testing/getTestingByElevatorId?elevatorId='+id, 
			title: '管理员表',
			totalRow: true, 
			cols: col4,
			page: true, 
			limits: [5,10,15],
			limit: 5,
			request: {pageName: 'page',} 
		});
		
		//监听行工具事件
		table.on('tool(test2)', function(obj) { 
			var data = obj.data, 
				layEvent = obj.event; 
			console.log(data);
			if(layEvent === 'record2') {
				layer.open({
					type: 2,
					title: '巡查记录信息',
					maxmin: true,
           			area: [780 + 'px', 500 + 'px'],
           			shadeClose: false, //点击遮罩关闭
            		content: 'inspection-detail.html?id=' + data.id,
				});    
			}
		});
		
		//监听行工具事件
		table.on('tool(test3)', function(obj) { 
			var data = obj.data, 
				layEvent = obj.event; 
			console.log(data);
			if(layEvent === 'record3') {
				layer.open({
					type: 2,
					title: '维护记录信息',
					maxmin: true,
           			area: [780 + 'px', 500 + 'px'],
           			shadeClose: false, //点击遮罩关闭
            		content: 'maintainence-detail.html?id=' + data.id,
				});    
			}
		});
		
		//监听行工具事件
		table.on('tool(test4)', function(obj) { 
			var data = obj.data, 
				layEvent = obj.event; 
			console.log(data);
			if(layEvent === 'record4') {
				layer.open({
					type: 2,
					title: '检测记录信息',
					maxmin: true,
           			area: [780 + 'px', 500 + 'px'],
           			shadeClose: false, //点击遮罩关闭
            		content: 'testing-detail.html?id=' + data.id,
				});    
			}
		});
		//【重载】
		$('#btn-refresh2').on('click', function () {
            tableIns2.reload({page: {curr: 1} });
        });
		$('#btn-refresh3').on('click', function () {
            tableIns3.reload({page: {curr: 1} });
        });
		$('#btn-refresh4').on('click', function () {
            tableIns4.reload({page: {curr: 1} });
        });
		
		
		
	});
	
	// 获取url传过来的参数
	function getUrlParam(name) {
		var url = location.search;
		//console.log(url)
		//console.log(parent.layer)
		//console.log(name)
		url = url.substring(url.indexOf("?"));
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				if(name == strs[i].split("=")[0]) {
					return unescape(strs[i].split("=")[1]);
				}
			}
		}
		return "";
	}
	
	// 初始化
	function init(id, state, form){
		// 初始化当前状态
		if(state == 0){
			document.getElementById("state").innerHTML = '<span style="color: #FFB800;">【建设中 】</span>';
		}else if(state == 1){
			document.getElementById("state").innerHTML = '<span style="color: #5FB878;">【待投入运行】</span>';
		}else if(state == 2){
			document.getElementById("state").innerHTML = '<span style="color: #009688;">【运行中】 </span>';
		}else if(state == 3){
			document.getElementById("state").innerHTML = '<span style="color: #FF5722;">【维护中】</span>';
		}
		
		// 初始化选项卡内部各类信息
		if(state <= 1){
			getConstructionFormData(id, form);
			document.getElementById("li-inspection").style.display = "none";
	       	document.getElementById("div-inspection").style.display = "none";
			document.getElementById("li-maintainence").style.display = "none";
	       	document.getElementById("div-maintainence").style.display = "none";
			document.getElementById("li-testing").style.display = "none";
	       	document.getElementById("div-testing").style.display = "none";
		}else if(state >= 2){
			getConstructionFormData(id, form);
			
			
			
			
		}
		
		
		
		
		
		
		
	}
	
	// 根据id赋值原数据
	function getConstructionFormData(id, form){
		//console.log(id);
		var url = config.elevatorBackUrl + "construction/getConstructionByElevatorId?elevatorId="+id;
		$.get(url, function(result, status){
			console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	formData = result.data;
	        	if(formData == null){
	        		document.getElementById("div-construction").innerHTML = "<p>电梯尚开始进行施工工作，因此暂时缺少相应施工记录</p>";
	        	}else{
	        		form.val("show_form", { 
						"name": (result.data.operator==null)?"":getString(result.data.operator.realname),
						"telephone": (result.data.operator==null)?"":getString(result.data.operator.telephone),
						"company": (result.data.company==null)?"":getString(result.data.company.cname),
						"type": getString(result.data.type),
						"licenseNumber": getString(result.data.licenseNumber),
						"startDate": getString(result.data.startDate),
						"realfinishDate": getString(result.data.realFinishDate),
						"record": getString(result.data.record),
						"state": getString(getConstructionState(result.data.state))
					});
					form.render();
	        	}
		        
	        }
	  	});   
	}
	
	// 获取非空字符串
	function getString(str){
		if(str == null){
			return "";
		}else{
			return str;
		}
	}
	
	// 获取非空字符串
	function getString2(str, str2){
		if(str == null){
			return "";
		}else{
			return str+ str2;
		}
	}
	
	// 获取施工状态
	function getConstructionState(state){
		if(state == 0){
			return "待施工";
		}else if(state == 1){
			return "施工中";
		}else if(state == 2){
			return "已施工";
		}else {
			return "";
		}
	}
	
}