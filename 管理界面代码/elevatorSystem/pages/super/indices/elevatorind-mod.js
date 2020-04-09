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
	var id = getUrlParam("elevatorId");
	var companyId = getUrlParam("companyId"); 
	var formData = {};
	var companyInfo = {};
	
	//JavaScript代码区域
	layui.use(['table', 'layer'], function() {
		var table = layui.table;
		
		// 获取初始值
		getFormData(id, form);
		getFormData2(companyId, form);
		
		//【查看指标说明1】
		$('#ind1').on('click', function () {
            change(1, "安全管理制度：");
            return false;
        });
		//【查看指标说明2】
		$('#ind2').on('click', function () {
            change(2, "安全技术档案：");
            return false;
        });
		//【查看指标说明3】
		$('#ind3').on('click', function () {
            change(3, "应急救援机制：");
            return false;
        });
		//【查看指标说明9】
		$('#ind9').on('click', function () {
            change(9, "安全管理机构设置：");
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
	function getFormData2(id, form){
		//console.log("companyId--"+id);
		var url = config.elevatorBackUrl + "company/getCompanyById?id="+id;
		$.get(url, function(result, status){
			console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	companyInfo = result.data;	
				form.render();
	        }
	  });   
	}
	// 根据id赋值原数据
	function getFormData(id, form){
		//console.log("Id--"+id);
		var url = config.elevatorBackUrl + "indices/getElevatorIndicesByElevatorId?elevatorId="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	formData = result.data;
	        	form.val("show_form", {
					"ind1": formData.ind1,
					"ind2": formData.ind2,
					"ind3": formData.ind3,
					"ind9": formData.ind9,
				});
				form.render();
	        }
	  });   
	}
	
	// 改变content的值
	function change(num, title){
		if(num == 1){
			document.getElementById("content").innerText = title+companyInfo.safetyManagementInfo;
		}else if(num == 2){
			document.getElementById("content").innerText = title+companyInfo.securityTechnologyInfo;
		}else if(num == 3){
			document.getElementById("content").innerText = title+companyInfo.emegyTechnologyInfo;
		}else if(num == 9){
			document.getElementById("content").innerText = title+companyInfo.safetyOrganizationInfo;
		}
	}
	
	// 重置
    function reset(form){
    	form.val("show_form", {
			"ind1": "",
			"ind2": "",
			"ind3": "",
			"ind9": ""
		});
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var pdata = data.field;
		//console.log(pdata)
		// 获取表单值并赋值到formData中
		var url = config.elevatorBackUrl + "indices/modifyElevatorIndicesAndElevatorScoreByCompanyId?companyId="+companyId+"&ind1="+pdata.ind1+"&ind2="+pdata.ind2+"&ind3="+pdata.ind3+"&ind9="+pdata.ind9;
		
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: {},
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				//console.log(result)
				if(result.code == 0) {
					layer.alert("操作成功！", {
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