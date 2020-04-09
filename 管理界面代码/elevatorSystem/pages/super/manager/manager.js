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
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'mname', title: '姓名/名称'},
		{field: 'type', title: '类别', templet:'#type'},
		{field: 'cname', title: '所属公司', templet:'#cname'},
		{fixed: 'right', title: '操作', width: 300, align: 'center', toolbar: '#barDemo'}
	]];
	var company_col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'cname', title: '公司名称', width:200 },
		{ field: 'address', title: '地址', width:250 },
	]];
	var companyId = "";
	
	
	//JavaScript代码区域
	layui.config({
		base: '../../../src/layui_ext/'
	}).extend({ 
		tableSelect: 'tableSelect' //定义该组件模块名
	}).use(['layer', 'table', 'tableSelect'], function() {
		var layer = layui.layer, 
			table = layui.table,
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
					companyId = data.data[0].id;
					elem.val(data.data[0].cname);
				}else{
					companyId = "";
					elem.val("");
				}
			}
	    })
		// 执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-125',
			url: LOCAL_ADDRESS+'manager/getManagerListByCompanyIdAndName?companyId=&mname=', 
			title: '管理员表',
			totalRow: true, 
			cols: col,
			page: true, 
			limits: [10,15,20,30,60],
			limit: 15,
			request: {pageName: 'page',} 
		});
		
		
		
		
		//【添加】
		$('#btn-add').on('click', function () {
            add();
        });
        //【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
        });
		//【搜索】
		$('#btn-search').on('click', function () {
            var keyword = $("#keyword").val();
            search(tableIns, keyword);
        });
		
		
		//监听行工具事件
		table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detailM') {
				detailM(obj.data);
			} else if(layEvent === 'del') {
				remove(tableIns, obj.data);
			} else if(layEvent === 'edit') {
				edit(obj.data);
			} else if(layEvent === 'updatePwd'){
				updatePwd(obj.data);
			}
		});
		
	});
	
	// 【添加】
	function add(data){
		layer.open({
            type: 2,
            title: '添加管理员',
            maxmin: true,
            area: [780 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'manager-add.html?id=' + userInfo.id,
        });
	}
	// 【搜索】
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'manager/getManagerListByCompanyIdAndName?companyId='+companyId+'&mname='+keyword;
		tableIns.reload({url: url, page: {curr: 1} });
	}
	// 【编辑】
	function edit(data){
		layer.open({
			title: '编辑管理员信息',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'manager-mod.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	// 【删除】
	function remove(tableIns, data){
		var url = config.elevatorBackUrl + 'manager/removeManager?id='+data.id;
		layer.confirm('真的删除所选内容么？', function(index) {
			$.get(url,{},function(result){
				//console.log(result)
				if(result.code == 0){
					layer.alert("删除成功！", {title: '提示信息：'}, function(index){
						layer.close(index);
						tableIns.reload();
					})
				}else{
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})	
				}
			});
										
		});
	}
	
	// 【消息记录】
	function detailM(data){
		layer.open({
			title: '消息记录',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'manager-message.html?id=' + data.id+'&type='+data.type,
			area: [860 + 'px', 500 + 'px']
		});
	}
	// 【重置密码】
	function updatePwd(data){
		var url = config.elevatorBackUrl + 'manager/modifyManager';
		var rawPassword = "123456";//默认初始密码
		var formData = {"id":data.id, "password":rawPassword};
		layer.open({
			title: '提示信息：', 
			content: '确认重置【'+data.mname+'】的密码为初始密码('+rawPassword+')？', 
			yes: function(layero, index) {
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
								title: '提示信息：',
								content: '重置密码成功，请及时通知相应管理员'
							});
						} else {
							layer.alert(result.errMsg, {
								title: '提示信息：'
							})
						}
					}
				})
			}
		});
	}
}