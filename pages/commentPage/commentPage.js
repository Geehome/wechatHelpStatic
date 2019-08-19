// pages/commentPage/commentPage.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: 0,
    id: app.globalData.id,
    comments: null,
    page: 1,
    comments: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    self.setData({
      aid: options.aid,
    })
    wx.request({
      url: app.globalData.serverUrl + '/commentPage',
      data: {
        aid: self.data.aid,
        page: self.data.page,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v);
        self.setData({
          comments: v.data.comments
        })
      }
    })
  },

  loadmore:function(e){
    this.onReachBottom();
  },
  
  addComment:function(e){
    wx.navigateTo({
      url: '../addComment/addComment?aid='+ this.data.aid,
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
    var self = this;
    var next = self.data.page + 1;
    wx.request({
      url: app.globalData.serverUrl + '/answerPage',
      data: {
        aid: self.data.aid,
        page: next
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v)
        if (v.data.comments != null) {
          var tmp = self.comments;
          for (var i = 0; i < v.data.comments.length; i++) {
            tmp.append(v.data.comments[i]);
          }
          self.setData({
            comments: tmp,
            page:next
          })
        }else{
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