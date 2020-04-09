// pages/task-finish/task-finish.js
Page({

  // 页面的初始数据
  data: {
    id: '',
    type: '',
    event: '',
    rawData: {},
    questionList: [],
    curList: [],  //当前选择的答案(文字答案列表)
    answerList: [],  //已选择的答案(A、B、C数组)
    
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    console.log(options)
    var rawData = {
      id: options.id,
      score: 5,
      record: '',
      //施工额外信息
      elevatorId: options.elevatorId,
      elevatorName: options.elevatorName,
      equipmentType: '',
      equipmentName: '',
      typeNumber: '',
      speed: '',
      floor: '',
      weight: '',
      liftHeight: '',
      //维护额外信息
      questions: options.questions,
      answers: [],
      //检测额外信息
      resultUrl: ""
    };
    this.setData({type: options.type, event:options.event, id:options.id, rawData:rawData});


    //初始化数据
    this.initData();

  },

  // 搜索电梯
  searchElevator: function(e) {
    wx.navigateTo({
      url: '../task-slelevator/task-slelevator',
    })
  },

  // 获取输入框的值
  getInputValue: function(e){
    //console.log(e);
    var title = e.currentTarget.dataset.title;
    var rawData = this.data.rawData;
    //console.log(title+":"+e.detail.detail.value);
    if(title == "record"){
      rawData.record = e.detail.detail.value;
    }else if(title == "equipmentname"){
      rawData.equipmentName = e.detail.detail.value;
    }else if(title == "equipmenttype"){
      rawData.equipmentType = e.detail.detail.value;
    }else if(title == "typenumber"){
      rawData.typeNumber = e.detail.detail.value;
    }else if(title == "floor"){
      rawData.floor = e.detail.detail.value;
    }else if(title == "liftheight"){
      rawData.liftHeight = e.detail.detail.value;
    }else if(title == "speed"){
      rawData.speed = e.detail.detail.value;
    }else if(title == "weight"){
      rawData.weight = e.detail.detail.value;
    }
    if(title != null && title != ""){
      //console.log(rawData);
      this.setData({
        rawData:rawData
      });
    }
  },

  // 得分框改变事件
  handleNumberChange: function({ detail }) {
    var rawData = this.data.rawData;
    rawData.score = detail.value;
    this.setData({rawData: rawData});
  },

  // 维护问题列表选项改变事件
  handleAnswerChange: function(e) {
    var detail = e.detail;
    //console.log(e);
    //console.log(detail);
    var index = e.currentTarget.dataset.index;
    var current = detail.value;
    var curList = this.data.curList;
    var answerList = this.data.answerList;
    var answer = '';
    if(current == this.data.questionList[index].answerA)        answer='A';
    else if(current == this.data.questionList[index].answerB)   answer='B';
    else if(current == this.data.questionList[index].answerC)   answer='C';
    else if(current == this.data.questionList[index].answerD)   answer='D';
    else if(current == this.data.questionList[index].answerE)   answer='E';
    curList[index] = current;
    answerList[index] = answer;
    this.setData({curList: curList, answerList: answerList});

  },


  // 初始化数据
  initData: function (e) {
    var url, formData;
    var that = this;
    var type = this.data.type, id = this.data.id;
    if(type == 1){
      url = getApp().globalData.elevatorBackUrl+'construction/getConstructionById?id='+id;
    }else if(type == 2){
      url = getApp().globalData.elevatorBackUrl+'inspection/getInspectionById?id='+id;
    }else if(type == 3){
      url = getApp().globalData.elevatorBackUrl+'maintainence/getMaintainenceById?id='+id;
    }else{
      url = getApp().globalData.elevatorBackUrl+'testing/getTestingById?id='+id;
    }

    // 获取数据
    wx.request({
      url: url,
      method: 'POST',
      data: {},
      success: function (res) {
        //console.log(res)
        var data = res.data;
        if(data.code == 0 && data.data != null){
          if(type == 1){
            var rawData = that.data.rawData;
            //rawData.score = data.data.score;
            rawData.record = data.data.record;
            rawData.equipmentType = data.data.elevator.equipmentType, 
            rawData.equipmentName = data.data.elevator.equipmentName, 
            rawData.typeNumber = data.data.elevator.typeNumber, 
            rawData.speed = data.data.elevator.speed, 
            rawData.floor = data.data.elevator.floor, 
            rawData.weight = data.data.elevator.weight, 
            rawData.liftHeight = data.data.elevator.liftHeight;
            that.setData({rawData: rawData});
          }else if(type == 3){
            var rawData = that.data.rawData;
            rawData.score = data.data.score;
            rawData.record = data.data.record;
            rawData.questions = data.data.questions;
            var answerstr = data.data.answers;
            rawData.answers = data.data.answers;
            that.setData({rawData: rawData});

            // 获取维护问题
            var postData = {
              "arr": data.data.questions
            };
            //console.log(postData);
            wx.request({
              url: getApp().globalData.elevatorBackUrl+'question/getQuestionListByIdArray',
              method: 'POST',
              data: JSON.stringify(postData),
              success: function (res) {
                console.log(res)
                var data = res.data;
                if(data.code==0&&data.data!=null){
                  var curList = new Array(data.count), answerList = new Array(data.count);
                  // 【▲】根据已选择的答案进行赋值操作
                  if(answerstr != null && answerstr != ""){
                    answerList = answerstr.substr(1,rawData.answers.length-2).split(",");
                    for(var i=0;i<answerList.length;i++){
                      console.log("下标："+i);
                      if(answerList[i] == "A")        curList[i]=data.data[i].answerA;
                      else if(answerList[i] == "B")   curList[i]=data.data[i].answerB;
                      else if(answerList[i] == "C")   curList[i]=data.data[i].answerC;
                      else if(answerList[i] == "D")   curList[i]=data.data[i].answerD;
                      else if(answerList[i] == "E")   curList[i]=data.data[i].answerE;
                    }
                  }
                  that.setData({questionList: data.data, curList: curList, answerList: answerList});
                }
              }
            });

          }else if(type == 4){
            var rawData = that.data.rawData;
            rawData.score = data.data.score;
            rawData.record = data.data.record;
            rawData.resultUrl = data.data.resultUrl;
            that.setData({rawData: rawData});
          }else{
            var rawData = that.data.rawData;
            rawData.score = data.data.score;
            rawData.record = data.data.record;
            that.setData({rawData: rawData});
          }
        }
      }
    });
  },
  

  // 完成任务提交数据
  submitData: function(e) {
    var url, formData = {}, elevatorformData = {};
    var type = this.data.type;
    console.log(e);
    var isFinished = e.currentTarget.dataset.isfinished;
    if(this.data.event == 1){
      isFinished = 1;
    }
    if(type == 1){
      url = getApp().globalData.elevatorBackUrl+'construction/finishConstructionTask?type='+isFinished;
      formData.id = this.data.id;
      //formData.score = this.data.rawData.score;
      formData.record = this.data.rawData.record;
      elevatorformData.id = this.data.rawData.elevatorId;
      elevatorformData.equipmentType = this.data.rawData.equipmentType;
      elevatorformData.equipmentName = this.data.rawData.equipmentName;
      elevatorformData.typeNumber = this.data.rawData.typeNumber;
      elevatorformData.speed = this.data.rawData.speed;
      elevatorformData.floor = this.data.rawData.floor;
      elevatorformData.weight = this.data.rawData.weight;
      elevatorformData.liftHeight = this.data.rawData.liftHeight;
      elevatorformData.state = 1;
    }else if(type == 2){
      url = getApp().globalData.elevatorBackUrl+'inspection/addInspection';
      formData.score = this.data.rawData.score;
      formData.record = this.data.rawData.record;
      formData.elevatorId = this.data.rawData.elevatorId;
      formData.operatorId = JSON.parse(wx.getStorageSync("userInfo")).id;

    }else if(type == 3){
      url = getApp().globalData.elevatorBackUrl+'maintainence/finishMaintainenceTask?type='+isFinished;
      formData.id = this.data.id;
      formData.score = this.data.rawData.score;
      formData.record = this.data.rawData.record;
      // 设定维护问题答案
      var ansstr;
      ansstr='[';
      for(var i=0;i<this.data.answerList.length;i++){
        if(i==0){
          ansstr = ansstr + this.data.answerList[i];
        }else{
          ansstr = ansstr + ',' + this.data.answerList[i];
        }
      }
      ansstr = ansstr + ']'
      formData.answers = ansstr;
    }else{
      url = getApp().globalData.elevatorBackUrl+'testing/finishTestingTask?type='+isFinished;
      formData.id = this.data.id;
      formData.score = this.data.rawData.score;
      formData.record = this.data.rawData.record;
      formData.resultUrl = this.data.rawData.resultUrl;
    }

    // 提交数据
    wx.request({
      url: url,
      method: 'POST',
      data: JSON.stringify(formData),
      success: function (res) {
        //console.log(res)
        var data = res.data;
        if(data.code == 0){
          // 再调一次接口，修改电梯信息
          if(type == 1){
            wx.request({
              url: getApp().globalData.elevatorBackUrl+'elevator/modifyElevator',
              method: 'POST',
              data: JSON.stringify(elevatorformData),
              success: function (res) {
                var data = res.data;
                if(data.code == 0){
                  if(isFinished == 1){
                    wx.showModal({
                      title: '提示：',
                      content: '提交成功！',
                      showCancel: false,
                      success: function(res) {wx.navigateBack({delta:1});}
                    });
                  }else{
                    wx.showModal({
                      title: '提示：',
                      content: '保存任务信息成功！',
                      showCancel: false,
                      success: function(res) {}
                    });
                  }
                }else{
                  wx.showModal({
                    title: '错误提示：',
                    content: res.msg,
                    showCancel: false
                  })
                }
              }
            });
          }else{
            if(isFinished == 1){
              wx.showModal({
                title: '提示：',
                content: '提交成功！',
                showCancel: false,
                success: function(res) {wx.navigateBack({delta:1});}
              });
            }else{
              wx.showModal({
                title: '提示：',
                content: '保存任务信息成功！',
                showCancel: false,
                success: function(res) {}
              });
            }
          }

        }else{
          wx.showModal({
            title: '错误提示：',
            content: res.msg,
            showCancel: false
          })
        }
      }
    })
  },

  // 上传检测证书
  updateResult: function () {
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
              var rawData = that.data.rawData;
              rawData.resultUrl = data.data;
              that.setData({rawData: rawData})
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

})