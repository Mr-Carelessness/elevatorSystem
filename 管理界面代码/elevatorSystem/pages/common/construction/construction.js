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
	
	
	
	// 表格对应列
	var col = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'elevator', title: '施工电梯', templet:'#elevator'},
		{field: 'company', title: '电梯所在公司', templet:'#company'},
		{field: 'operator', title: '施工负责人', templet:'#operator'},
		{field: 'type', title: '类别', width:120},
		{field: 'state', title: '施工状态', templet:'#state', width:120},
		{fixed: 'right', title: '操作', width: 300, align: 'center', toolbar: '#barDemo'}
	]];
	

	//JavaScript代码区域
	layui.use(['layer', 'table'], function() {
		var layer = layui.layer, 
			table = layui.table;
		
		// 执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-140',
			url: LOCAL_ADDRESS+'construction/getConstructionListByCompanyIdAndState?companyId='+userInfo.company.id+'&state=', 
			title: '施工任务列表',
			totalRow: true, 
			cols: col,
			page: true, 
			limits: [10,15,20,30,60],
			limit: 15,
			request: {pageName: 'page',} 
		});
		//【监听下拉框选择事件】
		form.on('select(status)', function (obj) {
			if(obj.value == 0){
				url = LOCAL_ADDRESS+'construction/getConstructionListByCompanyIdAndState?companyId='+userInfo.company.id+'&state=0';
				tableIns.reload({url: url, page: {curr: 1} });
			}else if(obj.value == 1){
				url = LOCAL_ADDRESS+'construction/getConstructionListByCompanyIdAndState?companyId='+userInfo.company.id+'&state=1';
				tableIns.reload({url: url, page: {curr: 1} });
			}else if(obj.value == 2){
				url = LOCAL_ADDRESS+'construction/getConstructionListByCompanyIdAndState?companyId='+userInfo.company.id+'&state=2';
				tableIns.reload({url: url, page: {curr: 1} });
			}else{
				url = LOCAL_ADDRESS+'construction/getConstructionListByCompanyIdAndState?companyId='+userInfo.company.id+'&state=';
				tableIns.reload({url: url, page: {curr: 1} });
			}
		});
		//【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
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
	
	// 安排施工任务
	function add(data){
		//console.log(data);
		layer.open({
			title: '安排施工任务',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'construction-arrangetask.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 修改安排计划
	function mod(data){
		layer.open({
			title: '修改安排计划',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'construction-modtask.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 查看施工记录
	function detail(data){
		layer.open({
			title: '查看施工记录',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'construction-detail.html?id=' + data.id,
			area: [750 + 'px', 450 + 'px']
		});
	}
	
	
	
	
}