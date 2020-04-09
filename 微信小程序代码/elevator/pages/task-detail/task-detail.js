// pages/task-detail/task-detail.js
Page({
  data: {
    userInfo: {},
    type: 0,
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
    
    constructionList: [],
    inspectionList: [],
    maintainenceList: [],
    testingList: []
  },
  onLoad(options) {
    this.setData({userInfo: JSON.parse(wx.getStorageSync("userInfo"))});
    var type = options.type;
    this.setData({type: type});

    this.setNowDate();
  },
  onShow(options){
    this.setNowDate();
  },
  dateSelectAction: function (e) {
    var cur_day = e.currentTarget.dataset.idx;
    var that = this;
    this.setData({
      todayIndex: cur_day
    });
    var year = this.data.cur_year;
    var month = this.data.cur_month;
    var day = cur_day + 1;
    if(month < 10){month = "0"+month}
    if(day < 10){day = "0"+day}
    
    var mtId = this.data.mtId;
    //点击的日期
    console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);
    console.log(mtId)
    console.log(year + "-" + month + "-" + day)
    
    var url, type=that.data.type;
    var operatorId=that.data.userInfo.id, curdate=new Date(year+"-"+month+"-"+day).getTime();
    if(type == 1)         url = getApp().globalData.elevatorBackUrl+"construction/getConstructionPageListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;
    else if(type == 2)    url = getApp().globalData.elevatorBackUrl+"inspection/getInspectionListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;
    else if(type == 3)    url = getApp().globalData.elevatorBackUrl+"maintainence/getMaintainencePageListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;
    else                  url = getApp().globalData.elevatorBackUrl+"testing/getTestingListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;

    wx.request({
      url: url,
      method: 'POST',
      data: {},
      success: function (res) {
        console.log(res)
        var data = res.data;
        if(type == 1)         that.setData({ constructionList: data.data });
        else if(type == 2)    that.setData({ inspectionList: data.data });
        else if(type == 3)    that.setData({ maintainenceList: data.data });
        else                  that.setData({ testingList: data.data });
      }
    })
  },

  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
    })
    var year = cur_year, month = cur_month, day = todayIndex+1;
    if (month < 10) { month = "0" + month }
    if (day < 10) { day = "0" + day }

    var mtId;
    var that = this;
    /**
     * 获取数据
     */
    var url, type=that.data.type;
    var operatorId=that.data.userInfo.id, curdate=new Date(year+"-"+month+"-"+day).getTime();
    if(type == 1)         url = getApp().globalData.elevatorBackUrl+"construction/getConstructionPageListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;
    else if(type == 2)    url = getApp().globalData.elevatorBackUrl+"inspection/getInspectionListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;
    else if(type == 3)    url = getApp().globalData.elevatorBackUrl+"maintainence/getMaintainencePageListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;
    else                  url = getApp().globalData.elevatorBackUrl+"testing/getTestingListByOperatorIdAndDate?operatorId="+operatorId+"&currentDate="+curdate;

    wx.request({
      url: url,
      method: 'POST',
      data: {},
      success: function (res) {
        console.log(res)
        var data = res.data;
        if(type == 1)         that.setData({ constructionList: data.data });
        else if(type == 2)    that.setData({ inspectionList: data.data });
        else if(type == 3)    that.setData({ maintainenceList: data.data });
        else                  that.setData({ testingList: data.data });
      }
    })
    

  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },
  // 完成任务
  finishtask: function(e){
    console.log(e)
    if(e.currentTarget.dataset.state < 2){
      wx.navigateTo({
        url: '../task-finish/task-finish?type='+e.currentTarget.dataset.type+'&event='+e.currentTarget.dataset.event+'&id='+e.currentTarget.dataset.id+"&elevatorId="+e.currentTarget.dataset.elevatorid,
      });
    }else{
      wx.navigateTo({
        url: '../task-finish/task-finish?type='+e.currentTarget.dataset.type+'&event='+2+'&id='+e.currentTarget.dataset.id+"&elevatorId="+e.currentTarget.dataset.elevatorid,
      });
    }
  }
})