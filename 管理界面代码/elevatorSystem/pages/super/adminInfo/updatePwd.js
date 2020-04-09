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
	
	var formData = {
		id: userInfo.id,
		password: ""
	};
	
	//[1] 文本编辑器：https://www.layui.com/doc/modules/layedit.html
	layui.use(['form', 'layer', 'layedit'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit;

		//监听提交
		form.on('submit(sub)', function(data) {
			submit(data, parent);
			return false;
		});
		
	});
	
	
    // 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "manager/modifyManager"
		var pdata = data.field;
		
		if(pdata.oldPwd != userInfo.password){
			layer.alert("旧密码输入错误！", {
				title: '提示信息：'
			})
		}else if(pdata.newPwd != pdata.newPwd2){
			layer.alert("两次输入新密码不一致！", {
				title: '提示信息：'
			})
		}else{
			formData.password = pdata.newPwd;
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
						layer.alert("修改密码成功！", {
							title: '提示信息：'
						}, function(index) {
							layer.close(index);
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
}