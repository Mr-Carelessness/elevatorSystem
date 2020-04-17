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
		{field: 'elevatorName', title: '电梯名称'},
		{field: 'address', title: '地址'},
		{field: 'cname', title: '所属公司', templet:'#cname'},
		{field: 'state', title: '当前状态', templet:'#state', width:100},
		{field: 'score', title: '电梯得分', templet:'#score', width:90},
		{fixed: 'right', title: '操作', width: 360, align: 'center', toolbar: '#barDemo'}
	]];
	var company_col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'cname', title: '公司名称', width:200 },
		{ field: 'address', title: '地址', width:250 },
	]];
	var companyId = "";
	
	
	//JavaScript代码区域
	layui.config({
		base: '../../../src/layui_ext/'
	}).extend({ 
		tableSelect: 'tableSelect' //定义该组件模块名
	}).use(['layer', 'table', 'tableSelect'], function() {
		var layer = layui.layer, 
			table = layui.table,
			tableSelect = layui.tableSelect;
		
		// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#company',
			checkedKey: 'id',
			searchKey: 'name',
			table: {
				url: LOCAL_ADDRESS+'company/getCompanyListByName',
				cols: company_col,
				limit: 10,
				limits: [10,20],
				request: {
					pageName: 'page',//页码的参数名称，默认：page
				} 
			},
			done: function (elem, data) {
				//console.log('选择数据') 
				//console.log(data)  //访问name：data.data[0].name
				console.log( data.data[0].cname )
				console.log( data.data[0].id )
				if(data.data != null && data.data.length > 0){
					companyId = data.data[0].id;
					elem.val(data.data[0].cname);
				}else{
					companyId = "";
					elem.val("");
				}
			}
	    })
		// 执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-125',
			url: LOCAL_ADDRESS+'elevator/getElevatorListByNameAndCompanyId?companyId=&name=', 
			title: '管理员表',
			totalRow: true, 
			cols: col,
			page: true, 
			limits: [10,15,20,30,60],
			limit: 15,
			request: {pageName: 'page',} 
		});
		
		//【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
        });
        //【搜索】
		$('#btn-search').on('click', function () {
            var keyword = $("#keyword").val();
            search(tableIns, keyword);
        });
        
        
        //监听行工具事件
		table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detail') {
				detail(obj.data);
			} else if(layEvent === 'record') {
				record(obj.data);
			} else if(layEvent === 'score') {
				score(obj.data);
			} else if(layEvent === 'expr'){
				expr(obj.data);
			}
		});
        
        
		
	});
	
	
	// 【搜索】
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'elevator/getElevatorListByNameAndCompanyId?companyId='+companyId+'&name='+keyword;
		tableIns.reload({url: url, page: {curr: 1} });
	}
	
	// 【电梯详情】
	function detail(data){
		layer.open({
            type: 2,
            title: data.elevatorName+'——详细信息',
            maxmin: true,
            area: [780 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevator-detail.html?id=' + data.id,
        });
	}
	
	// 【电梯记录】
	function record(data){
		layer.open({
            type: 2,
            title: data.elevatorName+'——电梯记录',
            maxmin: true,
            area: [1120 + 'px', 620 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevator-record.html?id=' + data.id + '&state=' + data.state,
        });
	}
	
	// 【电梯得分】
	function score(data){
		layer.open({
            type: 2,
            title: data.elevatorName+'——得分情况',
            maxmin: true,
            area: [780 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevator-score.html?id=' + data.id + '&score=' +data.score,
        });
	}
	
	// 【用户评价】
	function expr(data){
		layer.open({
            type: 2,
            title: data.elevatorName+'——电梯评价',
            maxmin: true,
            area: [780 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevator-userexpr.html?id=' + data.id,
        });
	}
}