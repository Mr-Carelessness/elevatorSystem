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
	var formData = {
		"id": userInfo.id,
		"mname": ""
	};
	
	layui.use(['form', 'layer', 'layedit'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit;
		
		form.val("show_form", {
			"username": userInfo.username,
			"mname": userInfo.mname
		});
		
		
		//修改密码
		$('#btn-modifyPwd').on('click', function () {
            updatePwd();
            return false;
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
	
	// 修改密码
	function updatePwd(){
		var index = layer.open({
			title: '修改密码',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'updatePwd.html',
			area: [500 + 'px', 300 + 'px']
		}); 	
	}
	
	// 重置
    function reset(form){
    	form.val("show_form", {
			"username": userInfo.username,
			"mname": userInfo.mname
		});
		form.render();
    }
	
	// 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "manager/modifyManager"
		// 获取表单值并赋值到formData中
		formData.mname = data.field.mname;
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				//console.log(result)
				userInfo.mname = data.field.mname;
				localStorage.setItem("adminInfo", JSON.stringify(userInfo));
				
				if(result.code == 0) {
					layer.alert("修改成功！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
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