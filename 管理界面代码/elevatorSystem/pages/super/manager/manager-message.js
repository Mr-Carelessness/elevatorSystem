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
		{field: 'receiverName', width:180, title: '接收者'},
		{field: 'sendTime', width:180, title: '发送时间'},
		{field: 'content', title: '发送内容'},
		{fixed: 'right', title: '操作', width: 240, align: 'center', toolbar: '#barDemo'}
	]];
	
	// 获取传送过来的数据
	var id2 = getUrlParam("id");
	var type2 = 1;
	
	//JavaScript代码区域
	layui.use(['layer', 'table'], function() {
		var layer = layui.layer, 
			table = layui.table;
		
		// 执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-40',
			url: LOCAL_ADDRESS+'message/getMessageBySenderAndReceiver?id1='+userInfo.id+'&type1='+1+'&id2='+id2+'&type2='+1, 
			title: '消息列表',
			totalRow: true, 
			cols: col,
			page: true, 
			limits: [10,15,20,30,60],
			limit: 15,
			request: {pageName: 'page',} 
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
}