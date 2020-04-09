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
	var id = getUrlParam("id");
	var formData = {};
	
	//[1] 文本编辑器：https://www.layui.com/doc/modules/layedit.html
	layui.use(['form', 'layer', 'layedit'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit;

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
	
	// 复选框赋值
	function putCheckboxValues(Name, Val){
		var unitTypeCheckbox = $("input[class="+ Name +"]");
        for (var i = 0; i < Val.length; i++) {
            if (Val[i] == '1') {
                unitTypeCheckbox[i].value = '1';
                unitTypeCheckbox[i].checked = true;
            }else{
            	unitTypeCheckbox[i].value = '0';
                unitTypeCheckbox[i].checked = false; 
            }
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
            
    // 重置
    function reset(form){
    	form.val("show_form", {
			"cname": "",
			"address": ""
		});
		putCheckboxValues("auth", "0000"); 
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "company/addCompany"
		var pdata = data.field;
		// console.log(pdata)
		// 获取表单值并赋值到formData中
		formData.cname = pdata.cname;
		formData.address = pdata.address;
		formData.authority = getCheckboxValues("auth");
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