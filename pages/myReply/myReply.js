// pages/replyMe/replyMe.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    answers: [],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this

    self.setData({
      id: app.globalData.id
    })
    wx.request({
      url: app.globalData.serverUrl + '/myReply?uid=' + self.data.id,
      data: {
        uid: self.data.id,
        page: self.data.page
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v)
        self.setData({
          answers: v.data.answers
        })
      }

    })

  },

  navigateTo: function(e) {
    console.log(e)
    var id = this.data.id;
    var qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../questionPage/questionPage?id=' + id + '&qid=' + qid,

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
  loadmore:function(e){
    this.onReachBottom();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var self = this;
    var next = this.data.page+1;
    wx.request({
      url: app.globalData.serverUrl + '/myReply' ,
      data: {
        uid: self.data.id,
        page: next
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v)
        var templist = self.data.answers;
        console.log(templist);
        if (v.data.answers != null) {
          var templist = self.data.answers;
          for (var i = 0; i < v.data.answers.length; i++) {

            templist.push(v.data.answers[i])
          }
          self.setData({
            answers: templist,
            page: next
          })
        } else {
          wx.showToast({
            title: '没有更多内容了',
            icon: 'none'
          })
        }
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})