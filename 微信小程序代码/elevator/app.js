//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var ssk, code;
    var that = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res);
        that.globalData.code = res.code;
        wx.request({
          url: 'https://zuccsecondary.cn/elevator/login/getopenid.php',
          method: 'GET',
          data: { code: that.globalData.code },
          success: function(res){
            console.log(res);
            that.globalData.ssk = res.data.session_key;
            ssk = res.data.session_key;
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res) //微信用户基本信息
              var ed = res.encryptedData;
              var iv = res.iv;
              console.log("ed：" + ed)
              console.log("ssk："+ ssk)
              console.log("iv：" + iv)
              // 可以将 res 发送给后台解码出 unionId（微信名，头像地址等等）
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
 
              // 获取微信小程序号
              wx.request({
                url: 'https://zuccsecondary.cn/elevator/login/login.php',
                method: 'GET', 
                data: { ssk: ssk, ed:ed, iv:iv},
                success: function(res){
                  console.log("个人信息：")
                  wx.setStorage({ key: 'wxname', data: res.data.nickName });
                  wx.setStorage({ key: 'logo', data: res.data.avatarUrl });
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    appid: "wxd00af84393bdff8a",
    ssk: "",
    code: "",
    elevatorBackUrl: "https://zuccsecondary.cn:8443/elevator/"
  }
  // [备用地址]：http://localhost:8080/elevator/
})