//========================================
init();
//========================================

function updateVerify() {

}

function init() {
	
	layui.use(['layer', 'element', 'form'], function() {
		var layer = layui.layer, //弹层
			element = layui.element, //元素操作
			form = layui.form //表单
		form.on('submit(formDemo)', function(data) {
			//console.log(data.field);
			var id = data.field.username;
			var pwd = data.field.password;

			$.ajax({
				url: config.elevatorBackUrl + "manager/loginManager?username="+id+"&password="+pwd,
				type: "POST",
				dataType: 'JSON',
				data: {},
				contentType: "application/json; charset=utf-8",
				success: function(res) {
					if(res.code == 0 && res.data != null){
						console.log(res);
						//alert("登录成功！");
						localStorage.setItem("adminInfo", JSON.stringify(res.data));
						if(res.data.type == 1){//超级管理员
			    			location.href = "../index/superAdmin.html";
			    		}else if(res.data.type == 0){//普通管理员
			    			location.href = "../index/admin.html";
			    		}
					}else{
						alert(res.msg);
					}
				}
			});

			return false; //阻止表单跳转
		});
	});
}

