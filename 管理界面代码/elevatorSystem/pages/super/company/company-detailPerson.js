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
	var cnt1=0,cnt2=0;
	getFormData(id);
	
	
	// 表格对应列
	var col = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'mname', title: '姓名/名称'},
	]];
	// 表格对应列
	var col2 = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'realname', title: '姓名/名称'},
		{field: 'type', title: '类别', width: 165, templet:'#type'},
		{field: 'telephone', title: '联系电话'}
	]];
	
	
	//JavaScript代码区域
	layui.use(['table', 'layer', 'element'], function() {
		var table = layui.table;
		//执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: '300',
			url: LOCAL_ADDRESS + 'manager/getManagerListByCompanyIdAndName?companyId='+id+'&mname=', //数据接口	
			title: '公司管理员列表',
			totalRow: true, //开启合计行	
			cols: col,
			page: true, //开启分页	
			limits: [5,10,15,20],
			limit: 5,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
		});
		//执行一个 table 实例 
		var tableIns2 = table.render({
			elem: '#demo2',
			height: '300',
			url: LOCAL_ADDRESS + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+id+'&type=>0&realname=', //数据接口	
			title: '公司操作者列表',
			totalRow: true, //开启合计行	
			cols: col2,
			page: true, //开启分页	
			limits: [5,10,15,20],
			limit: 5,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
		});
		
		
		//【添加】
		$('#btn-add').on('click', function () {
            add();
        });
        //【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
        });
        $('#btn-refresh2').on('click', function () {
            tableIns2.reload({page: {curr: 1} });
        });
		//【搜索】
		$('#btn-search').on('click', function () {
            var keyword = $("#keyword").val();
            search(tableIns, keyword);
        });
		//【搜索】
		$('#btn-search2').on('click', function () {
            var keyword = $("#keyword2").val();
            search2(tableIns2, keyword);
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
	
	// 根据id赋值原数据
	function getFormData(id){
		console.log(id);
		var url = config.elevatorBackUrl + 'manager/getManagerListByCompanyIdAndName?page=1&limit=10&companyId='+id+'&mname=';
		var url2 = config.elevatorBackUrl + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?page=1&limit=10&companyId='+id+'&type=>0&realname=';
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	cnt1 = result.count;
	        }
	        setCnt1();
	    });   
	    $.get(url2, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	cnt2 = result.count; 
	        }
	        setCnt2();
	    });   
	}
	
	// 赋值cnt1,cnt2
	function setCnt1(){
		document.getElementById("managerNumber").textContent = cnt1;
	}
	function setCnt2(){
		 document.getElementById("operatorNumber").textContent = cnt2;
	}
	
	// 添加管理员
	function add(){
		
	}
	
	
	// 寻找并赋值管理员表
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'manager/getManagerListByCompanyIdAndName?companyId='+id+'&mname='+keyword;
		tableIns.reload({url: url, page: {curr: 1} });
	}
	
	// 寻找并赋值操作者表
	function search2(tableIns2, keyword){
		var url = config.elevatorBackUrl + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+id+'&type=>0&realname='+keyword;
		tableIns2.reload({url: url, page: {curr: 1} });
	}
	
}