$(function() {
	var map = new AMap.Map('container');
	map.setZoom(15);
	map.plugin(['AMap.Scale'], function() {
		var scale = new AMap.Scale({});
		map.addControl(scale);
	});

	map.plugin('AMap.Geolocation', function() {
		var geolocation = new AMap.Geolocation({
			enableHighAccuracy: true, // 是否使用高精度定位，默认：true
			convert: true,
			showMarker: true,
			panToLocation: true,
			timeout: 10000
		});

		geolocation.getCurrentPosition();
		map.addControl(geolocation);
		AMap.event.addListener(geolocation, 'complete', onComplete)
		AMap.event.addListener(geolocation, 'error', onError)

		function onComplete(data) {
			// data是具体的定位信息
			window.alert("定位成功！");
		}

		function onError(data) {
			// 定位出错
			window.alert("定位出错！");
		}
	})

});