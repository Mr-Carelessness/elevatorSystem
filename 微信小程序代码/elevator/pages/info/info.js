// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nameTitle: "",
    


  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    this.setData({userInfo: JSON.parse(wx.getStorageSync("userInfo"))});


    if(this.data.userInfo.type == 0){
      this.setData({nameTitle:"用户名"});
    }else{
      this.setData({nameTitle:"姓名"});
    }
  },

  // 生命周期函数--页面出现
  onShow: function (options){
    //{{info.getIconSrc(userInfo.avatarUrl, userInfo.type)}}
    this.setData({ userInfo: JSON.parse(wx.getStorageSync("userInfo")) });
  },

  // 退出登录
  exitSystem: function(){
    wx.showModal({
      title: '提示：',
      content: '确定要退出登录吗？',
      success: function(res){
        if(res.confirm){
          wx.setStorage({key: 'userInfo',data: ''});
          wx.reLaunch({
            url: '../login/login',
          });
        }
      }
    })
  },

  // 修改个人信息
  userInfoMod: function(options){
    wx.navigateTo({url: '../info-mod/info-mod'})
  }
  

})