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
	
	var rawData;
	var elevatorName = "";//decodeURI(getUrlParam("elevatorName"));
	var formData = {
		"elevatorId": getUrlParam("elevatorId"),
		"companyId": ""
	};
	var isArranged = 0;
	//console.log(decodeURI(getUrlParam("elevatorName")))
	
	
	var company_col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'cname', title: '公司名称', width:200 },
		{ field: 'address', title: '地址', width:250 },
	]];
	
	layui.config({
		base: '../../../src/layui_ext/'
	}).extend({ 
		tableSelect: 'tableSelect' //定义该组件模块名
	}).use(['form', 'layer', 'upload', 'tableSelect'], function() {
		var form = layui.form,
			layer = layui.layer,
			upload = layui.upload,
			tableSelect = layui.tableSelect;
		
		getFormData(formData.elevatorId, form);
		
		// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#company',
			checkedKey: 'id',
			//searchKey: 'realname',
			table: {
				url: LOCAL_ADDRESS+'company/getCompanyListByType?type=1',
				cols: company_col,
				limit: 5,
				limits: [5, 10, 15],
				request: {
					pageName: 'page',//页码的参数名称，默认：page
				} 
			},
			done: function (elem, data) {
				//console.log('选择数据') 
				//console.log( data.data[0].cname )
				//console.log( data.data[0].id )
				if(data.data != null && data.data.length > 0){
					formData.companyId = data.data[0].id;
					elevatorName = data.data[0].cname;
					elem.val(data.data[0].cname);
				}else{
					formData.companyId = "";
					elem.val("");
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
		var url = config.elevatorBackUrl + "construction/getConstructionByElevatorId?elevatorId="+id;
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0 && result.data != null){
	        	isArranged = 1;
	        	rawData = result.data;
	        	
	        	//console.log(result.data.elevator.elevatorName)
		        form.val("show_form", {
					"elevator": result.data.elevator.elevatorName,
					"company": result.data.company.cname
				});
				formData.companyId = result.data.company.id;
				
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
			"elevator": (rawData==null)?"":rawData.elevator.elevatorName,
			"company": (rawData==null)?"":rawData.company.cname
		});
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var url;
    	if(isArranged == 1){
    		formData.id = rawData.id;
    		url = config.elevatorBackUrl + "construction/modifyOrArrangeConstructionCompany";
    	}else{
    		url = config.elevatorBackUrl + "construction/addConstruction";
    	}
		var pdata = data.field;
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
					layer.alert("操作成功！在电梯施工人员未安排前，您可以重新安排施工公司。另外，电梯施工结束后状态会发生改变，这时您点击投入运行使用按钮运行电梯！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
						//console.log(parent.document.getElementById("company-val"))
						parent.document.getElementById("company-val").value = elevatorName;
						//parent.layui.table.reload('demo');
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