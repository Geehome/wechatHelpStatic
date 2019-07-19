Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: null,
    age: null,
    moto1: "电话号码",
    moto2: "年龄",
    ageNum: [],
    index: 0,
    id:null
  },

  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
    console.log('电话号码的输入值：', e.detail.value)
  },

  ageInput: function (e) {
    this.setData({
      index: e.detail.value,
      age: e.detail.value,
    })
    console.log('年龄的选择值：', e.detail.value)
  },



  //注册账户
  doRegist: function (e) {
    wx.request({
      url: 'http://127.0.0.1:8080/register',
      data: {
        tel: this.data.tel,
        age: this.data.age,
        id: this.data.id
      },

      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },

      success(v) {
        wx.switchTab({
          url: '../main/iblog'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var arr = new Array(190)
    for (var i = 0; i < 190; i++) {
      arr[i] = i;
    }
    this.setData({ ageNum: arr })
    this.setData({
      id : options.id
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