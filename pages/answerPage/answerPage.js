// pages/answerPage/answerPage.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: 0,
    answer: null,
    question: null,
    relpy_user_name: null,
    id: null,
  },

  backToQustion: function() {
    var qid = this.data.question.qid;
    wx.navigateTo({
      url: '../questionPage/questionPage?qid=' + qid,
    })
  },

  comment: function(e) {
    wx.navigateTo({
      url: '../commentPage/commentPage?aid='+this.data.aid,
    })
  },

  like: function(e) {
    var self = this
    wx.request({
      url: app.globalData.serverUrl + '/answerPage/like',
      data: {
        aid: this.data.aid,
        id: this.data.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v.data);
        if (v.data == "success") {
          var answer = self.data.answer;
          answer.like_sum = answer.like_sum + 1;
          self.setData({
            answer: answer
          })
        }else{
          wx.showToast({
            title: '你已经点过赞了',
            icon:'none'
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    self.setData({
      aid: options.aid,
      id: app.globalData.id
    })
    wx.request({
      url: app.globalData.serverUrl + '/answerPage',
      data: {
        aid: options.aid
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v)
        self.setData({
          answer: v.data.answer,
          question: v.data.question,
          relpy_user_name: v.data.reply_user_name
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})