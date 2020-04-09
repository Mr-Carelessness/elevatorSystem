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
		{field: 'elevatorName', title: '电梯名称', templet:'#elevatorName'},
		{field: 'cname', title: '所属公司', templet:'#cname'}, 
		{field: 'address', title: '地址', templet:'#address'},
		{field: 'state', title: '人工指标是否评分', width: 165, templet:'#state'},
		{fixed: 'right', title: '操作', width: 240, align: 'center', toolbar: '#barDemo'}
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
		var table = layui.table,
			tableSelect = layui.tableSelect;
		
		// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#company',
			checkedKey: 'id',
			searchKey: 'name',
			table: {
				url: LOCAL_ADDRESS+'company/getCompanyListByName',
				cols: company_col,
				limit: 5,
				limits: [5,10,20],
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
		//执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-185',
			url: LOCAL_ADDRESS + 'indices/getElevatorListByNameAndCompanyId?name=&companyId=', //数据接口	
			title: '公司指标列表',
			totalRow: true, //开启合计行	
			cols: col,
			page: true, //开启分页	
			limits: [10, 15, 30, 60, 100],
			limit: 15,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
		});
		
		//【查看指标说明】
		$('#btn-info').on('click', function () {
            info();
        });
        //【修改指标权重】
		$('#btn-mod').on('click', function () {
            mod();
        });
        //【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
        });
		//【搜索】
		$('#btn-search').on('click', function () {
            var keyword = $("#keyword").val();
            console.log("搜索");
            search(tableIns, keyword);
        });
		//【监听行工具事件】
		table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'add') {
				add(obj.data);
			} else if(layEvent === 'detail') {
				detail(obj.data);
			} else if(layEvent === 'edit') {
				edit(obj.data);
			}
		});
	});
	
	
	// 【搜索】
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'indices/getElevatorListByNameAndCompanyId?companyId='+companyId+'&name='+keyword;
		tableIns.reload({url: url, page: {curr: 1} });
	}
	
	// 【查看指标说明】
	function info(){
		layer.open({
            type: 2,
            title: '指标与权重说明',
            maxmin: true,
            area: [920 + 'px', 600 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'indices-info.html',
        });
	}
	
	// 【修改指标权重】
	function mod(){
		layer.open({
            type: 2,
            title: '修改指标权重',
            maxmin: true,
            area: [1100 + 'px', 600 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'indices-mod.html',
        });
	}
	
	// 【指标评分】
	function add(data){
		console.log(data);
		var companyId = (data.company==null)?"0":data.company.id;
		var elevatorId = (data.elevator==null)?"0":data.elevator.id;
		layer.open({
            type: 2,
            title: '指标评分',
            maxmin: true,
            area: [1080 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevatorind-add.html?elevatorId='+elevatorId+'&companyId='+companyId,
        });
	}
	
	// 【查看指标评分】
	function detail(data){
		var elevatorId = (data.elevator==null)?"0":data.elevator.id;
		var score = (data.elevator==null)?"0":data.elevator.score;
		if(data.elevator.state <= 1){
			layer.open({
				title: '提示信息：',
				content: '该电梯尚未建成，无法查看所有指标评分'
			});    
		}else{
			layer.open({
	            type: 2,
	            title: '查看指标评分',
	            maxmin: true,
	            area: [920 + 'px', 500 + 'px'],
	            shadeClose: false, //点击遮罩关闭
	            content: 'elevatorind-detail.html?elevatorId='+elevatorId+'&score='+score,
	        });			
		}
	}
	
	// 【修改指标评分】
	function edit(data){
		var companyId = (data.company==null)?"0":data.company.id;
		var elevatorId = (data.elevator==null)?"0":data.elevator.id;
		layer.open({
            type: 2,
            title: '修改指标评分',
            maxmin: true,
            area: [1080 + 'px', 500 + 'px'],
            shadeClose: false, //点击遮罩关闭
            content: 'elevatorind-mod.html?elevatorId='+elevatorId+'&companyId='+companyId,
        });
	}
	
	
}