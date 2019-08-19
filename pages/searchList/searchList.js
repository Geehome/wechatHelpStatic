// pages/searchList/searchList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:app.globalData.id,
    searchText:null,
    questionList:null
  },


  navigateToQuestion:function(e){
    console.log(e);
    var self = this
    wx.navigateTo({
      url: '../questionPage/questionPage?qid='+e.currentTarget.dataset.qid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.setData({
      searchText:options.searchText
    })
    wx.request({
      url: app.globalData.serverUrl + '/searchQuestion',
      data: {
        searchText: options.searchText
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
          console.log(v);
          self.setData({
            questionList:v.data.searchList
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})