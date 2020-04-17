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
	
	var rawData = {};
	var formData = {
		"id": getUrlParam("id"),
		"question": "",
		"answerA": "",
		"answerB": ""
	};
	
	layui.use(['form', 'layer'], function() {
		var form = layui.form,
			layer = layui.layer;
		
		getFormData(formData.id, form);
		
		//监听提交
		form.on('submit(sub)', function(data) {
			submit(data, parent);
			return false;
		});
		
		//监听重置
		form.on('submit(reset)', function(data) {
			reset(form);
			return false;
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
	function getFormData(id, form){
		console.log(id);
		var url = config.elevatorBackUrl + "question/getQuestionById?id="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	rawData = result.data;
		        form.val("show_form", {
					"question": result.data.question,
					"answerA": result.data.answerA,
					"answerB": result.data.answerB,
					"answerC": result.data.answerC,
					"answerD": result.data.answerD,
					"answerE": result.data.answerE
				});
				
				form.render();
	        }
	  });   
	}
	
	// 重置
    function reset(form){
    	form.val("show_form", {
			"question": rawData.question,
			"answerA": rawData.answerA,
			"answerB": rawData.answerB,
			"answerC": rawData.answerC,
			"answerD": rawData.answerD,
			"answerE": rawData.answerE
		});
		form.render();
    }
	
	// 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "question/modifyQuestion"
		var pdata = data.field;
		// 获取表单值并赋值到formData中
		formData.question = pdata.question;
		formData.answerA = pdata.answerA;
		formData.answerB = pdata.answerB;
		if(pdata.answerC != null && pdata.answerC != "")
			formData.answerC = pdata.answerC;
		if(pdata.answerD != null && pdata.answerD != "")
			formData.answerD = pdata.answerD;
		if(pdata.answerE != null && pdata.answerE != "")
			formData.answerE = pdata.answerE;
		
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				//console.log(result)
				if(result.code == 0) {
					layer.alert("修改成功！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
						parent.layui.table.reload('demo');
						var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
						parent.layer.close(index);
					})
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			}
		})
    }
	
	
	
}