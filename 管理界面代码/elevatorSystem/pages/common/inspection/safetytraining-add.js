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

	// 重置
    function reset(form){
    	form.val("show_form", {
			"trainingDate": "",
			"participantNumber": "",	
			"record": ""
		});
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "safetyTraining/addSafetyTraining"
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