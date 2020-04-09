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
	
	
	var company_col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'cname', title: '公司名称', width:200 },
		{ field: 'address', title: '地址', width:250 },
	]];
	var formData = {
		username: "",
		password: "123456",	
		mname: "",
		type: "",
		companyId: "",
		creatorId: getUrlParam("id")
	};
	
	
	layui.config({
		base: '../../../src/layui_ext/'
	}).extend({ 
		tableSelect: 'tableSelect' //定义该组件模块名
	}).use(['form', 'layer', 'tableSelect'], function() {
		var form = layui.form,
			layer = layui.layer,
			tableSelect = layui.tableSelect;
		
		
		// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#company',
			checkedKey: 'id',
			searchKey: 'name',
			table: {
				url: LOCAL_ADDRESS+'company/getCompanyListByName',
				cols: company_col,
				limit: 10,
				limits: [10,20],
				request: {
					pageName: 'page',//页码的参数名称，默认：page
				} 
			},
			done: function (elem, data) {
				//console.log('选择数据') 
				//console.log(data)  //访问name：data.data[0].name
				console.log( data.data[0].cname )
				console.log( data.data[0].id )
				if(data.data != null && data.data.length > 0){
					formData.companyId = data.data[0].id;
					elem.val(data.data[0].cname);
				}else{
					formData.companyId = "";
					elem.val("");
				}
			}
	    })
		form.val("show_form", {
			"password": "123456"
		});
		// 选中普通管理员
		form.on('radio(admin0)', function(data){
			document.getElementById("company-outer").style.display = "inline-block";
		});
		// 选中超级管理员
		form.on('radio(admin1)', function(data){
			formData.companyId = "";
			document.getElementById("company-outer").style.display = "none";
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
	
	
	// 重置
    function reset(form){
    	form.val("show_form", {
			"username": "",
			"mname": ""
		});
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "manager/addManager"
		var pdata = data.field;
		// console.log(pdata)
		// 获取表单值并赋值到formData中
		formData.username = pdata.username;
		formData.mname = pdata.mname;
		formData.type = pdata.type;
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