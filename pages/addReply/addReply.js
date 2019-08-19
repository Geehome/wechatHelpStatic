// pages/addReply/addReply.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    qid: 0,
    id: null,
    qtitle: "",
  },

  close:function(e){
    wx.showModal({
      title: '确认',
      content: '是否放弃本次编辑',
      success:function(res){
        if(res.cancel){

        }else{
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },

  bindFormSubmit: function (e) {
    var self = this
    wx.showModal({
      title: '确认',
      content: '是否提交回答？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          console.log(e.detail.value.textarea)
          wx.request({
            url: app.globalData.serverUrl + '/postAnswer',
            data: {
              myid: self.data.id,
              qid: self.data.qid,
              myAns: e.detail.value.textarea

            },
            method: 'POST',
            header: {
              'content-type': 'application/json;charset=UTF-8'
            },
            success(v) {
              wx.navigateTo({
                url: '../questionPage/questionPage?qid='+self.data.qid,
              })
            }
          })
        }
      },
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    self.setData({
      qid: options.qid,
      id: app.globalData.id,
      qtitle: options.title
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