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
	
	var formData = {"id":"","cname":"","address":""};
	var formData2 = {"id":"","safetyManagementInfo":"","securityTechnologyInfo":"","emegyTechnologyInfo":"","safetyOrganizationInfo":""};
	var avatarUrl = "";
	var sealUrl = "";
	
	// 表格对应列
	var col = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'mname', title: '姓名/名称'},
	]];
	// 表格对应列
	var col2 = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'realname', title: '姓名/名称'},
		{field: 'type', title: '类别', width: 165, templet:'#type'},
		{field: 'telephone', title: '联系电话'}
	]];
	// 表格对应列
	var col3 = [[
		//{type: 'checkbox', fixed: 'left'},
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{field: 'realname', title: '姓名/名称'},
		{field: 'type', title: '类别', width: 165, templet:'#type'},
		{field: 'telephone', title: '联系电话'}
	]];
	
	//JavaScript代码区域
	layui.use(['table', 'element', 'layer', 'upload'], function() {
		var element = layui.element,
			layer = layui.layer,
			table = layui.table,
			upload = layui.upload;
		
		getTableDataCount();
		getFormData(userInfo.company.id);
		
		//执行一个 table 实例
		var tableIns = table.render({
			elem: '#demo',
			height: '500',
			url: LOCAL_ADDRESS + 'manager/getManagerListByCompanyIdAndName?companyId='+userInfo.company.id+'&mname=', //数据接口	
			title: '公司管理员列表',
			totalRow: true, //开启合计行	
			cols: col,
			page: true, //开启分页	
			limits: [5,10,15,20],
			limit: 10,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
		});
		console.log(tableIns)
		//执行一个 table 实例 
		var tableIns2 = table.render({
			elem: '#demo2',
			height: '500',
			url: LOCAL_ADDRESS + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+userInfo.company.id+'&type=>0&realname=', //数据接口	
			title: '公司操作者列表',
			totalRow: true, //开启合计行	
			cols: col2,
			page: true, //开启分页	
			limits: [5,10,15,20],
			limit: 10,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
			}
		});
		//执行一个 table 实例 
		var tableIns3 = table.render({
			elem: '#demo3',
			height: '500',
			url: LOCAL_ADDRESS + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+userInfo.company.id+'&type=0&realname=', //数据接口	
			title: '公司操作者列表',
			totalRow: true, //开启合计行	
			cols: col2,
			page: true, //开启分页	
			limits: [5,10,15,20],
			limit: 10,
			request: {
				pageName: 'page', //页码的参数名称，默认：page
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
		
		//监听提交
		form.on('submit(sub2)', function(data) {
			submit2(data, parent);
			return false;
		});
		
		//监听重置
		form.on('submit(reset2)', function(data) {
			reset2(form);
			return false;
		});
		
		//【重载】
		$('#btn-refresh').on('click', function () {
            tableIns.reload({page: {curr: 1} });
        });
        $('#btn-refresh2').on('click', function () {
            tableIns2.reload({page: {curr: 1} });
        });
         $('#btn-refresh3').on('click', function () {
            tableIns3.reload({page: {curr: 1} });
        });
		//【搜索】
		$('#btn-search').on('click', function () {
            var keyword = $("#keyword").val();
            search(tableIns, keyword);
        });
		//【搜索】
		$('#btn-search2').on('click', function () {
            var keyword = $("#keyword2").val();
            search2(tableIns2, keyword);
        });
        //【搜索】
        $('#btn-search3').on('click', function () {
            var keyword = $("#keyword3").val();
            search3(tableIns3, keyword);
        });
		
		// 上传公司图标
		upload.render({
			elem: '#btn-avatar',
			url: config.elevatorBackUrl + 'other/upload/img',
			multiple: false,
			data: {},
			before: function(obj) {
				//预读本地文件示例，不支持ie8
				//obj.preview(function(index, file, result) {
				//	$('#demo2').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
				//});
				obj.preview(function(index, file, result) {
					$('#img-avatar').attr('src', result);
					//document.getElementById('#img-avatar').src = result;
					//.innerHtml = '<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img" style="height: 120px;width: 120px;">';
				});
			},
			done: function(res) {
				//上传完毕
				if(res.code > 0) {
					return layer.msg('图片上传失败');
				} else {
					avatarUrl = res.data;
					return layer.msg('图片上传成功');
				}
			}
		});
		
		// 上传公司公章
		upload.render({
			elem: '#btn-seal',
			url: config.elevatorBackUrl + 'other/upload/img',
			multiple: false,
			data: {},
			before: function(obj) {
				obj.preview(function(index, file, result) {
					$('#img-seal').attr('src', result);
				});
			},
			done: function(res) {
				if(res.code > 0) {
					return layer.msg('图片上传失败');
				} else {
					sealUrl = res.data;
					return layer.msg('图片上传成功');
				}
			}
		});
		
	});
	
	// 根据id赋值原数据
	function getFormData(id){
		console.log(id);
		var url = config.elevatorBackUrl + "company/getCompanyById?id="+id;
		$.get(url, function(result, status){
			console.log(result);
	        if(result.code == 0){
	        	formData.id = result.data.id;  
	        	formData.cname = result.data.cname;
	        	formData.address = result.data.address;
	        	formData.avatarUrl = result.data.avatarUrl;
	        	formData.sealUrl = result.data.sealUrl;
	        	formData2.id = result.data.id;
	        	formData2.safetyManagementInfo = result.data.safetyManagementInfo;
	        	formData2.securityTechnologyInfo = result.data.securityTechnologyInfo;
	        	formData2.emegyTechnologyInfo = result.data.emegyTechnologyInfo;
	        	formData2.safetyOrganizationInfo = result.data.safetyOrganizationInfo;
	        	
	        	form.val("show_form2", {
					"safetyManagementInfo": result.data.safetyManagementInfo,
					"securityTechnologyInfo": result.data.securityTechnologyInfo, 
					"emegyTechnologyInfo": result.data.emegyTechnologyInfo,
					"safetyOrganizationInfo": result.data.safetyOrganizationInfo,
				});
				
				form.val("show_form", {
					"cname": result.data.cname,
					"address": result.data.address
				});
				putCheckboxValues("auth", result.data.authority); 
				if(result.data.avatarUrl != null && result.data.avatarUrl != ""){
					$('#img-avatar').attr('src', result.data.avatarUrl);
				}
				if(result.data.sealUrl != null && result.data.sealUrl != ""){
					$('#img-seal').attr('src', result.data.sealUrl);
				}
				form.render(); 
	        }
	    });   
	}
	
	// 获取表格总数量
	function getTableDataCount(){
		var url = config.elevatorBackUrl + 'manager/getManagerListByCompanyIdAndName?page=1&limit=10&companyId='+userInfo.company.id+'&mname=';
		var url2 = config.elevatorBackUrl + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?page=1&limit=10&companyId='+userInfo.company.id+'&type=>0&realname=';
		var url3 = config.elevatorBackUrl + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?page=1&limit=10&companyId='+userInfo.company.id+'&type=0&realname=';
		
		$.get(url, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	cnt1 = result.count;
	        	document.getElementById("managerNumber").textContent = cnt1;
	        }
	    });   
	    $.get(url2, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	cnt2 = result.count; 
	        	document.getElementById("operatorNumber").textContent = cnt2;
	        }
	    });   
		$.get(url3, function(result, status){
			//console.log(result);
	        if(result.code == 0){
	        	cnt3 = result.count; 
	        	document.getElementById("userNumber").textContent = cnt3;
	        }
	    });   
	}
	
	
	// 重置
    function reset(form){
    	form.val("show_form", {
			"cname": formData.cname,
			"address": formData.address
		});
		putCheckboxValues("auth", formData.authority);
		$('#img-avatar').attr('src', formData.avatarUrl);
		$('#img-seal').attr('src', formData.sealUrl);
		form.render();
    }
    
    // 提交
    function submit(data, parent){
		var url = config.elevatorBackUrl + "company/modifyCompany"
		var pdata = data.field;
		// console.log(pdata)
		// 获取表单值并赋值到formData中
		formData.cname = pdata.cname;
		formData.address = pdata.address;
		//console.log("图标地址："+avatarUrl)
		if(avatarUrl != "" && avatarUrl != null){
			formData.avatarUrl = avatarUrl;
		}
		if(sealUrl != "" && sealUrl != null){
			formData.sealUrl = sealUrl;
		}
		//formData.authority = getCheckboxValues("auth");
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
					userInfo.company.cname = pdata.cname;
					localStorage.setItem("adminInfo", JSON.stringify(userInfo));
					layer.alert("修改成功！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
					})
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			}
		})
	}
	
	// 重置
    function reset2(form){
    	form.val("show_form2", {
			"safetyManagementInfo": formData2.safetyManagementInfo,
			"securityTechnologyInfo": formData2.securityTechnologyInfo,
			"emegyTechnologyInfo": formData2.emegyTechnologyInfo,
			"safetyOrganizationInfo": formData2.safetyOrganizationInfo
		});
		form.render();
    }
	
	// 提交
    function submit2(data, parent){
    	var url = config.elevatorBackUrl + "company/modifyCompany"
		// 获取表单值并赋值到formData中
		formData2.safetyManagementInfo = data.field.safetyManagementInfo;
		formData2.securityTechnologyInfo = data.field.securityTechnologyInfo;
		formData2.emegyTechnologyInfo = data.field.emegyTechnologyInfo;
		formData2.safetyOrganizationInfo = data.field.safetyOrganizationInfo;
		
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData2),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				//console.log(result)
				//userInfo.mname = data.field.mname;
				//localStorage.setItem("adminInfo", JSON.stringify(userInfo));
				
				if(result.code == 0) {
					layer.alert("修改成功！", {
						title: '提示信息：'
					}, function(index) {
						layer.close(index);
					})
				} else {
					layer.alert(result.errMsg, {
						title: '提示信息：'
					})
				}
			}
		})

    }
    
    // 复选框赋值
	function putCheckboxValues(Name, Val){
		var unitTypeCheckbox = document.getElementsByClassName("auth");
		//console.log(unitTypeCheckbox)
        for (var i = 0; i < Val.length; i++) {
            if (Val[i] == '1') {
                //unitTypeCheckbox[i].value = '1';
                //unitTypeCheckbox[i].checked = true;
                unitTypeCheckbox[i].style.display = "inline-block";
            }else{
            	//unitTypeCheckbox[i].value = '0';
                //unitTypeCheckbox[i].checked = null;
                unitTypeCheckbox[i].style.display = "none";
            }
            //unitTypeCheckbox[i].disabled = true;
        }
	}
	
	// 复选框取值
	function getCheckboxValues(Name) {
        var result = "";
        $("[class='" + Name + "']:checkbox").each(function () {
            if ($(this).is(":checked")) {
                result = result + "1";
            }else {
            	result = result + "0";
            }
        });
        return result;
    }
	
	// 寻找并赋值管理员表
	function search(tableIns, keyword){
		var url = config.elevatorBackUrl + 'manager/getManagerListByCompanyIdAndName?companyId='+userInfo.company.id+'&mname='+keyword;
		tableIns.reload({url: url, page: {curr: 1} });
	}
	
	// 寻找并赋值操作者表
	function search2(tableIns2, keyword){
		var url = config.elevatorBackUrl + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+userInfo.company.id+'&type=>0&realname='+keyword;
		tableIns2.reload({url: url, page: {curr: 1} });
	}
	
	// 寻找并赋值操作者表
	function search3(tableIns3, keyword){
		var url = config.elevatorBackUrl + 'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+userInfo.company.id+'&type=0&realname='+keyword;
		tableIns3.reload({url: url, page: {curr: 1} });
	}
}