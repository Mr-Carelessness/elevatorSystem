// pages/elevator-score/elevator-score.js
Page({

  // 页面的初始数据
  data: {
    id: "",
    ind: {},
    color: {},
    score: '',
    name: "",
    hint: ""
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var id = options.id;
    var score = options.score;
    var name = options.name;
    var that = this;
    this.setData({id: id, score: score, name: name, hint:this.getHint(score)});
    wx.request({
      url: getApp().globalData.elevatorBackUrl+'indices/getElevatorIndicesByElevatorId?elevatorId='+id,
      data: {},
      method: "POST",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
      success: function(res){
        var data = JSON.parse(res.data);
        var ind = data.data;
        if(data.code == 0 && data.data != null){
          ind.ind1 = ind.ind1.toFixed(1);
          ind.ind2 = ind.ind2.toFixed(1);
          ind.ind3 = ind.ind3.toFixed(1);
          ind.ind4 = ind.ind4.toFixed(1);
          ind.ind5 = ind.ind5.toFixed(1);
          ind.ind6 = ind.ind6.toFixed(1);
          ind.ind7 = ind.ind7.toFixed(1);
          ind.ind8 = ind.ind8.toFixed(1);
          ind.ind9 = ind.ind9.toFixed(1);
          ind.ind10 = ind.ind10.toFixed(1);
          ind.ind11 = ind.ind11.toFixed(1);
          ind.ind12 = ind.ind12.toFixed(1);
          var color = {
            ind1:that.getColorByScore(data.data.ind1),
            ind2:that.getColorByScore(data.data.ind2),
            ind3:that.getColorByScore(data.data.ind3),
            ind4:that.getColorByScore(data.data.ind4),
            ind5:that.getColorByScore(data.data.ind5),
            ind6:that.getColorByScore(data.data.ind6),
            ind7:that.getColorByScore(data.data.ind7),
            ind8:that.getColorByScore(data.data.ind8),
            ind9:that.getColorByScore(data.data.ind9),
            ind10:that.getColorByScore(data.data.ind10),
            ind11:that.getColorByScore(data.data.ind11),
            ind12:that.getColorByScore(data.data.ind12),
            score:that.getColorByScore(score/20)
          };
          that.setData({ind: ind, color: color});
        }
      }
    });

  },

  // num.toFiexed(1)  保留一位小数

  // 根据得分获取颜色
  getColorByScore: function(num) {
    if(num >= 4)                    return "#2b85e4";
    else if(num >= 3 && num < 4)    return "#5cadff";
    else if(num >= 2 && num < 3)    return "#ff9900";
    else                            return "#ed3f14";
  },

  // 根据得分获取提示信息
  getHint: function(num) {
    if(num >= 80)                    return "电梯当前状况良好，请放心乘坐！";
    else if(num >= 60 && num < 80)   return "电梯当前状况一般，乘坐时请注意一些可能出现的小问题！";
    else if(num >= 40 && num < 60)   return "电梯当前可能出现较大问题，乘坐时注意安全！";
    else                             return "电梯目前出于危险的状态，尽可能地远离该电梯！";
  }

})