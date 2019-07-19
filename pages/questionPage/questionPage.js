// pages/questionPage/questionPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    qid: null,
    quid: null,
    qNickname: "",
    title: "",
    description: "",
    asktime: "",
    myAns: "",
    empty: "",

    acptAns: {
      accept: 0,
      author: "",
      desc: "",
      atime: "",
      aid: 0,
    },
    acceptAnsId: 0,
    status: 0,

    answers: [{
        accept: 0,
        author: "",
        desc: "",
        atime: "",
      },

    ],
    hiddenmodal: true,
    hiddenAnsmodal: true,

  },
  returnMain:function(){
    wx.switchTab({
      url: '../main/iblog',
    })
  },
  //采纳提示框
  cancel: function(e) {
    console.log(e),
      this.setData({
        hiddenmodal: true,
        acceptAnsId: 0
      })
  },
  //采纳提示框,确认采纳
  confirm: function(e) {
    var self = this
    console.log(e)
    this.setData({
      hiddenmodal: true,
    })
    wx.request({
      url: app.globalData.serverUrl + '/adaptAnswer',
      data: {
        aid: this.data.acceptAnsId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v);
        wx.reLaunch({
          url: '../questionPage/questionPage?qid=' + self.data.qid + '&id=' + self.data.id,
        })

      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })


  },

  //采纳建议
  adapt: function(e) {
    console.log(e)
    this.setData({
      hiddenmodal: false,
      acceptAnsId: e.currentTarget.id
    })
  },

  //提交我的回答表单
  postAnswer: function() {
    var self = this;
    wx.request({
      url: 'http://127.0.0.1:8080/postAnswer',
      data: {
        myAns: this.data.myAns,
        qid: this.data.qid,
        myid: this.data.id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        wx.navigateTo({
          url: '../questionPage/questionPage?qid=' + self.data.qid + '&id=' + self.data.id
        })
      }
    })

  },

  //提交回答按钮
  submitAns: function(e) {
    this.setData({
      hiddenAnsmodal: false
    })
  },
  //我的回答输入绑定
  descrip: function(e) {
    this.setData({
      myAns: e.detail.value
    })
  },
  //二次确认提交
  confirmAns: function(e) {
    this.setData({
      hiddenAnsmodal: true
    })
    this.postAnswer()
  },
  cancelAns: function(e) {
    this.setData({
      hiddenAnsmodal: true
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options)
    //在页面加载期间用回调函数前，必须要把page的data先加载，不然会找不到this.data的信息
    var self = this;
    this.setData({
      id:app.globalData.id,
      qid:options.qid
    })


    wx.request({
      url: 'http://127.0.0.1:8080/questionPage',
      data: {
        id: self.data.id,
        qid: self.data.qid
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v)
        self.setData({
          //设置回复的信息
          answers: v.data.answerlist,
          //设置问题信息
          asktime: v.data.asktime,
          description: v.data.description,
          title: v.data.title,
          qNickname: v.data.qNickname,
          quid: v.data.quid,
          status: v.data.status
        })

        //如果已经被回复了
        var ansarr = self.data.answers;
        for (var i in ansarr) {
          if (ansarr[i].accept == 1)
            self.setData({
              acptAns: ansarr[i]
            })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})