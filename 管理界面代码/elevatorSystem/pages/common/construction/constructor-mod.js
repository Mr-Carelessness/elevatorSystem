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
		"username": "",
		"realname": "",	
		"type": 1,
		"companyId": userInfo.company.id,
		"telephone": ""
	};
	
	layui.use(['form', 'layer', 'upload'], function() {
		var form = layui.form,
			layer = layui.layer,
			upload = layui.upload;
			
		getFormData(formData.id, form);
		
		// 上传公司图标
		upload.render({
			elem: '#btn-avatar',
			url: config.elevatorBackUrl + 'other/upload/img',
			multiple: false,
			data: {},
			before: function(obj) {
				obj.preview(function(index, file, result) {
					$('#img-avatar').attr('src', result);
				});
			},
			done: function(res) {
				if(res.code < 0) {
					return layer.msg('图片上传失败');
				} else {
					formData.avatarUrl = res.data;
					return layer.msg('图片上传成功');
				}
			}
		});
		
		// 上传公司公章
		upload.render({
			elem: '#btn-license',
			url: config.elevatorBackUrl + 'other/upload/img',
			multiple: false,
			data: {},
			before: function(obj) {
				obj.preview(function(index, file, result) {
					$('#img-license').attr('src', result);
				});
			},
			done: function(res) {
				if(res.code > 0) {
					return layer.msg('图片上传失败');
				} else {
					formData.licenseUrl = res.data;
					return layer.msg('图片上传成功');
				}
			}
		});
		
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
	
	// 根据id赋值原数据
	function getFormData(id, form){
		console.log(id);
		var url = config.elevatorBackUrl + "operator/getOperatorById?id="+id;
		$.get(url, function(result, status){
			console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	rawData = result.data;
		        form.val("show_form", {
					"username": result.data.username,
					"realname": result.data.realname,
					"telephone": result.data.telephone
				});
				if(result.data.avatarUrl != null && result.data.avatarUrl != ""){
					$('#img-avatar').attr('src', result.data.avatarUrl);
				}
				if(result.data.licenseUrl != null && result.data.licenseUrl != ""){
					$('#img-license').attr('src', result.data.licenseUrl);
				}
				
				
				form.render();
	        }
	  });   
	}
	
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
	
	// 重置
    function reset(form){
        form.val("show_form", {
			"username": rawData.username,
			"realname": rawData.realname,
			"telephone": rawData.telephone
		});
    	if(rawData.avatarUrl != null && rawData.avatarUrl != ""){
			$('#img-avatar').attr('src', rawData.avatarUrl);
		}
		if(rawData.licenseUrl != null && rawData.licenseUrl != ""){
			$('#img-license').attr('src', rawData.licenseUrl);
		}
    	formData.username = rawData.username;
    	formData.realname = rawData.realname;
    	formData.telephone = rawData.telephone;
    	formData.avatarUrl = rawData.avatarUrl;
    	formData.licenseUrl = rawData.licenseUrl;
    	
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "operator/modifyOperator"
		var pdata = data.field;
		// 获取表单值并赋值到formData中
		formData.username = pdata.username;
		formData.realname = pdata.realname;
		formData.telephone = pdata.telephone;
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