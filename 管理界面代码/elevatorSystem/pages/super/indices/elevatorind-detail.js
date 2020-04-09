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
	
	var id = getUrlParam("elevatorId");
	var score = getUrlParam("score");
	var formData = {};
	
	//JavaScript代码区域
	layui.use(['table', 'layer', 'rate'], function() {
		var table = layui.table,
			rate = layui.rate;
			
		getFormData(id, form, rate);	
			
		
		
		
		
		
		
		
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
	function getFormData(id, form, rate){
		//console.log("Id--"+id);
		var url = config.elevatorBackUrl + "indices/getElevatorIndicesByElevatorId?elevatorId="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	formData = result.data;	
	        	
	        	document.getElementById("score").innerText = Math.round(score*20);
	        	document.getElementById("score").style.color = getStarColor(score);
	        	document.getElementById("hint").innerText = getHint(score);
	        	document.getElementById("hint").style.background = getStarColor(score);
	        	document.getElementById("hint").style.color = "#f2f2f2";
	        	document.getElementById("ind1").innerText = formData.ind1;
				rate.render({
				    elem: '#rate1',
				    value: getStarScore(formData.ind1), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind1)
				});
	        	document.getElementById("ind2").innerText = formData.ind2;
				rate.render({
				    elem: '#rate2',
				    value: getStarScore(formData.ind2), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind2)
				});
	        	document.getElementById("ind3").innerText = formData.ind3;
				rate.render({
				    elem: '#rate3',
				    value: getStarScore(formData.ind3), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind3)
				});
	        	document.getElementById("ind4").innerText = formData.ind4;
				rate.render({
				    elem: '#rate4',
				    value: getStarScore(formData.ind4), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind4)
				});
	        	document.getElementById("ind5").innerText = formData.ind5;
				rate.render({
				    elem: '#rate5',
				    value: getStarScore(formData.ind5), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind5)
				});
	        	document.getElementById("ind6").innerText = formData.ind6;
				rate.render({
				    elem: '#rate6',
				    value: getStarScore(formData.ind6), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind6)
				});
	        	document.getElementById("ind7").innerText = formData.ind7;
				rate.render({
				    elem: '#rate7',
				    value: getStarScore(formData.ind7), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind7)
				});
	        	document.getElementById("ind8").innerText = formData.ind8;
				rate.render({
				    elem: '#rate8',
				    value: getStarScore(formData.ind8), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind8)
				});
	        	document.getElementById("ind9").innerText = formData.ind9;
				rate.render({
				    elem: '#rate9',
				    value: getStarScore(formData.ind9), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind9)
				});
	        	document.getElementById("ind10").innerText = formData.ind10;
				rate.render({
				    elem: '#rate10',
				    value: getStarScore(formData.ind10), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind10)
				});
	        	document.getElementById("ind11").innerText = formData.ind11;
				rate.render({
				    elem: '#rate11',
				    value: getStarScore(formData.ind11), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind11)
				});
	        	document.getElementById("ind12").innerText = formData.ind12;
				rate.render({
				    elem: '#rate12',
				    value: getStarScore(formData.ind12), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.ind12)
				});
				form.render();
	        }
	  });   
	}
	
	// 获取星星数据
	function getStarScore(score){
		var zs = Math.floor(score);
		var xs = score - zs;
		if(xs >= 0 && xs < 0.25){
			return zs;
		}else if(xs >= 0.25 && xs <= 0.75){
			return zs+0.5;
		}else if(xs > 0.75){
			return zs+1;
		}
	}
	
	// 指定星星颜色
	function getStarColor(score){
		if(score >= 0 && score < 2){
			return "#FF5722";
		}else if(score >= 2 && score < 3){
			return "#FFB800";
		}else if(score >= 3 && score < 4){
			return "#5FB878";
		}else{
			return "#009688";
		}
	}
	
	// 指定提示信息
	function getHint(score){
		if(score >= 0 && score < 2){
			return "提示：该电梯目前处于非常危险的状态，请及时停止电梯的使用，对电梯进行维修！";
		}else if(score >= 2 && score < 3){
			return "提示：该电梯目前处于较为危险的状态，请及时维修电梯，并注意部分得分较低的细节！";
		}else if(score >= 3 && score < 4){
			return "提示：该电梯目前运行较为正常，请注意部分指标是否得分较低，并对相应部分进行改进！";
		}else{
			return "提示：该电梯目前运行状况正常，请放心使用！";
		}
	}
}