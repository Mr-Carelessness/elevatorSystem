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
	
	
	layui.use(['form', 'layer', 'layedit', 'rate'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit,
			rate = layui.rate;
		
		init(form, rate);
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
	function init(form, rate){
		//console.log(id);
		var url = config.elevatorBackUrl + "testing/getTestingById?id="+id;
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
				document.getElementById("score").innerHTML = '<span style="color: #c2c2c2; line-height:40px"> 待评分 </span>';
				if(formData.state >= 1){
					form.val("show_form", {
						"startDate": formData.startDate,
						"finishDate": formData.finishDate,
						"record": formData.record
					});
				}else{
					document.getElementById("testing-info").style.display = "none";
				}
				if(formData.state >= 2){
					document.getElementById("score").innerHTML = getScore(formData.score);
					rate.render({
					    elem: '#rate',
					    value: getStarScore(formData.score), 
					    half: true, 
					    readonly: true,
					    theme: getStarColor(formData.score)
					});
					
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
			return '检测中';
		}else if(state == 2){
			return '检测完成';
		}else{
			return "";
		}
	}
	
	// 获取得分信息
	function getScore(score){
		if(score >= 0 && score < 2){
			return '<span style="color: #FF5722;"> '+score+' </span>';
		}else if(score >= 2 && score < 3){
			return '<span style="color: #FFB800;"> '+score+' </span>';
		}else if(score >= 3 && score < 4){
			return '<span style="color: #5FB878;"> '+score+' </span>';
		}else{
			return '<span style="color: #009688;"> '+score+' </span>';
		}
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
}





