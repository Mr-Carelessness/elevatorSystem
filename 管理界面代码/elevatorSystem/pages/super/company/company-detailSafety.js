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
	var rawData = {};
	
	
	layui.use(['form'], function() {
		var form = layui.form;
		console.log(132)
		// 获取初始值并赋值
		getFormData(id);
		form.render(); 
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
		var url = config.elevatorBackUrl + "company/getCompanyById?id="+id;
		$.get(url, function(result, status){
			console.log(result);
	        if(result.code == 0){
	        	rawData = result.data;   	
	        	form.val("show_form", {
					"safetyManagementInfo": rawData.safetyManagementInfo,
					"securityTechnologyInfo": rawData.securityTechnologyInfo,
					"emegyTechnologyInfo": rawData.emegyTechnologyInfo,
					"safetyOrganizationInfo": rawData.safetyOrganizationInfo
				});
				form.render(); 
	        }
	    });   
	}
}
