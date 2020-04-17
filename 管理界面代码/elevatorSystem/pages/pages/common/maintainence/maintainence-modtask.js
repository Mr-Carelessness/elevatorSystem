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
	var formData = {
		"id": getUrlParam("id"),
		"operatorId": "",
		"startDate": "",
		"finishDate": "",
		"questions": ""
	};
	var rawData = {};
	var id = getUrlParam("id");
	//console.log(id);
	
	var operator_col = [[
		{ type: 'radio' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'realname', title: '操作者' }
	]];
	var question_col = [[
		{ type: 'checkbox' },
		{ field: 'id', title: '序号', type:"numbers", width:80 },
		{ field: 'question', title: '问题'}
	]];
	var fq;
	
	
	//JavaScript代码区域
	layui.config({
		base: '../../../src/layui_ext/'
	}).extend({ 
		tableSelect: 'tableSelect', //定义该组件模块名
		transferTable: 'transferTable'
	}).use(['layer', 'table', 'tableSelect', 'laydate', 'transferTable'], function() {
		var layer = layui.layer, 
			table = layui.table,
			tableSelect = layui.tableSelect,
			laydate = layui.laydate,
			transferTable = layui.transferTable;
		
		getFormData(formData.id, form, tableSelect);
			
		laydate.render({
		    elem: '#startDate',
		    type: 'date',
			format: 'yyyy-MM-dd',
			trigger: 'click',
		    done: function(value, date, endDate){
	        	formData.startDate = value;
	      	}
		});
		laydate.render({
		    elem: '#finishDate',
		    type: 'date',
			format: 'yyyy-MM-dd',
			trigger: 'click',
		    done: function(value, date, endDate){
	        	formData.finishDate = value;
	      	}
		});
		// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#operator',
			checkedKey: 'id',
			searchKey: 'realname',
			table: {
				url: LOCAL_ADDRESS+'operator/getOperatorListByCompanyIdAndTypeAndRealname?companyId='+userInfo.company.id+'&type=3',
				cols: operator_col,
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
					formData.operatorId = data.data[0].id;
					elem.val(data.data[0].realname);
				}else{
					formData.operatorId = "";
					elem.val("");
				}
			}
	   	});
	   	// 执行一个 tableSelect 实例
		tableSelect.render({
	    	elem: '#question',
			checkedKey: 'id',
			searchKey: 'keyword',
			table: {
				url: LOCAL_ADDRESS+'question/getQuestionListByKeyword',
				cols: question_col,
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
					var ansStr = "";
					formData.questions = "[";
					for(var i=0;i<data.data.length;i++){
						ansStr = ansStr + "问题[" + (i+1) + "]: " + data.data[i].question + "\n";
						if(i == 0){
							formData.questions = formData.questions + data.data[i].id;
						}else{
							formData.questions = formData.questions + "," + data.data[i].id;
						}
					}
					formData.questions = formData.questions + "]";
					elem.val(ansStr);
				}else{
					formData.operatorId = "";
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
	function getFormData(id, form, tableSelect){
		console.log(id);
		var fd = {
			"arr": ""
		}
		var url = config.elevatorBackUrl + "maintainence/getMaintainenceById?id="+id;
		var qurl = config.elevatorBackUrl + "question/getQuestionListByIdArray";
		$.get(url, function(result, status){
			console.log(result);
	        if(result.code == 0){
	        	// 赋值formData
	        	rawData = result.data;
	        	formData.operatorId = result.data.operator.id;
	        	formData.startDate = result.data.startDate;
	        	formData.finishDate = result.data.finishDate;
	        	formData.questions = result.data.questions;
	        	fd.arr = result.data.questions;
	        	
	        	// 赋值question数据
	        	// 提交数据
				$.ajax({
					url: qurl,
					type: "POST",
					dataType: 'JSON',
					data: JSON.stringify(fd),
					contentType: "application/json; charset=utf-8",
					success: function(res) {
						//console.log(result)
						if(res.code == 0) {
							fq = res.data;
							setQuestions(fq);
						}
					}
				})
	        	
	        	form.val("show_form", {
	        		"operator": result.data.operator.realname,
					"startDate": result.data.startDate,
					"finishDate": result.data.finishDate
				});
				//document.getElementById("operator").innerText = result.data.operator.realname;
				
				form.render();
	        }
	  });   
	}
	// 设置问题数据
	function setQuestions(qustions){
		var ansStr = "";
		for(var i=0;i<qustions.length;i++){
			ansStr = ansStr + "问题[" + (i+1) + "]: " + qustions[i].question + "\n";
		}
		document.getElementById("question").value = ansStr;
	}
	
	// 重置
    function reset(form){
    	formData.operatorId = rawData.operator.id;
	    formData.startDate = rawData.startDate;
	    formData.finishDate = rawData.finishDate;
	    formData.questions = rawData.questions;
	    setQuestions(fq);
    	form.val("show_form", {
    		"operator": rawData.operator.realname,
			"startDate": rawData.startDate,
			"finishDate": rawData.finishDate
		});
		form.render();
    }
	// 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "maintainence/modifyOrArrangeMaintainenceTask"
		var pdata = data.field;
		// console.log(pdata)
		// 获取表单值并赋值到formData中
		//console.log(formData);
		
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