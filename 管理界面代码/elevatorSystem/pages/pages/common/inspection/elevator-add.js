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
	
	var rawData = {};
	var formData = {
		"companyId": userInfo.company.id,
		"state": 0,	
		"score": 0,
		"elevatorName": "",
		"address": "",
		"longtitude": "",
		"latitude": ""
	};
	
	gdmap();
	
	layui.use(['form', 'layer', 'upload'], function() {
		var form = layui.form,
			layer = layui.layer,
			upload = layui.upload;
		
		// 电梯位置定位
		
		
		
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
			"elevatorName": "",
			"address": ""
		});
		form.render();
    }
    
    // 提交
    function submit(data, parent){
    	var url = config.elevatorBackUrl + "elevator/addElevator"
		var pdata = data.field;
		// 获取表单值并赋值到formData中
		formData.elevatorName = pdata.elevatorName;
		formData.address = pdata.address;
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
					layer.alert("添加成功！请您尽快安排对电梯的施工操作，以及时投入使用电梯！", {
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
    
    // 地图函数
    function gdmap(){
    	//地图初始位置，可以在页面初始化时传入经纬度，也可以ajax获取，不过由于地图初始化较慢，需要考虑同步
		var lon = $('#longitude').val()
		var lat = $('#latitude').val();
		var map;
		if (lon > 0) {//初始化到已有地点
		    map = new AMap.Map('container', {
		        zoom: 20,
		        resizeEnable: true,
		        center: [lon, lat],
		        viewMode: '3D'
		    });
		} else {//初始化到默认地点
		    map = new AMap.Map('container', {
		        zoom: 12,
		        resizeEnable: true,
		        viewMode: '3D'
		    });
		}
		//此插件用来显示当前位置，可在引入API时一同引入
		map.plugin('AMap.Geolocation', function () {
		    var geolocation = new AMap.Geolocation({
		        enableHighAccuracy: true,
		        timeout: 10000,
		        buttonOffset: new AMap.Pixel(10, 20),
		        zoomToAccuracy: true,
		        buttonPosition: 'RB'
		    });
		    map.center = geolocation;
		    map.addControl(geolocation);//地图控件右下角显示当前位置
		});
		 
		var geocoder, marker;
		if (!marker) {
		    marker = new AMap.Marker();
		    map.add(marker);
		}
		 
		var lnglat;
		//地图点击时，获取点击地经纬度
		map.on('click', function (e) {
		    lnglat = e.lnglat;
		    formData.longtitude = lnglat.R;
		    formData.latitude = lnglat.Q;
		    //console.log(e)
		    regeoCode();
		})
		function regeoCode() {
		    if (!geocoder) {
		        geocoder = new AMap.Geocoder();
		    }
		 
		    if (!marker) {
		        marker = new AMap.Marker();
		        map.add(marker);
		    }
		    marker.setPosition(lnglat);//设置标记的位置
		    geocoder.getAddress(lnglat, function (status, result) {
		        if (status === 'complete' && result.regeocode) {
		            var address = result.regeocode.formattedAddress;
		            document.getElementById("address").value = address;
		            //console.log(result)
		        }
		    });
		    marker.setMap(map);//在地图上显示一个标记
		}
		// marker.setPosition([lon, lat]);

    }
}