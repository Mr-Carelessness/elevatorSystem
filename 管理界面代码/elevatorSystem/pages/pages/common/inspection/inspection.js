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
	
	var formKeyword = {
		"companyId": userInfo.company.id,
		"elevatorId": "",
		"operatorId": "",
		"currentDate": "",
		"type": 0
	}
	
	// 表格对应列
	var col = [[
		//{type: 'checkbox', fixed: 'left'},
		{field: 'id', title: '序号', type:"numbers", width:80},
		{field: 'elevator', title: '巡查电梯', templet:'#elevator'},
		{field: 'operator', title: '巡查负责人', templet:'#operator'},
		{field: 'result', title: '巡查结果', templet:'#result', width:100},
		{field: 'score', title: '得分', templet:'#score', width:80},
		{fixed: 'right', title: '操作', width: 300, align: 'center', toolbar: '#barDemo'}
	]];
	var operator_col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'realname', title: '操作者' }
	]];
	var elevator_col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'elevatorName', title: '电梯名称' }
	]];

	//JavaScript代码区域
	layui.config({
		base: '../../../src/layui_ext/'
	}).extend({ 
		tableSelect: 'tableSelect' //定义该组件模块名
	}).use(['layer', 'table', 'tableSelect', 'laydate'], function() {
		var layer = layui.layer, 
			table = layui.table,
			tableSelect = layui.tableSelect,
			laydate = layui.laydate;
		
		// 执行一个 table 实例
		laydate.render({
		    elem: '#keyword-date',
		    type: 'date',
			format: 'yyyy-MM-dd',
			trigger: 'click',
		    done: function(value, date, endDate){
	        	formKeyword = new Date(value+' 08:00:00').getTime();
	      	}
		});
		
		// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#keyword-operator',
			checkedKey: 'id',
			searchKey: 'realname',
			table: {
				url: LOCAL_ADDRESS+'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+userInfo.company.id+'&type=2',
				cols: operator_col,
				limit: 5,
				limits: [5, 10, 15],
				request: {
					pageName: 'page',//页码的参数名称，默认：page
				} 
			},
			done: function (elem, data) {
				//console.log('选择数据') 
				//console.log( data.data[0].cname )
				//console.log( data.data[0].id )
				if(data.data != null && data.data.length > 0){
					formKeyword.operatorId = data.data[0].id;
					elem.val(data.data[0].realname);
				}else{
					formKeyword.operatorId = "";
					elem.val("");
				}
			}
	   	});
		// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#keyword-elevator',
			checkedKey: 'id',
			searchKey: 'name',
			table: {
				url: LOCAL_ADDRESS+'elevator/getElevatorListByNameAndCompanyId?companyId='+userInfo.company.id,
				cols: elevator_col,
				limit: 5,
				limits: [5, 10, 15],
				request: {
					pageName: 'page',//页码的参数名称，默认：page
				} 
			},
			done: function (elem, data) {
				//console.log('选择数据') 
				//console.log( data.data[0].cname )
				//console.log( data.data[0].id )
				if(data.data != null && data.data.length > 0){
					formKeyword.elevatorId = data.data[0].id;
					elem.val(data.data[0].elevatorName);
				}else{
					formKeyword.elevatorId = "";
					elem.val("");
				}
			}
	   	});
		
		// 执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-140',
			url: LOCAL_ADDRESS+'inspection/getInspectionPageListByCompanyIdAndDate?companyId='+userInfo.company.id+'&currentDate=0', 
			title: '巡查记录列表',
			totalRow: true, 
			cols: col,
			page: true, 
			limits: [10,15,20,30,60],
			limit: 15,
			request: {pageName: 'page',} 
		});
		
		
		
		//【监听下拉框选择事件】
		form.on('select(type)', function (obj) {
			if(obj.value == 0){
				document.getElementById("keyword-elevator").style.display = "none";
				document.getElementById("keyword-operator").style.display = "none";
				document.getElementById("keyword-date").style.display = "block";
				formKeyword.type = 0;
			}else if(obj.value == 1){
				document.getElementById("keyword-date").style.display = "none";
				document.getElementById("keyword-operator").style.display = "none";
				document.getElementById("keyword-elevator").style.display = "block";
				formKeyword.type = 1;
			}else if(obj.value == 2){
				document.getElementById("keyword-date").style.display = "none";
				document.getElementById("keyword-elevator").style.display = "none";
				document.getElementById("keyword-operator").style.display = "block";
				formKeyword.type = 2;
			}
		});
		//【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
        });
		//【搜索】
		$('#btn-search').on('click', function () {
            search(tableIns, formKeyword);
            return false;
        });
		
		
		//【监听行工具事件】
		table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'add') {
				add(obj.data);
			} else if(layEvent === 'mod') {
				mod(obj.data);
			} else if(layEvent === 'detail') {
				detail(obj.data);
			}
		});
		
		
	});	
	
	// 【搜索】
	function search(tableIns, formData){
		var url;
		if(formData.type == 0){
			if(formData.currentDate == ""){
				url = config.elevatorBackUrl + 'inspection/getInspectionPageListByCompanyIdAndDate?companyId='+userInfo.company.id+'&currentDate=0';
			}else{
				url = config.elevatorBackUrl + 'inspection/getInspectionPageListByCompanyIdAndDate?companyId='+userInfo.company.id+'&currentDate='+formData.currentDate;
			}
			tableIns.reload({url: url, page: {curr: 1} });
		}else if(formData.type == 1){
			if(formData.elevatorId == ""){
				url = config.elevatorBackUrl + 'inspection/getInspectionPageListByElevatorId?elevatorId=';
			}else{
				url = config.elevatorBackUrl + 'inspection/getInspectionPageListByElevatorId?elevatorId='+formData.elevatorId;
			}
			tableIns.reload({url: url, page: {curr: 1} });
		}else if(formData.type == 2){
			if(formData.operatorId == ""){
				url = config.elevatorBackUrl + 'inspection/getInspectionPageListByOperatorId?operatorId=';
			}else{
				url = config.elevatorBackUrl + 'inspection/getInspectionPageListByOperatorId?operatorId='+formData.operatorId;
			}
			tableIns.reload({url: url, page: {curr: 1} });
		}
		
	}
	
	// 查看检测记录
	function detail(data){
		layer.open({
			title: '查看巡查记录',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'inspection-detail.html?id=' + data.id,
			area: [750 + 'px', 450 + 'px']
		});
	}
	
	
	
	
}