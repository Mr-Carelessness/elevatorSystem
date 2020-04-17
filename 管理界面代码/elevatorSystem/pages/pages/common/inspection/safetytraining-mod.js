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
		"companyId": userInfo.company.id,
		"trainingDate": "",
		"priticipantNumber": "",	
		"record": "",
		"imgUrl": ""
	};
	
	layui.use(['form', 'layer', 'upload', 'laydate'], function() {
		var form = layui.form,
			layer = layui.layer,
			upload = layui.upload,
			laydate = layui.laydate;
		
		getFormData(formData.id, form);
		
		// 培训日期
		laydate.render({
		    elem: '#trainingDate',
		    type: 'date',
			format: 'yyyy-MM-dd',
			trigger: 'click',
		    done: function(value, date, endDate){
	        	formData.trainingDate = value;
	      	}
		});
		
		
		// 上传培训图片
		upload.render({
			elem: '#btn-img',
			url: config.elevatorBackUrl + 'other/upload/img',
			multiple: false,
			data: {},
			before: function(obj) {
				obj.preview(function(index, file, result) {
					$('#img-img').attr('src', result);
				});
			},
			done: function(res) {
				if(res.code < 0) {
					return layer.msg('图片上传失败');
				} else {
					formData.imgUrl = res.data;
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
		//console.log(id);
		var url = config.elevatorBackUrl + "safetyTraining/getSafetyTrainingById?id="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	rawData = result.data;
		        form.val("show_form", {
		        	"trainingDate": result.data.trainingDate,
					"participantNumber": result.data.participantNumber,	
					"record": result.data.record
				});
				if(result.data.imgUrl != null && result.data.imgUrl != ""){
					$('#img-img').attr('src', result.data.imgUrl);
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
    	formData.trainingDate = rawData.trainingDate;
    	formData.participantNumber = rawData.participantNumber;
    	formData.record = rawData.record;
    	formData.imgUrl = rawData.imgUrl;
    	
    	form.val("show_form", {
			"trainingDate": rawData.trainingDate,
			"participantNumber": rawData.participantNumber,	
			"record": rawData.record
		});
		if(rawData.imgUrl != null && rawData.imgUrl != ""){
			$('#img-img').attr('src', rawData.imgUrl);
		}
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "safetyTraining/modifySafetyTraining"
		var pdata = data.field;
		// 获取表单值并赋值到formData中
		formData.trainingDate = pdata.trainingDate;
		formData.participantNumber = pdata.participantNumber;
		formData.record = pdata.record;
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