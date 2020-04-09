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
	var formData = {};
	var id = getUrlParam("id");
	
	
	layui.use(['form', 'layer', 'layedit'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit;
		
		init(form);
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
	
	// 赋值
	function init(form){
		//console.log(id);
		var url = config.elevatorBackUrl + "construction/getConstructionById?id="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	formData = result.data;   	
	        	
	        	form.val("show_form", {
					"elevator": formData.elevator.elevatorName,
					"company": formData.elevator.company.cname,
					"operator": formData.operator==null?'待安排':formData.operator.realname,
					"state": getState(formData.state)
				});
				if(formData.state >= 1){
					form.val("show_form", {
						"licenseNumber": formData.licenseNumber,
						"type": formData.type,
						"startDate": formData.startDate,
						"finishDate": formData.finishDate,
						"record": formData.record
					});
				}else{
					document.getElementById("construction-info").style.display = "none";
				}
				if(formData.state >= 2){
					form.val("show_form", {
						"equipmentName": formData.elevator.equipmentName,
						"equipmentType": formData.elevator.equipmentType,
						"typeNumber": formData.elevator.typeNumber,
						"floor": formData.elevator.floor,
						"liftHeight": formData.elevator.liftHeight+'m',
						"speed": formData.elevator.speed+'m/s',
						"weight": formData.elevator.weight+'kg'
					});					
				}else{
					document.getElementById("elevator-info").style.display = "none";
				}

				form.render();
	        }
	   });   
	}
	
	// 获取当前状态
	function getState(state){
		if(state == 0){
			return '待安排人员';
		}else if(state == 1){
			return '施工中';
		}else if(state == 2){
			return '施工完成';
		}else{
			return "";
		}
	}
}





