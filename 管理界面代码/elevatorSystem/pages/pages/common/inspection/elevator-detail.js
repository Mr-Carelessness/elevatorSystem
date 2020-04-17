//========================================
init();
//========================================
function init() {
	layui.use('form', function() {
		form = layui.form;
		layer = layui.layer;
		load();
	});
}

function load() {
	var userInfo = JSON.parse(localStorage.getItem("adminInfo"));
	const LOCAL_ADDRESS = config.elevatorBackUrl;
	
	var id = getUrlParam("id");
	var formData = {};
	
	layui.use(['form', 'layer'], function() {
		var form = layui.form,
			layer = layui.layer;
		
		getFormData(id, form);
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
	function getFormData(id, form){
		//console.log(id);
		var url = config.elevatorBackUrl + "elevator/getElevatorById?id="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	formData = result.data;
		        form.val("show_form", {
					"elevatorName": getString(result.data.elevatorName),
					"company": getString(result.data.company.cname),
					"address": getString(result.data.address),
					"state": getState(result.data.state),
					"runningDate": getString(result.data.runningDate),
					"floor": getString(result.data.floor),
					"speed": getString2(result.data.speed,'m/s'),
					"weight": getString2(result.data.weight,'kg'),
					"liftHeight": getString2(result.data.liftHeight,'m'),
					"equipmentType": getString(result.data.equipmentType),
					"equipmentName": getString(result.data.equipmentName),
					"typeNumber": getString(result.data.typeNumber)
				});
				if(result.data.state == 0){
					document.getElementById("runningDate").style.display = "none";
				}
				
				
				form.render();
	        }
	  });   
	}
	
	// 根据state值获取当前状态
	function getState(state){
		if(state == 0){
			return "建造中";
		}else if(state == 1){
			return "待投入运行";
		}else if(state == 2){
			return "运行中";
		}else if(state == 3){
			return "维修中";
		}else{
			return "";
		}
	}
	
	// 获取非空字符串
	function getString(str){
		if(str == null){
			return "";
		}else{
			return str;
		}
	}
	
	// 获取非空字符串
	function getString2(str, str2){
		if(str == null){
			return "";
		}else{
			return str+ str2;
		}
	}
}