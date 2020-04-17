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
		{field: 'cname', title: '名称'},
		{field: 'address', title: '地址'},
		{field: 'authority', title: '权限/类别', width: 165, templet:'#authority'},
		{fixed: 'right', title: '操作', width: 400, align: 'center', toolbar: '#barDemo'}
	]];
	
	
	//JavaScript代码区域
	layui.use(['table', 'layer'], function() {
		var table = layui.table;
		//执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: 'full-125',
			url: LOCAL_ADDRESS + 'company/getCompanyListByName?name=', //数据接口	
			title: '公司列表',
			totalRow: true, //开启合计行	
			cols: col,
			page: true, //开启分页	
			limits: [10, 15, 30, 60, 100],
			limit: 15,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
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
            console.log("搜索");
            search(tableIns, keyword);
        });
		//【监听行工具事件】
		table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detailA') {
				detailA(obj.data);
			} else if(layEvent === 'detailR') {
				detailR(obj.data);
			} else if(layEvent === 'detailE') {
				detailE(obj.data);
			} else if(layEvent === 'del') {
				remove(tableIns, obj.data);
			} else if(layEvent === 'edit') {
				edit(obj.data);
			}
		});
	});
	
	
	// 添加
	function add(){
		var index = layer.open({
			title: '添加单位',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'company-add.html',
			area: [750 + 'px', 500 + 'px']
		}); 	
	}
	
	// 搜索
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'company/getCompanyListByName?name='+keyword;
		tableIns.reload({url: url, page: {curr: 1} });
	}
	
	// 编辑
	function edit(data){
		layer.open({
			title: '修改单位',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'company-mod.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 查看公司人员情况
	function detailR(data){
		layer.open({
			title: data.cname+'——公司人员',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'company-detailPerson.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 查看公司安全信息
	function detailA(data){
		layer.open({
			title: data.cname+'——公司安全信息概况',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'company-detailSafety.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 查看公司电梯信息
	function detailE(data){
		layer.open({
			title: data.cname+'——公司旗下电梯',
			type: 2,
			closeBtn: 1, 
			shade: 0.2,
			anim: 0,
			content: 'company-detailElevator.html?id=' + data.id,
			area: [750 + 'px', 500 + 'px']
		});
	}
	
	// 删除
	function remove(tableIns, data){
		var url = config.elevatorBackUrl + 'company/removeCompany?id='+data.id;
		//console.log(url);
		layer.confirm('真的要删除吗？', function(index) {
			$.get(url, function(result) {
				//console.log(result)
				if(result.code == 0) {
					layer.alert("删除成功！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
						tableIns.reload();
					})
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			});
			layer.close(index);
		});
	}
	
	
	
}