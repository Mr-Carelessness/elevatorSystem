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
	var status1 = 0, status2 = 0, status3 = 0, status4 = 0;
	var res1 = {}, res2 = {}, res3 = {}, res4 = {};
	var formData = {ind1:0,ind2:0,ind3:0,ind4:0,ind5:0,ind6:0,ind7:0,ind8:0,ind9:0,ind10:0,ind11:0,ind12:0};
	
	//JavaScript代码区域
	layui.use(['table', 'layer', 'form'], function() {
		var table = layui.table,
			form = layui.form;
		
		// 确定重要性按钮点击事件
		document.getElementById("btn-matrix1").onclick = function(){
			document.getElementById("block1").style.display = "block";
			document.getElementById("block2").style.display = "none";
			document.getElementById("block3").style.display = "none";
			document.getElementById("block4").style.display = "none";
			return false;
		};
		document.getElementById("btn-matrix2").onclick = function(){
			document.getElementById("block1").style.display = "none";
			document.getElementById("block2").style.display = "block";
			document.getElementById("block3").style.display = "none";
			document.getElementById("block4").style.display = "none";
			return false;
		};
		document.getElementById("btn-matrix3").onclick = function(){
			document.getElementById("block1").style.display = "none";
			document.getElementById("block2").style.display = "none";
			document.getElementById("block3").style.display = "block";
			document.getElementById("block4").style.display = "none";
			return false;
		};
		document.getElementById("btn-matrix4").onclick = function(){
			document.getElementById("block1").style.display = "none";
			document.getElementById("block2").style.display = "none";
			document.getElementById("block3").style.display = "none";
			document.getElementById("block4").style.display = "block";
			return false;
		};
		
		// 一致性检验按钮点击事件
		document.getElementById("btn-check1").onclick = function(){
			yzxjj(1, form);
			return false;
		};
		document.getElementById("btn-check2").onclick = function(){
			yzxjj(2, form);
			return false;
		};
		document.getElementById("btn-check3").onclick = function(){
			yzxjj(3, form);
			return false;
		};
		document.getElementById("btn-check4").onclick = function(){
			yzxjj(4, form);
			return false;
		};
		
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
	
	// 展示结果
	function showResult(form){
		if(status1 == 1 && status2 == 1 && status3 == 1 && status4 == 1){
			//console.log(res1);console.log(res2);console.log(res3);console.log(res4);
			try{
				formData.ind1 = res1.weight[0] * res2.weight[0];
				formData.ind2 = res1.weight[0] * res2.weight[1];
				formData.ind3 = res1.weight[0] * res2.weight[2];
				formData.ind4 = res1.weight[1] * res3.weight[0];
				formData.ind5 = res1.weight[1] * res3.weight[1];
				formData.ind6 = res1.weight[1] * res3.weight[2];
				formData.ind7 = res1.weight[1] * res3.weight[3];
				formData.ind8 = res1.weight[1] * res3.weight[4];
				formData.ind9 = res1.weight[2] * res4.weight[0];
				formData.ind10 = res1.weight[2] * res4.weight[1];
				formData.ind11 = res1.weight[2] * res4.weight[2];
				formData.ind12 = res1.weight[2] * res4.weight[3];
			}finally{
				form.val("show_form", {
					"ind1": formData.ind1.toFixed(4),
					"ind2": formData.ind2.toFixed(4),
					"ind3": formData.ind3.toFixed(4),
					"ind4": formData.ind4.toFixed(4),
					"ind5": formData.ind5.toFixed(4),
					"ind6": formData.ind6.toFixed(4),
					"ind7": formData.ind7.toFixed(4),
					"ind8": formData.ind8.toFixed(4),
					"ind9": formData.ind9.toFixed(4),
					"ind10": formData.ind10.toFixed(4),
					"ind11": formData.ind11.toFixed(4),
					"ind12": formData.ind12.toFixed(4),
				});
				//console.log(formData);
				form.render();
			}
			document.getElementById("weight-res").style.display = "block";
			document.getElementById("hint-res").innerText = "根据层次分析法指标权重已成功生成，具体为";
			
		}
	}
	
	// 获取矩阵数据
	function getMatrix(type, size){
		var arr = "[";
		var qz, id;
		if(type == 1){qz="b1_";}
		else if(type == 2){qz="c1_";}
		else if(type == 3){qz="c2_";}
		else if(type == 4){qz="c3_";}
		for(var i=0;i<size;i++){
			for(var j=0;j<size;j++){
				id = qz+i+""+j;
				//console.log(id);
				if(i==0 && j==0)
					arr = arr + document.getElementById(id).value;
				else
					arr = arr + "," + document.getElementById(id).value;
				//console.log(arr);
			}
		}
		
		arr = arr + "]";
		//console.log(arr);
		return arr;
	}
	
	// 获取矩阵数据并进行一致性检验
	function yzxjj(type, form){
		var arr = "";
		var size = 0;
		if(type == 1){
			size = 3; arr = getMatrix(type, 3);
		}else if(type == 2){
			size = 3; arr = getMatrix(type, 3);
		}else if(type == 3){
			size = 5; arr = getMatrix(type, 5);
		}else if(type == 4){
			size = 4; arr = getMatrix(type, 4);
		}
		
		var url = config.elevatorBackUrl + "other/AHPcalc";
		var formData = {
			"arr": arr,
			"size": size
		};
		// 提交数据
		$.ajax({
			url: url,
			type: "POST",
			dataType: 'JSON',
			data: JSON.stringify(formData),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				if(result.data != null){
					//console.log(result.data);
					document.getElementById("qxl"+type).innerText = "权向量："+result.data.weight;
					document.getElementById("yzxbl"+type).innerText = "一致性比例(CR)："+result.data.cr;
					document.getElementById("jyjg"+type).innerText = result.data.testInfo;
					document.getElementById("jyjg"+type).style.color = "#009688";
					
					// 检验成功
					if(result.data.testResult == true){
						document.getElementById("jyjg"+type).style.color = "#FF5722";
						document.getElementById("hint"+type).innerText = "通过一致性检验";
						if(type == 1){status1 = 1;res1 = result.data;}
						else if(type == 2){status2 = 1;res2 = result.data;}
						else if(type == 3){status3 = 1;res3 = result.data;}
						else if(type == 4){status4 = 1;res4 = result.data;}
						showResult(form);
					}
				}
			}
		})
		
	}
	
	// 提交权重事件
	function submit(data, result){
		var pdata = data.field;
		//console.log(pdata)
		// 获取表单值并赋值到formData中
		var url = config.elevatorBackUrl + "indices/updateWeightOfIndices";
		
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
		});
	}
	
}

// 正则表达式匹配
function matchNumber(txt) {
	var reg2 = /(^[1-9]\d*$)/;
    var reg = /^[\-\+]?(((([1-9]\d*)|0)\.\d*)|((([1-9]\d*)|0)?\.\d+)|([1-9]\d*\/[1-9]\d*))$/;
    //console.log(txt.value);
    if(txt!="" && !reg2.test(txt.value) && !reg.test(txt.value)){
        alert("只能输入整数或分数");
        txt.value = "";
    }
    return false;
}