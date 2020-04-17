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
		//{field: 'cname', title: '所属公司', templet:'#cname'},
		{field: 'state', title: '当前状态', templet:'#state', width:100},
		{field: 'score', title: '电梯得分', templet:'#score', width:90},
		{fixed: 'right', title: '操作', width: 520, align: 'center', toolbar: '#barDemo'}
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
		
		//【新增电梯】
		$('#btn-add').on('click', function () {
            add();
        });
		
		// 执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-125',
			url: LOCAL_ADDRESS+'elevator/getElevatorListByNameAndCompanyId?companyId='+userInfo.company.id+'&name=', 
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
			} else if(layEvent === 'expr') {
				expr(obj.data);
			} else if(layEvent === 'delete') {
				remove(tableIns, obj.data);
			} else if(layEvent === 'st-arrange') {
				arrange(obj.data);
			} else if(layEvent === 'st-run') {
				run(obj.data);
			} else if(layEvent === 'st-stop') {
				stop(obj.data);
			} else if(layEvent === 'st-recover') {
				recover(obj.data);
			} 
		});
        
        
		
	});
	
	// 【新增】
	function add(){
		layer.open({
            type: 2,
            title: '新增电梯',
            maxmin: true,
            area: [780 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevator-add.html',
        });
	}
	
	// 【搜索】
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'elevator/getElevatorListByNameAndCompanyId?companyId='+userInfo.company.id+'&name='+keyword;
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
            area: [1020 + 'px', 670 + 'px'],
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
	
	// 【安排施工】
	function arrange(data){
		// 跳出新增施工页面
		// 施工公司、type=1
		layer.open({
            type: 2,
            title: data.elevatorName+'——施工公司安排',
            maxmin: true,
            area: [700 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevator-construction-add.html?elevatorId='+data.id+'&elevatorName='+encodeURI(encodeURI(data.elevatorName)),
        });
        //console.log('elevator-construction-add.html?elevatorId='+data.id+'&elevatorName='+encodeURI(encodeURI(data.elevatorName)))
	}
	
	// 【电梯运行】
	function run(data){
		// 电梯运行、state改成2
		var formatDateTime = function (date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			var minute = date.getMinutes();
			minute = minute < 10 ? ('0' + minute) : minute;
			return y + '-' + m + '-' + d;
		};

		var url = config.elevatorBackUrl + 'elevator/modifyElevator';
		var formData = {
			id: data.id,
			state: 2,
			runningDate: formatDateTime(new Date())
		};
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				//console.log(result)
				if(result.code == 0) {
					layui.table.reload('demo');
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			}
		});
	}
	
	// 【停止运行】
	function stop(data){
		// 停止电梯运行、state改成3
		var url = config.elevatorBackUrl + 'elevator/modifyElevator';
		var formData = {
			id: data.id,
			state: 3
		};
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				if(result.code == 0) {
					layui.table.reload('demo');
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			}
		});
	}
	
	// 【恢复电梯运行】
	function recover(data){
		// 恢复电梯运行、state改成2
		var url = config.elevatorBackUrl + 'elevator/modifyElevator';
		var formData = {
			id: data.id,
			state: 2
		};
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				if(result.code == 0) {
					layui.table.reload('demo');
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			}
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
	
	// 【删除】
	function remove(tableIns, data){
		var url = config.elevatorBackUrl + 'elevator/removeElevator?id='+data.id;
		layer.confirm('真的删除所选内容么？', function(index) {
			$.get(url,{},function(result){
				//console.log(result)
				if(result.code == 0){
					layer.alert("删除成功！", {title: '提示信息：'}, function(index){
						layer.close(index);
						tableIns.reload();
					})
				}else{
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})	
				}
			});
										
		});
	}
	
	
}