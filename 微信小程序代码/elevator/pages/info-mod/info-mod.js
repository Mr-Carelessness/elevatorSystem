// pages/info-mod/info-mod.js
Page({

  // 页面的初始数据
  data: {
    userInfo: {},
    nameTitle: "",
    avatarUrl: "",
    tmpAvatarUrl: "",
    licenseUrl: "",
    tmpLicenseUrl: "",
    state: 0
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    this.setData({userInfo: JSON.parse(wx.getStorageSync("userInfo"))});
    if(this.data.userInfo.type == 0){
      this.setData({nameTitle:"用户名", avatarUrl:this.data.userInfo.avatarUrl, tmpAvatarUrl:this.data.userInfo.avatarUrl, licenseUrl:this.data.userInfo.licenseUrl, tmpLicenseUrl:this.data.userInfo.licenseUrl });
    }else{
      this.setData({nameTitle:"姓名", avatarUrl:this.data.userInfo.avatarUrl, tmpAvatarUrl:this.data.userInfo.avatarUrl, licenseUrl:this.data.userInfo.licenseUrl, tmpLicenseUrl:this.data.userInfo.licenseUrl });
    }
  },

  // 获取输入框的值
  getInputValue: function(e){
    //console.log(e);
    var title = e.currentTarget.dataset.title;
    var userInfo = this.data.userInfo;
    if(title == "realname"){
      userInfo.realname = e.detail.detail.value;
    }else if(title = "telephone"){
      userInfo.telephone = e.detail.detail.value;
    }
    this.setData({
      userInfo:userInfo
    });
  },

  // 获取个人信息
  bindGetUserInfo: function(e) {
    var subInfo = e.detail.userInfo;
    var that = this;
    var formData = {
      id: this.data.userInfo.id
    }
    //console.log(subInfo);
    if(this.data.userInfo.type == 0){
      formData.realname = subInfo.nickName;
      formData.avatarUrl = subInfo.avatarUrl;
      wx.request({
        url: getApp().globalData.elevatorBackUrl+'operator/modifyOperator',
        data: JSON.stringify(formData),
        method: "POST",
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        success: function(res){
          var data = JSON.parse(res.data);
          if(data.code == 0){
            var uf = that.data.userInfo;
            uf.realname = subInfo.nickName;
            uf.avatarUrl = subInfo.avatarUrl;
            wx.setStorage({key: 'userInfo',data: JSON.stringify(uf)});
            //console.log("操作成功");
            wx.showModal({
              title: '提示：',
              content: '修改个人信息成功',
              showCancel: false,
              success: function(res){wx.navigateBack({delta:1});}
            });
          }
        }
      });
      
    }else{
      formData.avatarUrl = subInfo.avatarUrl;
      wx.request({
        url: getApp().globalData.elevatorBackUrl+'operator/modifyOperator',
        data: JSON.stringify(formData),
        method: "POST",
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        success: function(res){
          var data = JSON.parse(res.data);
          if(data.code == 0){
            var uf = that.data.userInfo;
            uf.avatarUrl = subInfo.avatarUrl;
            wx.setStorage({key: 'userInfo',data: JSON.stringify(uf)});
            wx.showModal({
              title: '提示：',
              content: '修改个人信息成功',
              showCancel: false,
              success: function(res){wx.navigateBack({delta:1});}
            });
            //console.log("操作成功");
            
          }
        }
      });
    }
  },

  // 点击修改个人信息按钮
  bindModUserInfo: function(options){
    this.setData({state: 1});
  },

  // 更换头像
  updateAvatar: function () {
    var that = this
    // 上传图片获取路径
    wx.chooseImage({
      success: function (res) {
        var path = res.tempFilePaths[0];
        //console.log('临时路径：' + res.tempFilePaths[0])
        wx.uploadFile({
          url: getApp().globalData.elevatorBackUrl + 'other/upload/img',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (result) {
            console.log(result)
            var data = JSON.parse(result.data);
            if(data.code == 0){
              wx.showToast({title: '上传成功', icon: 'success'})
              //console.log("返回路径：" + data.data)
              that.setData({avatarUrl: data.data, tmpAvatarUrl: path})
            }else{
              wx.showToast({title: '上传失败',icon: 'none'});
            }
          },
          fail: function(result){
            wx.showToast({title: '上传失败',icon: 'none'});
          }
        })
      },
    })
  },

  // 更换工作证书
  updateLicense: function () {
    var that = this
    // 上传图片获取路径
    wx.chooseImage({
      success: function (res) {
        var path = res.tempFilePaths[0];
        //console.log('临时路径：' + res.tempFilePaths[0])
        wx.uploadFile({
          url: getApp().globalData.elevatorBackUrl + 'other/upload/img',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (result) {
            console.log(result)
            var data = JSON.parse(result.data);
            if(data.code == 0){
              wx.showToast({title: '上传成功', icon: 'success'})
              //console.log("返回路径：" + data.data)
              that.setData({licenseUrl: data.data, tmpLicenseUrl: path})
            }else{
              wx.showToast({title: '上传失败',icon: 'none'});
            }
          },
          fail: function(result){
            wx.showToast({title: '上传失败',icon: 'none'});
          }
        })
      },
    })
  },

  // 修改用户信息
  modUserInfo: function(e){
    var that = this;
    var formData = {
      id: this.data.userInfo.id,
      realname: this.data.userInfo.realname,
      telephone: this.data.userInfo.telephone,
      avatarUrl: this.data.avatarUrl,
      licenseUrl: this.data.licenseUrl
    };
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'operator/modifyOperator',
      data: JSON.stringify(formData),
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        if(data.code == 0){
          var userInfo = that.data.userInfo;
          userInfo.avatarUrl = that.data.avatarUrl;
          userInfo.licenseUrl = that.data.licenseUrl;
          wx.setStorage({
            key: 'userInfo',
            data: JSON.stringify(userInfo),
            success: function(r) {
              wx.showModal({
                title: '提示：',
                content: '修改个人信息成功',
                showCancel: false,
                success: function(res){wx.navigateBack({delta:1});}
              });
            }
          })
          
          //console.log("操作成功");
        }else{
          wx.showToast({title: '操作失败',icon: 'none' });
        }
      },
      fail: function(res){
        wx.showToast({title: '操作失败',icon: 'none' });
      }
    });

  }


})