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
	
	
	// 表格对应列
	var col = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'elevatorName', title: '名称'},
		{field: 'address', title: '地址'},
		{field: 'floor', title: '电梯层数'}
	]];
	
	
	//JavaScript代码区域
	layui.use(['table', 'layer', 'element'], function() {
		var table = layui.table;
		//执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: '300',
			url: LOCAL_ADDRESS + 'elevator/getElevatorListByNameAndCompanyId?companyId='+id+'&name=', //数据接口	
			title: '公司电梯列表',
			totalRow: true, //开启合计行	
			cols: col,
			page: true, //开启分页	
			limits: [5,10,15,20],
			limit: 5,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
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
	
	// 寻找并赋值电梯表
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'elevator/getElevatorListByNameAndCompanyId?companyId='+id+'&name='+keyword;
		tableIns.reload({url: url, page: {curr: 1} });
	}
	
}