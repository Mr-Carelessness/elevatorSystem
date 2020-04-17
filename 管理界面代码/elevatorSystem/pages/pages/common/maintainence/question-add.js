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
		"question": "",
		"answerA": "",
		"answerB": ""
	};
	
	layui.use(['form', 'layer'], function() {
		var form = layui.form,
			layer = layui.layer;
			
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
	
	// 重置
    function reset(form){
    	form.val("show_form", {
			"question": "",
			"answerA": "",
			"answerB": "",
			"answerC": "",
			"answerD": "",
			"answerE": ""
		});
		form.render();
    }
	
	// 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "question/addQuestion"
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
					layer.alert("添加成功！", {
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