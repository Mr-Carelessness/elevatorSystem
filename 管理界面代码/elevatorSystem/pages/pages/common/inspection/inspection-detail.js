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
	
	
	layui.use(['form', 'layer', 'layedit', 'table', 'rate'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit,
			rate = layui.rate,
			table = layui.table;
		
		var tableIns;
		
		
		init(form, table, rate);
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
	function init(form, table, rate){
		//console.log(id);
		var url = config.elevatorBackUrl + "inspection/getInspectionById?id="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	formData = result.data;   	
	        	
	        	form.val("show_form", {
					"elevator": formData.elevator.elevatorName,
					"operator": formData.operator==null?'待安排':formData.operator.realname,
					"inspectionDate": formData.inspectionDate,
					"record": formData.record
				});
				document.getElementById("score").innerHTML = '<span style="color: #c2c2c2; line-height:40px"> 待评分 </span>';
				document.getElementById("score").innerHTML = getScore(formData.score);
				rate.render({
				    elem: '#rate',
				    value: getStarScore(formData.score), 
				    half: true, 
				    readonly: true,
				    theme: getStarColor(formData.score)
				});
				document.getElementById("result").innerText = formData.result;
				document.getElementById("result").style.fontWeight = 900;
				if(formData.result == "异常"){
					document.getElementById("result").style.color = "#FF5722";
					document.getElementById("lbl-record").innerText = "异常情况说明";
					form.val("show_form", {
						"method": formData.method,
						"mtdstate": formData.mtdstate
					});
					// 现场照片
					var imgHtml = "";
					var imgList = formData.resultUrl.split(" ");
					for(var i=0; i<imgList.length; i++){
						//imgHtml = imgHtml + "<img src='"+imgList[i]+"' width='100' height='100' />";
						$("#resultUrl").append("<img src='"+imgList[i]+"' width='120' height='120' style='margin-right:15px' />");
					}
					console.log(imgHtml)
					//document.getElementById("resultUrl").innerHTML = imgHtml;
				}
				else {
					document.getElementById("result").style.color = "#009688";
					document.getElementById("div-method").style.display = "none";
					document.getElementById("div-mtdstate").style.display = "none";
					document.getElementById("div-resultUrl").style.display = "none";
					document.getElementById("lbl-record").innerText = "补充说明";
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
	
	// 初始化问题答案列表
	function initqatable(table, questions, answers){
		if(answers != null){
			answers = answers.substring(1,answers.length-1).split(",");
		}
		
		var url = config.elevatorBackUrl + "question/getQuestionListByIdArray";
		var fd = {
			"arr": questions
		}
		
		// 表格对应列
		var col = [[
			//{type: 'checkbox', fixed: 'left'},
			{field: 'id', title: '序号', type:"numbers", width:80},
			{field: 'question', title: '问题', width: 400},
			//{field: 'answer', title: '答案选项', templet: "#answer"},
			{field: 'chooseanswer', title: '所选答案'}
		]];
		var data = [];
		var row;
		// 执行一个 table 实例
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(fd),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				console.log(questions);
				console.log(answers);
				if(result.code == 0){
					for(var i=0;i<result.data.length;i++){
						row = result.data[i];
						if(answers == null){
							row.chooseanswer = "待选择";
						}else if(answers[i] != null){
							console.log(i+"---"+answers[i])
							if(answers[i] == "A"){
								row.chooseanswer = "[A]"+result.data[i].answerA;
							}else if(answers[i] == "B"){
								row.chooseanswer = "[B]"+result.data[i].answerB;
							}else if(answers[i] == "C"){
								row.chooseanswer = "[C]"+result.data[i].answerC;
							}else if(answers[i] == "D"){
								row.chooseanswer = "[D]"+result.data[i].answerD;
							}else if(answers[i] == "E"){
								row.chooseanswer = "[E]"+result.data[i].answerE;
							}else{
								row.chooseanswer = "";
							}
						}else{
							row.chooseanswer = "";
						}
						data[i] = row;
					}
					console.log(data);
					tableIns = table.render({
						elem: '#qatable',
						title: '维护问题列表',
						data: data, 
						cols: col,
					});
				}
			}
		})
		
	}
}





