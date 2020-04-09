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
	var elevatorId = getUrlParam("id");
	
	// 表格对应列
	var col = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'operator', title: '评价者', templet: '#operator', width:150},
		{field: 'record', title: '评价内容'},
		{field: 'score', title: '得分', templet: '#score', width:80}
	]];
	
	//JavaScript代码区域
	layui.use(['layer', 'table'], function() {
		var layer = layui.layer, 
			table = layui.table;
			
		// 执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-105',
			url: LOCAL_ADDRESS+'userexpr/getUserexprListByElevatorId?elevatorId='+elevatorId, 
			title: '用户体验列表',
			totalRow: true, 
			cols: col,
			page: true, 
			limits: [10,15,20,30],
			limit: 10,
			request: {pageName: 'page',} 
		});
		
		//【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
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