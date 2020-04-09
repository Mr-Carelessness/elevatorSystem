// pages/login/login.js
Page({

  // 页面的初始数据
  data: {
    username: "",
    username2: "",
    tpCurrent: "操作者",
    tpArray: [{id:1, name:"操作者"},{id:0, name:"普通用户"}],
    idDisplay: "block",
    hint: "",
    hintColor: "#495060"
  },

  // 测试用户
  // 操作者-   "{"id":1,"username":"superoperator001","realname":"超级操作者001","companyId":null,"company":{"id":1,"cname":"测试公司1","address":"浙江省杭州市拱墅区湖州街1号","authority":"1111","safetyManagementInfo":"1","securityTechnologyInfo":"","emegyTechnologyInfo":"","safetyOrganizationInfo":"","sealUrl":null,"avatarUrl":null,"delflag":0},"type":5,"telephone":"12345678900","avatarUrl":null,"licenseUrl":null,"createTime":"2020-01-11T11:11:50.000+0000","delflag":null}"
  // 普通用户- {"username":"user_57763","realname":"用户57763","createTime":"2020-03-03 21:48:19","type":0}
  //        - {"id":16,"username":"user_63745","realname":"石梦韬","companyId":null,"company":null,"type":0,"telephone":null,"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/9YjUbBba39Zia1TXQKaLS4jicsHDcnODD4hicswBgtfj0WfrfRyFta4Fcnhau5AeHY9d7KSR1klxTLAdhsfuW6auw/132","licenseUrl":null,"createTime":"2020-03-04 20:00:02","delflag":null}


  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    //wx.switchTab({url: '../elevator/elevator'});

    // 用户已经填写了数据，则直接跳转到个人信息界面
    if(wx.getStorageSync("userInfo") != null && wx.getStorageSync("userInfo") != ""){
      // ▲ 跳转界面
      wx.switchTab({
        url: '../task/task',
      });/**/
    }
  },
  
  // 选择用户身份事件
  handleTypeChange({ detail = {} }) {
    var that = this;
    this.setData({tpCurrent: detail.value});
    if(detail.value=="操作者"){
      this.setData({idDisplay: "block"});
    }else{
      this.setData({idDisplay: "none"});
      // 如果是用户，随机获取用户名，然后进行注册
      wx.request({
        url: getApp().globalData.elevatorBackUrl+'operator/generateOperatorUsername',
        data: {},
        method: "POST",
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        success: function(res){
          //console.log(res)
          var data = JSON.parse(res.data)
          that.setData({username2: data.data});
        }
      })
    }
  },

  // 松开根据username获取用户信息
  getUserInfo: function(e){
    console.log(123)
    var that = this;
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'operator/getOperatorByUsername?username='+that.data.username,
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        //console.log(res)
        var data = JSON.parse(res.data)
        //console.log(data)
        // 成功获取用户信息
        if(data.code == 0 && data.data != null){
          wx.setStorage({ key: 'userInfo', data: JSON.stringify(data.data) });
          that.setData({hint:"提示：已检测到您是——"+data.data.realname, hintColor: "#495060"});
        }else{
          wx.setStorage({ key: 'userInfo', data: "" });
          that.setData({hint:"提示：请您输入由管理员分配的正确用户名", hintColor: "#ed3f14"});
        }
      },
      fail: function(res){
        wx.setStorage({ key: 'userInfo', data: "" });
        that.setData({hint:"提示：已检测到您当前网络状态不好，请稍后进行尝试", hintColor: "#ed3f14"});
      }
    })
  },

  // 进入小程序
  elogin: function(e){
    var that = this;
    if(this.data.tpCurrent == "操作者"){
      if( wx.getStorageSync("userInfo")!= null && wx.getStorageSync("userInfo")!="" ){
        wx.switchTab({
          url: '../task/task',
        });
      } else{
        wx.showModal({
          title: '提示：',
          content: '操作失败：您还没有输入正确的用户名，因此不能进入小程序！',
        })
      }
    } else{
      // 根据获取到的username新注册一个用户
      var formData = {
        username: that.data.username2,
        realname: "用户"+that.data.username2.substring(5),
        type: 0
      };
      wx.request({
        url: getApp().globalData.elevatorBackUrl+'operator/addOperator',
        data: JSON.stringify(formData),
        method: "POST",
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        success: function(res){
          var data = JSON.parse(res.data);
          if(data.code == 0){
            // 再次发起请求，获取新插入的一条记录
            wx.request({
              url: getApp().globalData.elevatorBackUrl+'operator/getOperatorByUsername?username='+formData.username,
              data: {},
              method: "POST",
              dataType: 'JSON',
              contentType: "application/json; charset=utf-8",
              success: function(res){
                var dt = JSON.parse(res.data);
                console.log(dt);
                if(dt.code == 0 && dt.data != null){
                  // 存储用户信息
                  //formData.createTime = that.dateToStr(new Date());
                  wx.setStorage({ key: 'userInfo', data: JSON.stringify(dt.data) });
                  // 跳转界面
                  wx.switchTab({
                    url: '../task/task',
                  });
                }else{
                  // 提示信息
                  wx.showModal({
                    title: '提示：',
                    content: '系统繁忙中，请您稍后再试...',
                  })
                }
              },
              fail: function(res){
                // 提示信息
                wx.showModal({
                  title: '提示：',
                  content: '系统繁忙中，请您稍后再试...',
                })
              }
            });
           
          }else{
            // 提示信息
            wx.showModal({
              title: '提示：',
              content: '系统繁忙中，请您稍后再试...',
            })
          }

        },
        fail: function(res){
          // 提示信息
          wx.showModal({
            title: '提示：',
            content: '系统繁忙中，请您稍后再试...',
          })
        }
      })
    }
  },

  // 转换成时间戳格式
  dateToStr: function (datetime){
    var dateTime = new Date(datetime);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;//js从0开始取
    var date = dateTime.getDate();
    var hour = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    var second = dateTime.getSeconds();

    if(month<10){month = "0" + month;}
    if(date<10){date = "0" + date;}
    if(hour <10){hour = "0" + hour;}
    if(minutes <10){minutes = "0" + minutes;}
    if(second <10){second = "0" + second ;}

    return year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
  },

  // 以输入框形式获取用户名
  // 获取输入框的值
  getInputValue: function(e){
    this.setData({
      username: e.detail.detail.value
    });
  },

})