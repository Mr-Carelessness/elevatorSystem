// pages/taskstatus/taskstatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordId:"1",
    elevatorId: "1",
    mtId: "1",
    undoneTime: "1",
    feedback: "",
    recordCt: "",
    recordType: "普通记录",
    position: 'left',
    // 检查项
    qs: [{id: 1,name: '基本符合要求',}, {id: 2,name: '勉强符合要求'}, {id: 3,name: '不符合要求'}],
    current1: '勉强符合要求',
    current2: '勉强符合要求',
    current3: '勉强符合要求',
    current4: '勉强符合要求',
    current5: '勉强符合要求',
    current6: '勉强符合要求',
  },
  handleQs1Change({ detail = {} }) {
    this.setData({current1: detail.value});
  },
  handleQs2Change({ detail = {} }) {
    this.setData({ current2: detail.value });
  },
  handleQs3Change({ detail = {} }) {
    this.setData({ current3: detail.value });
  },
  handleQs4Change({ detail = {} }) {
    this.setData({ current4: detail.value });
  },
  handleQs5Change({ detail = {} }) {
    this.setData({ current5: detail.value });
  },
  handleQs6Change({ detail = {} }) {
    this.setData({ current6: detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.recordId);
    this.setData({ recordId: options.recordId });
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/demo/superadmin/getrecordbyid?recordId=' + options.recordId,
      method: 'GET',
      data:{},
      success: function(res){
        //console.log(res)
        that.setData({
          elevatorId: res.data.record.elevatorId,
          mtId: res.data.record.mtId,
          undoneTime: res.data.record.undoneTime.substr(0,10),
          recordType: res.data.record.recordType,
        })
      }
    })
  },

  finishtask: function(e){
    var that = this;
    if (this.data.recordType == "总结记录"){
      this.setData({
        recordCt: "【条目1：电梯保持清洁】（" + this.data.current1 + "）" + "【条目2：轿厢检修开关、停止装置工作正常】（" + this.data.current2 + "）" + "【条目3：轿厢报警装置、对讲系统保持正常】（" + this.data.current1 + "）" + "【条目4：轿门运行开启和关闭工作正常】（" + this.data.current1 + "）" + "【条目5：层站召唤、层楼显示齐全有效】（" + this.data.current1 + "）" + "【条目6：层门自动关门装置工作正常】（" + this.data.current1 + "）"
      })
    }

    // 前面加一个特殊情况的判断
    wx.request({
      url: 'http://127.0.0.1:8080/demo/superadmin/modifyrecord',
      method: "POST",
      data: { recordId: that.data.recordId, recordCt: that.data.recordCt, feedback: that.data.feedback, recordStatus: "已完成", lastTime: new Date()},
      success: function(res){
        console.log(res)
        if(res.data.code == 0){
          wx.showModal({
            title: '提示',
            content: '成功完成任务',
            showCancel: 'false',
            success: function (res) {
              //返回到上一级页面
              wx.navigateBack({ delta: 1 })
            }
          })          
        }else{
          wx.showModal({
            title: '提示：',
            content: res.data.errMsg,
            showCancel: false
          })
        }

      }
    })
  }
})