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
	
	// 表格对应列
	var col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'mname', title: '姓名/名称'},
		{field: 'type', title: '类别', templet:'#type'},
		{field: 'cname', title: '所属公司', templet:'#cname'}
	]];
	// 表格对应列
	var col2 = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'realname', title: '姓名/名称'},
		{field: 'cname', title: '所属公司', templet:'#cname2'}
	]];
	
	// 待发送数据
	var rawData = {
		"senderId": userInfo.id,
		"senderType": 1,
		"senderName": userInfo.mname,
		"receiverId": "",
		"receiverType": 1,
		"receiverName": "",
		"content": ""
	}
	
	
	layui.config({
		base: '../../../src/layui_ext/'
	}).extend({ 
		tableSelect: 'tableSelect' //定义该组件模块名
	}).use(['layer', 'table', 'tableSelect'], function() {
		var layer = layui.layer, 
			table = layui.table,
			tableSelect = layui.tableSelect;
		
		// 选中超级管理员
		form.on('radio(manager)', function(data){
			document.getElementById("manager-outer").style.display = "block";
			document.getElementById("operator-outer").style.display = "none";
			document.getElementById("receiver").value = "";
			rawData.receiverType = 1;
		});
		// 选中普通管理员
		form.on('radio(operator)', function(data){
			document.getElementById("operator-outer").style.display = "block";
			document.getElementById("manager-outer").style.display = "none";
			document.getElementById("receiver2").value = "";
			rawData.receiverType = 0;
		});
		
		// 执行一个 tableSelect 实例
		var tableIns = tableSelect.render({
	    	elem: '#receiver',
			checkedKey: 'id',
			searchKey: 'mname',
			table: {
				url: LOCAL_ADDRESS+'manager/getManagerListByCompanyIdAndName?companyId=',
				cols: col,
				limit: 5,
				limits: [5,10,20],
				request: {
					pageName: 'page',//页码的参数名称，默认：page
				} 
			},
			done: function (elem, data) {
				//console.log( data.data[0].cname )
				//console.log( data.data[0].id )
				if(data.data != null && data.data.length > 0){
					rawData.receiverId = data.data[0].id;
					rawData.receiverType = 1;
					rawData.receiverName = data.data[0].mname;
					elem.val(data.data[0].mname);
				}else{
					rawData.receiverId = "";
					rawData.receiverType = 1;
					rawData.receiverName = "";
					elem.val();
				}
			}
	    });
	    // 执行一个 tableSelect 实例
		var tableIns2 = tableSelect.render({
	    	elem: '#receiver2',
			checkedKey: 'id',
			searchKey: 'realname',
			table: {
				url: LOCAL_ADDRESS+'operator/getOperatorListByCompanyIdAndTypeAndRealname?type=&companyId=',
				cols: col2,
				limit: 5,
				limits: [5,10,20],
				request: {
					pageName: 'page',//页码的参数名称，默认：page
				} 
			},
			done: function (elem, data) {
				//console.log( data.data[0].cname )
				//console.log( data.data[0].id )
				if(data.data != null && data.data.length > 0){
					rawData.receiverId = data.data[0].id;
					rawData.receiverType = 0;
					rawData.receiverName = data.data[0].realname;
					elem.val(data.data[0].realname);
				}else{
					rawData.receiverId = "";
					rawData.receiverType = 0;
					rawData.receiverName = "";
					elem.val();
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
			"content": ""
		});
		document.getElementById("receiver").value = "";
		document.getElementById("receiver2").value = "";
		form.render();
    }
	
	// 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "message/addMessage"
		var pdata = data.field;
		// console.log(pdata)
		// 获取表单值并赋值到formData中
		rawData.content = pdata.content;
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(rawData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				//console.log(result)
				if(result.code == 0) {
					layer.alert("发送成功！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
						parent.layui.table.reload('demo2');
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