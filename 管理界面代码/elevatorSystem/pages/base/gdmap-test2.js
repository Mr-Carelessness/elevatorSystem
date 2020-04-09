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
    console.log(e)
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
            console.log(result)
            //$('#address').val(address);//点击地名称
            //$('#longitude').val(lnglat.lng);//经纬度
            //$('#latitude').val(lnglat.lat);
        }
    });
    marker.setMap(map);//在地图上显示一个标记
}
// marker.setPosition([lon, lat]);
