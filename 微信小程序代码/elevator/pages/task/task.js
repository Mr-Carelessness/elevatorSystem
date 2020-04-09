// pages/task/task.js

Page({
  data: {
    userInfo: {},
  },

  // 加载函数
  onLoad: function(options) {
    this.setData({userInfo: JSON.parse(wx.getStorageSync("userInfo"))});
  },

  // 完成任务
  finishTask: function(e){
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../task-detail/task-detail?type='+type,
    })
  }
})
