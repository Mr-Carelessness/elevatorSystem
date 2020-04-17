var amapFile = require('../../dist/amap/amap-wx.js');//如：..­/..­/libs/amap-wx.js

var markersData = [];
Page({
  data: {
    tips: {},
    AddressName: '',
    AddressLocation: '',
    searchBoxDisplay: 'none',

    myAmapFun: {},
    markers: [],
    scale: 15,
    latitude: '',
    latitude_raw: '',
    longitude: '',
    longitude_raw: '',
    textData: {},
    controls: [{
      id: 2,
      iconPath: '../../img/minus.png',
      position: {left:10,top:55,width:40,height:40},
      clickable: true
    },{
      id: 1,
      iconPath: '../../img/plus.png',
      position: {left:10,top:10,width:40,height:40},
      clickable: true
    }],

    chooseSize: false,
    noticeBarDisplay: true,
    cvtop: '84%'
  },

  // 加载事件
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'2039f4db81a320d29c5f57070f8184f9'});
    console.log(myAmapFun);

    // 获取定位并进行存储
    var loc = function (ms) {
      myAmapFun.getWxLocation();
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms);
      })
    };
    loc(500).then( ()=> {
        console.log(wx.getStorageSync("【用户定位】："))
        console.log(wx.getStorageSync("userLocation"));
        var location = wx.getStorageSync("userLocation").split(",");
        var marker = {latitude:location[1], longitude: location[0], iconPath: '../../img/center.png', width:32, height: 32, name: "*中心位置*", address: ""};
        var circles = [{latitude: location[1],longitude: location[0],color: '#2b85e488',fillColor: '#5cadff22', radius: 1000, strokeWidth: 0}];
        that.setData({latitude:location[1], latitude_raw:location[1] });
        that.setData({longitude: location[0], longitude_raw:location[0] });
        that.getAndSetNearbyElevatorInfo(marker, circles, that);
    
        // 获取周边地点信息
        /*myAmapFun.getPoiAround({
          iconPathSelected: '../../img/punctuation-choosed.png', //如：..­/..­/img/marker_checked.png
          iconPath: '../../img/punctuation-blue.png', //如：..­/..­/img/marker.png
          success: function(data){
            markersData = data.markers;
            for(var j = 0; j < markersData.length; j++){
                markersData[j].width = 32;
                markersData[j].height = 32;
            }
            markersData.push({latitude:markersData[0].latitude, longitude: markersData[0].longitude, iconPath: '../../img/center.png', width:32, height: 32, name: "*中心位置*", address: ""});
            that.setData({markers: markersData});
            that.setData({latitude: markersData[0].latitude, latitude_raw:markersData[0].latitude });
            that.setData({longitude: markersData[0].longitude, longitude_raw:markersData[0].longitude });
            that.showMarkerInfo(markersData,0);
          },
          fail: function(info){
            wx.showModal({title:info.errMsg})
          }
        })*/
      
    
        that.setData({myAmapFun: myAmapFun});
      }
    );
    
   

  },

  // marker单击标注触发的事件
  makertap: function(e) {
    var id = e.markerId;
    var that = this;
    //console.log("编号："+id);
    //console.log(this.data.markers);
    
    that.showMarkerInfo(this.data.markers,id);
    that.changeMarkerColor(this.data.markers,id);
    this.showshadow();
  },

  // 点击标点后，所做出来的反应
  showMarkerInfo: function(data,i){
    var that = this;
    that.setData({
      textData: {
        elevatorId: data[i].elevatorId,
        name: data[i].name,
        desc: data[i].address,
        state: data[i].state,
        score: data[i].score
      }
    });
  },

  // 点击标点后，改变标点颜色
  changeMarkerColor: function(data,i){
    var that = this;
    var markers = [];
    //console.log(i+"被点击")
    for(var j = 0; j < data.length; j++){
      if(j==i){
        data[j].iconPath = "../../img/punctuation-choosed.png"; //如：..­/..­/img/marker_checked.png
        data[j].width = 32;
        data[j].height = 32;
      }else{
        if(data[j].name != "*中心位置*"){
          data[j].iconPath = "../../img/punctuation-blue.png"; //如：..­/..­/img/marker.png
        }else{
          data[j].iconPath = "../../img/center.png";
        }
        data[j].width = 32;
        data[j].height = 32;
      }
      markers.push(data[j]);
    }
    
    
    that.setData({
      markers: markers
    });
  },

  // 点击控制图标所触发的事件
  //点击缩放按钮动态请求数据
  controlTap: function(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    // 缩小按钮
    if (e.controlId === 1) {
      //if(this.data.scale < 18)
        that.setData({scale: ++this.data.scale});
    } 
    // 放大按钮
    else if (e.controlId === 2){
      //if(this.data.scale > 0)
        that.setData({scale: --this.data.scale});
    }
  },

  // region发生变换事件
  regionChange: function(e) {
    //console.log(e)
    var that = this;
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      //console.log(e)
      console.log(that.data.myAmapFun)
      this.mapCtx = wx.createMapContext("map");
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: function(res) {
          //console.log(res)
          var marker = {latitude:res.latitude, longitude: res.longitude, iconPath: '../../img/center.png', width:32, height: 32, name: "*中心位置*", address: ""};
          var circles = [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#2b85e488',
            fillColor: '#5cadff22',
            radius: 1000,//定位点半径
            strokeWidth: 0
          }];
          that.getAndSetNearbyElevatorInfo(marker, circles, that);

          /*var mk = that.data.markers;
          var idx = that.findCenterMarkByMarkers(markersData);
          if(idx == -1){
            mk.push({latitude:res.latitude, longitude: res.longitude, iconPath: '../../img/center.png', width:32, height: 32, name: "*中心位置*", address: ""});
          }else{
            mk[idx].latitude = res.latitude;
            mk[idx].longitude = res.longitude;
          }
          
          that.setData({latitude: res.latitude, longitude: res.longitude, markers: mk, circles:circles});
          */
        }
      })
    }
  },

  // 搜索附近电梯并赋值
  getAndSetNearbyElevatorInfo: function(marker, circles, that) {
    var mk = [];
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'elevator/getElevatorListByGeoPosition?page=1&limit=15&longtitude='+marker.longitude+'&latitude='+marker.latitude,
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        //console.log(res)
        var data = JSON.parse(res.data);
        console.log(data);
        if(data.code == 0 && data.data != null){
          for(var i=0; i<data.data.length; i++){
            var obj = {latitude: data.data[i].latitude, longitude: data.data[i].longtitude, iconPath: '../../img/punctuation-blue.png', width: 32, height: 32, id: i, elevatorId: data.data[i].id, name: data.data[i].elevatorName, address: data.data[i].address, score:Math.round(data.data[i].score*20), state:data.data[i].state};
            console.log(obj);
            mk.push(obj);
          }
        }
        mk.push(marker);
        that.setData({latitude: marker.latitude, longitude: marker.longitude, markers: mk, circles:circles});
      },
      fail: function (res) {
        mk.push(marker);
        that.setData({latitude: marker.latitude, longitude: marker.longitude, markers: mk, circles:circles});
      }
    })

  },


  // 恢复原位事件
  backToRawPosition: function(e){
    var marker = {latitude:this.data.latitude_raw, longitude: this.data.longitude_raw, iconPath: '../../img/center.png', width:32, height: 32, name: "*中心位置*", address: ""};
    var circles = [{ latitude: this.data.latitude_raw, longitude: this.data.longitude_raw, color: '#2b85e488', fillColor: '#5cadff22', radius: 1000, strokeWidth: 0}];
    this.getAndSetNearbyElevatorInfo(marker, circles, this);

    /*var mk = this.data.markers;
    var idx = this.findCenterMarkByMarkers(mk);
    mk[idx].longitude = this.data.longitude_raw;
    mk[idx].latitude = this.data.latitude_raw;
    var circles = [{
      latitude: this.data.latitude_raw,
      longitude: this.data.longitude_raw,
      color: '#2b85e488',
      fillColor: '#5cadff22',
      radius: 1000,//定位点半径
      strokeWidth: 0
    }];
    this.setData({latitude: this.data.latitude_raw, longitude: this.data.longitude_raw, markers: mk, circles:circles});*/
  },

  // 找地图标记点
  findCenterMarkByMarkers: function(markers){
    for(var i=0;i<markers.length;i++){
      if(markers[i].name == "*中心位置*") return i;
    }
    return -1;
  },

  // 显示遮罩层
  showshadow:function(e){
    if (this.data.chooseSize == false) {
      this.chooseSezi()
    } else {
      this.hideModal()
    }
  },

  // 动画函数
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 100,
      // 定义动画效果，当前是匀速
      timingFunction: 'ease-out'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(1000).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        clearcart: false
      })
    }, 100)
  },
  // 隐藏
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(700).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step();
      var mk = that.data.markers;
      for(var i=0; i<mk.length; i++){
        if(mk[i].iconPath == '../../img/punctuation-choosed.png'){
          mk[i].iconPath = '../../img/punctuation-blue.png';
        }
      }
      that.setData({
        animationData: animation.export(),
        chooseSize: false,
        markers: mk
      });
    }, 500)
    

  },

  //=======================================================
  bindInput: function(e) {
    var that = this;
    var keywords = e.detail.value;
    var Addresscity = "临海";
    var myAmapFun = that.data.myAmapFun;

    myAmapFun.getInputtips({
      keywords: keywords,
      //city: Addresscity, //已使用机器当前位置编码 为优先搜索
      location: '',
      success: function(data) {
        //console.log(data)
        if (data && data.tips) {
          that.setData({
            tips: that.getSubArr(data.tips,5)
          });
        }
      }
    });
    that.setData({searchBoxDisplay: "block"});
  },
    
  bindSearch: function(e) {
    //console.log(e)
    var index = e.currentTarget.dataset.index;
    /*var keywords = this.data.tips[index].keywords;
    var location = this.data.tips[index].location;
    console.log(keywords);
    console.log(location);*/
    var that = this;
    // var text = this.data.tips;
    // console.log(text);
    // console.log(this.data.tips[index])
    var location;
    if(index >= 0)
      location = this.data.tips[index].location.split(",");

    //console.log(location)
    try{
      if(location != null){
        //修改marker和circie
        var circles = [{longitude: location[0],latitude: location[1],color: '#2b85e488',fillColor: '#5cadff22',radius: 1000,strokeWidth: 0}];
        var marker = {latitude:location[1], longitude: location[0], iconPath: '../../img/center.png', width:32, height: 32, name: "*中心位置*", address: ""};
        that.getAndSetNearbyElevatorInfo(marker, circles, that);
        /*var mk = this.data.markers;
        var idx = this.findCenterMarkByMarkers(mk);
        mk[idx].longitude = location[0];
        mk[idx].latitude = location[1];
        that.setData({
          longitude: location[0],
          latitude: location[1],
          circles: circles,
          markers: mk
        });*/
      }else{
        wx.showToast({title: '未查到该地经纬度信息，定位失败', icon: 'none'});
      }
    }finally{
      that.setData({searchBoxDisplay: "none"});
    }
    // wx.setStorageSync("addressName", keywords)
  },
  
  getSubArr(arr, len){
    //if(arr.length < len)  return arr;
    //console.log(arr)
    var ans = [];
    for(var i=0; i<Math.min(arr.length, len); i++){
      //console.log(arr[i])
      if(arr[i]["location"] != undefined && arr[i]["location"] != "")
        ans.push(arr[i]);
    }
    return ans;
  },

  // 查看电梯详细信息
  lookElevatorDetail: function(e) {
    //console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({url: '../elevator-detail/elevator-detail?id='+id});
  },

  // 电梯评价
  userexprElevator: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({url: '../elevator-userexpr/elevator-userexpr?id='+id});
  },

  // 关闭通告栏
  closeNoticeBar: function () {
    this.setData({noticeBarDisplay: false, cvtop: '90%'});
  }

})
