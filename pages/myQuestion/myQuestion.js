// pages/myQuestion/myQuestion.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    id: null,
    selectedQid: null,
    questionList: [
      {
        title: "",
        qtime: "",
        qid: 0,
        status: 0
      }
    ],
    icon: ['../img/myQues-solve.jpg','../img/myQues-unsolve.jpg']
  },

  //点击某个list进入问题详细界面
  navigateTo:function(e){
    console.log(e)
    var qid = e.currentTarget.dataset.qid;
    var self = this
    wx.navigateTo({
      url: '../questionPage/questionPage?qid='+qid+'&id='+self.data.id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var self = this
    self.setData({
      id: options.id
    })
    wx.request({
      url: app.globalData.serverUrl + '/myQuestionList',
      data: {
        uid: self.data.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(v) {
        console.log(v);
        self.setData({
          questionList: v.data.questionList
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