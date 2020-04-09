//========================================
init();
//========================================

function setIframeHeight(iframe) {
	if (iframe) {
		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
		if (iframeWin.document.body) {
			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
		}
	}
};
	
window.onload = function () {
	setIframeHeight(document.getElementById('frame'));
};


function exitSystem() {
	console.log("退出系统");
	location.href = "../login/login.html";
	localStorage.setItem("adminInfo","");
	return false;
}

function init() {
	var userInfo = JSON.parse(localStorage.getItem("adminInfo"));
	init();
	
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
			content: '../common/adminInfo/updatePwd.html',
			area: [500 + 'px', 300 + 'px']
		}); 
	}
	
	function init(){
		var auth = userInfo.company.authority;
		if(auth[0] == 1){
			document.getElementById("li-construction").style.display = "block";
		}else{
			document.getElementById("li-construction").style.display = "none";
		}
		
		if(auth[1] == 1){
			document.getElementById("li-inspection").style.display = "block";
		}else{
			document.getElementById("li-inspection").style.display = "none";
		}
		
		if(auth[2] == 1){
			document.getElementById("li-maintainence").style.display = "block";
		}else{
			document.getElementById("li-maintainence").style.display = "none";
		}
		
		if(auth[3] == 1){
			document.getElementById("li-testing").style.display = "block";
		}else{
			document.getElementById("li-testing").style.display = "none";
		}
		
		
		
	}
}