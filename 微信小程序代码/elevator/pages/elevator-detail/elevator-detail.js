// pages/elevator-detail/elevator-detail.js
Page({

  // 页面的初始数据
  data: {
    id: "",
    elevator: "",
    stateArr: ["施工中", "待投入运行", "运行中", "维护中"],
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    //console.log("电梯Id："+options.id);
    var that = this;
    this.setData({id: options.id});
    // 根据id获取elevator详细信息
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'elevator/getElevatorById?id='+options.id,
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        if(data.code == 0 && data.data != null){
          var tmp = data.data;
          tmp.score = Math.round(tmp.score*20);
          that.setData({elevator: tmp});
        }
      }
    });
  },

  // 电梯得分详情
  detail: function() {
    wx.navigateTo({url: '../elevator-score/elevator-score?id='+this.data.id+'&score='+this.data.elevator.score+'&name='+this.data.elevator.elevatorName });
  },

  // 电梯评价
  userexpr: function() {
    wx.navigateTo({url: '../elevator-userexpr/elevator-userexpr?id='+this.data.id});
  },


  construction: function() {
    this.seeRecord(1);
  },
  inspection: function() {
    this.seeRecord(2);
  },
  maintainence: function() {
    this.seeRecord(3);
  },
  testing: function() {
    this.seeRecord(4);
  },
  
  // 查看电梯记录
  seeRecord: function(type) {
    console.log("类别："+type);
    wx.navigateTo({url: '../elevator-record/elevator-record?id='+this.data.id+'&type='+type+'&name='+this.data.elevator.elevatorName});
  }

})