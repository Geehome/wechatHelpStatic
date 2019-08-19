// pages/addComment/addComment.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    id: 0,
    aid: 0,


  },

  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea);
    var self = this;
    wx.showModal({
      title: '确认',
      content: '是否提交回答？',
      success: function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.request({
            url: app.globalData.serverUrl + '/postComment',
            data: {
              aid: self.data.aid,
              uid: self.data.id,
              desc: e.detail.value.textarea

            },
            method: 'POST',
            header: {
              'content-type': 'application/json;charset=UTF-8'
            },
            success(v) {
              wx.navigateTo({
                url: '../commentPage/commentPage?aid=' + self.data.aid,
              })
            }
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
      id: app.globalData.id,
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