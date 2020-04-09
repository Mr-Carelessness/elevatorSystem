// pages/elevator-record/elevator-record.js
Page({

  // 页面的初始数据
  data: {
    id: '',
    type: '',
    name: '',
    hint: '',

    construction: {},
    inspection: [],
    maintainence: [],
    testing: [],
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var id = options.id,
        type = options.type,
        name = options.name, hint;
    if(type == 1){
      hint = name + "的施工记录：";
    }else if(type == 2){
      hint = name + "的巡查记录：";
    }else if(type == 3){
      hint = name + "的维护记录";
    }else{
      hint = name + "的检测记录";
    }
    this.setData({id:id, type:type, name:name, hint: hint});
    this.getAndSetRecord();
  },

  // 获取历史记录
  getAndSetRecord: function() {
    var that = this;
    var url, type = this.data.type;
    if(type == 1)        url = getApp().globalData.elevatorBackUrl+'construction/getConstructionByElevatorId?elevatorId='+this.data.id;
    else if(type == 2)   url = getApp().globalData.elevatorBackUrl+'inspection/getInspectionPageListByElevatorId?page=1&limit=60&elevatorId='+this.data.id;
    else if(type == 3)   url = getApp().globalData.elevatorBackUrl+'maintainence/getMaintainenceByElevatorId?page=1&limit=15&elevatorId='+this.data.id;
    else                 url = getApp().globalData.elevatorBackUrl+'testing/getTestingByElevatorId?page=1&limit=15&elevatorId='+this.data.id;

    wx.request({
      url: url,
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        if(data.code == 0 && data.data != null){
          if(type == 1)        that.setData({construction: data.data});
          else if(type == 2)   that.setData({inspection: data.data});
          else if(type == 3)   that.setData({maintainence: data.data});
          else                 that.setData({testing: data.data});
        }
      }
    });

  },

  
  
  



})