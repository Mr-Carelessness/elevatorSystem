// pages/task-slelevator/task-slelevator.js
Page({

  // 页面的初始数据
  data: {
    //userInfo: JSON.parse(wx.getStorageSync("userInfo")),
    tips: {},
    searchBoxDisplay: 'none',

  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    // 获取公司内部电梯数据并加载
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'elevator/getElevatorListByNameAndCompanyId?page=1&limit=10&companyId='+JSON.parse(wx.getStorageSync("userInfo")).company.id+'&name=',
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        if(data.code == 0 && data.data != null){
          that.setData({tips: data.data, searchBoxDisplay: "block"});

        }
      }
    });
    
    that.setData({searchBoxDisplay: "block"});
  },

  bindInput: function(e) {
    var that = this;
    var keywords = e.detail.value;
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'elevator/getElevatorListByNameAndCompanyId?page=1&limit=10&companyId='+JSON.parse(wx.getStorageSync("userInfo")).company.id+'&name='+keywords,
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        if(data.code == 0 && data.data != null){
          that.setData({tips: data.data, searchBoxDisplay: "block"});
        }
      }
    });
    
    that.setData({searchBoxDisplay: "block"});
  },
    
  bindSearch: function(e) {
    //console.log(e)
    var index = e.currentTarget.dataset.index,
        id = e.currentTarget.dataset.id,
        name = e.currentTarget.dataset.name;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    // 赋值电梯数据
    var rawData = prevPage.data.rawData;
    rawData.elevatorId = id;
    rawData.elevatorName = name;
    prevPage.setData({rawData: rawData});

    // 返回到上一个页面
    wx.navigateBack({delta: 1});
  },


})