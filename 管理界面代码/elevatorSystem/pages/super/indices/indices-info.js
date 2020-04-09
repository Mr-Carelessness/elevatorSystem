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
	
	//JavaScript代码区域
	layui.use(['table', 'layer'], function() {
		var table = layui.table;
		
		// 获取初始值
		getFormData(form);
		
		
	});
	
	// 根据id赋值原数据
	function getFormData(id, form){
		//console.log("Id--"+id);
		var url = config.elevatorBackUrl + "indices/getWeightOfIndices";
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	formData = result.data;	
	        	document.getElementById("ind1").innerText = formData.ind1;
	        	document.getElementById("ind2").innerText = formData.ind2;
	        	document.getElementById("ind3").innerText = formData.ind3;
	        	document.getElementById("ind4").innerText = formData.ind4;
	        	document.getElementById("ind5").innerText = formData.ind5;
	        	document.getElementById("ind6").innerText = formData.ind6;
	        	document.getElementById("ind7").innerText = formData.ind7;
	        	document.getElementById("ind8").innerText = formData.ind8;
	        	document.getElementById("ind9").innerText = formData.ind9;
	        	document.getElementById("ind10").innerText = formData.ind10;
	        	document.getElementById("ind11").innerText = formData.ind11;
	        	document.getElementById("ind12").innerText = formData.ind12;
				form.render();
	        }
	  });   
	}
	
	
}