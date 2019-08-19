// pages/questionPage/questionPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,

    //问题信息
    qid: null,
    quid: null,
    description: "",
    title: "",
    asktime: "",
    qNickname: "",
    pv: 0,
    reply_sum: "",

    //回复list
    answers: [{
      aid: 0,
      ans_pv: 0,
      ans_reply_sum: 0,
      atime: null,
      desc: null,
      like_sum: 0
    }, ],
    //分页用
    pageNum: 1,


    myAns: "",
    empty: "",
    hiddenmodal: true,
    hiddenAnsmodal: true,

  },
  returnMain: function() {
    wx.switchTab({
      url: '../main/iblog',
    })
  },

  //添加回答，跳转页面
  addReply:function(e){
    wx.navigateTo({
      url: '../addReply/addReply?qid='+this.data.qid+'&title='+this.data.title,
    })
  },
  
  //提交我的回答表单
  postAnswer: function() {
    var self = this;
    wx.request({
      url: app.globalData.serverUrl+'/postAnswer',
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


  navigateToAnsPage: function(e) {
    var aid = e.currentTarget.dataset.aid;

    wx.navigateTo({
      url: '../answerPage/answerPage?aid=' + aid,
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
      id: app.globalData.id,
      qid: options.qid
    })


    wx.request({
      url: app.globalData.serverUrl+'/questionPage',
      data: {
        id: self.data.id,
        qid: self.data.qid,
        pageNum: self.data.pageNum
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v)
        self.setData({
          //设置回复的信息
          answers: v.data.answers,
          //设置问题信息
          quid: v.data.quid,
          description: v.data.description,
          title: v.data.title,
          asktime: v.data.asktime,
          qNickname: v.data.qNickname,
          pv: v.data.page_view,
          reply_sum: v.data.reply_sum,
        })

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
    wx.showLoading({
      title: '玩命加载中', //上拉的时候会出现一个提示框
    })
    var self = this;
    var page = self.data.pageNum + 1;
    self.setData({
        pageNum: page,
      }),
      wx.request({
        url: app.globalData.serverUrl + '/questionPage',
        data: {
          id: self.data.id,
          qid: self.data.qid,
          pageNum: self.data.pageNum
        },
        method: 'POST',
        header: {
          'content-type': 'application/json;charset=UTF-8'
        },
        success(v) {
          if (v.data.answers != null) {
            var temp = self.data.answers;
            for (var i = 0; i < v.data.answers.length; i++) {
              temp.push(v.data.answers[i]);
            }
            self.setData({
              answers: temp
            })
            wx.hideLoading();
          } else
            wx.showToast({
              title: '没有更多内容了',
              icon:'none',
              duration: 5000
            })
        }
        
      })


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})