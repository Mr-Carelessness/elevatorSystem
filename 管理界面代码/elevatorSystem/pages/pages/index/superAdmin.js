//========================================
init();
//========================================

function exitSystem(){
	console.log("退出系统");
	location.href = "../login/login.html";
	localStorage.setItem("adminInfo","");
	return false;
}

function init() {
	if(localStorage.getItem("adminInfo") == "" || localStorage.getItem("adminInfo") == null){
		alert("你还没有登录系统，请先进行登录操作");
		location.href = "../login/login.html";
	}
	//JavaScript代码区域
	layui.use(['element', 'layer'], function() {
		var element = layui.element,
			layer = layui.layer;
		var userInfo = JSON.parse(localStorage.getItem("adminInfo"));
		document.getElementById("txt-name").innerText = "管理员："+userInfo.mname;
		document.getElementById("adminIcon").src = config.systemImgUrl.superAdminIcon;
		
		
		$('#updatePwd').on('click', function () {
            updatePwd();
            return false;
       	});
	});
	
	function updatePwd(){
		var index = layer.open({
			title: '修改密码',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: '../super/adminInfo/updatePwd.html',
			area: [500 + 'px', 300 + 'px']
		}); 	
	}
	
	
}


