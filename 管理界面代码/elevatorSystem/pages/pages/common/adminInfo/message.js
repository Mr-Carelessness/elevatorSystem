//========================================
init();
//========================================
function init(){
	layui.use(['form', 'layer'], function() {
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
		{field: 'id', title: '序号', type:"numbers", width:80},
		{field: 'senderName', width:160, title: '发送者', templet:"#senderName"},
		{field: 'receiverName', width:160, title: '接收者'},
		{field: 'sendTime', width:120, title: '发送时间'},
		{field: 'content', title: '发送内容'},
		{fixed: 'right', title: '操作', width: 140, align: 'center', toolbar: '#barDemo'}
	]];
	// 表格对应列
	var col2 = [[
		{field: 'id', title: '序号', type:"numbers", width:80},
		{field: 'senderName', width:160, title: '发送者'},
		{field: 'receiverName', width:160, title: '接收者', templet:"#receiverName2"},
		{field: 'sendTime', width:120, title: '发送时间'},
		{field: 'content', title: '发送内容'},
		{fixed: 'right', title: '操作', width: 140, align: 'center', toolbar: '#barDemo2'}
	]];
	
	
	//JavaScript代码区域
	layui.use(['table', 'element'], function() {
		var table = layui.table,
			element = layui.element;
		var url;
		
		
		var table = layui.table;
		//执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-170',			
			url: LOCAL_ADDRESS + 'message/getMessageListByReceiverAndState?status=0&receiverType=1&receiverId='+userInfo.id, //数据接口
			title: '我收到的消息',
			totalRow: true, //开启合计行	
			cols: col,
			page: true, //开启分页	
			limits: [10, 15, 30, 60, 100],
			limit: 15,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
		});
		//执行一个 table 实例
		var tableIns2 = table.render({
			elem: '#demo2',
			height: 'full-170',
			url: LOCAL_ADDRESS + 'message/getMessageListBySender?senderType=1&senderId='+userInfo.id, //数据接口	
			title: '我发出的消息',
			totalRow: true, //开启合计行	
			cols: col2,
			page: true, //开启分页	
			limits: [10, 15, 30, 60, 100],
			limit: 15,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
		});
		
		
		//【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
        });
		//【添加】
		$('#btn-add2').on('click', function () {
            add();
        });
        //【重载】
		$('#btn-refresh2').on('click', function () {
            tableIns2.reload({page: {curr: 1} });
        });
		
		//【监听下拉框选择事件】
		form.on('select(status)', function (obj) {
			if(obj.value == 0){
				url = LOCAL_ADDRESS + 'message/getMessageListByReceiverAndState?status=0&receiverType=1&receiverId='+userInfo.id;
				tableIns.reload({url: url, page: {curr: 1} });
			}else if(obj.value == 1){
				url = LOCAL_ADDRESS + 'message/getMessageListByReceiverAndState?status=1&receiverType=1&receiverId='+userInfo.id;
				tableIns.reload({url: url, page: {curr: 1} });
			}else{
				url = LOCAL_ADDRESS + 'message/getMessageListByReceiverAndState?status=&receiverType=1&receiverId='+userInfo.id;
				tableIns.reload({url: url, page: {curr: 1} });
			}
		});
		//【监听行工具事件】
		table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detail') {
				detail(obj.data);
			} else if(layEvent === 'changeState') {
				changeState(tableIns, obj.data);
			}
		});
		
		//【监听行工具事件】
		table.on('tool(test2)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detail') {
				detail(obj.data);
			} else if(layEvent === 'del') {
				remove(tableIns2, obj.data);
			}
		});
		
	});
	
	
	// 添加
	function add(){
		layer.open({
			title: '发送消息',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'message-add.html',
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 查看信息
	function detail(data){
		layer.open({
			title: '查看消息',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'message-detail.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 删除
	function changeState(tableIns, data){
		var url = config.elevatorBackUrl + 'message/modifyMessageStatus';
		var formData = {
			"id": data.id,
			"status": 1
		};
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				//console.log(result)
				if(result.code == 0) {
					tableIns.reload();
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			}
		})			
		
		
	}
	
	// 删除
	function remove(tableIns, data){
		var url = config.elevatorBackUrl + 'message/removeMessage?id='+data.id;
		//console.log(url);
		layer.confirm('真的要删除吗？', function(index) {
			$.get(url, function(result) {
				//console.log(result)
				if(result.code == 0) {
					layer.alert("删除成功！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
						tableIns.reload();
					})
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			});
			layer.close(index);
		});
	}
	
}