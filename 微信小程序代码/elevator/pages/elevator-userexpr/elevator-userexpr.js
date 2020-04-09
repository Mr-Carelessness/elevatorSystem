// pages/elevator-record/elevator-record.js
Page({

  // 页面的初始数据
  data: {
    elevatorId: '',
    current: 'tab1',
    historyRecord: [],
    myRecord: {}
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var id = options.id;
    var myRecord = {
      elevatorId: id,
      operatorId: JSON.parse(wx.getStorageSync("userInfo")).id,
      record: '',
      score: 5,
    }
    this.setData({elevatorId: id, myRecord: myRecord});
    this.getAndSetHistoryRecord();
  },

  // 切换标签页
  handleChange ({ detail }) {
    this.setData({
      current: detail.key
    });
    if(detail.key == "tab1"){
      this.getAndSetHistoryRecord();
    }
  },

  // 获取历史数据
  getAndSetHistoryRecord: function(){
    var that = this;
    var id = this.data.elevatorId;
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'userexpr/getUserexprListByElevatorId?page=1&limit=30&elevatorId='+id,
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        if(data.code == 0 && data.data != null){
          that.setData({historyRecord: data.data});
        }
      }
    });
  },

  // 输入框赋值事件
  getInputValue: function(e) {
    var myRecord = this.data.myRecord;
    myRecord.record = e.detail.detail.value;
    this.setData({
      myRecord:myRecord
    });
  },
  
  // 得分框改变事件
  handleNumberChange: function({ detail }) {
    var myRecord = this.data.myRecord;
    myRecord.score = detail.value;
    this.setData({myRecord: myRecord});
  },

  // 提交数据
  submitRecord: function() {
    var myRecord = this.data.myRecord;
    var that = this;
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'userexpr/addUserexpr',
      data: JSON.stringify(myRecord),
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        if(data.code == 0){
          wx.showModal({
            title: '提示：',
            content: '提交成功！请到历史评价中查看刚才提交的评价信息！',
            showCancel: false,
            success: function res() {
              myRecord.record = '';
              myRecord.score = 5;
              that.setData({myRecord: myRecord});
            }
          })
        }
      }
    });

  }



})