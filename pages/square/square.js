// pages/square/square.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../img/square/slide1.png',
      '../img/square/slide2.png',
      '../img/square/slide3.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    result: [
      "牙痛", "牙1", "牙2"
    ],
    resultVisi: false,
    topNav: [{
        id: 1,
        redicttype: null,
        url: '../img/square/nav1.jpg',
        image: '../img/square/nav1.jpg',
        name: "口腔",
      },
      {
        id: 2,
        redirecttype: null,
        url: '../img/square/nav2.jpg',
        image: '../img/square/nav2.jpg',
        name: "牙体",
      },
      {
        id: 3,
        redirecttype: null,
        url: '../img/square/nav3.png',
        image: '../img/square/nav3.png',
        name: "正畸",
      },
      {
        id: 4,
        redirecttype: '../img/square/nav4.png',
        url: null,
        image: '../img/square/nav4.png',
        name: "儿童",
      },
      {
        id: 5,
        redirecttype: '../img/square/nav5.jpg',
        url: null,
        image: '../img/square/nav5.jpg',
        name: "种植",
      },
    ],
    postsList: [{
      id: 1,
      title: "为什么要定期来医院检查牙齿",
      date: "2018-12-13",
      total_comments: 120,
      pageviews: 900,
      like_count: 500,
      post_medium_image: '../img/square/nav3.png'
    }],
    searchText: null,
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  formSubmit: function(e) {
    console.log(e);
    var self = this;
    self.setData({
      searchText: e.detail.value.input,
    })
    if (e.detail.value.input != "")
    wx.navigateTo({
      url: '../searchList/searchList?searchText='+self.data.searchText
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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