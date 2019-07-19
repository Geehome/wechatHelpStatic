const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:null,
     question:"开始提问？",
    items: [
      {
        icon: '../img/user-question.jpg',
        text: '我的口腔问题',
        path: '../myQuestion/myQuestion'
      },
      {
        icon: '../img/user-myhelp.jpg',
        text: '我帮助的人',
        path: '../myReply/myReply'
      },
      {
        icon: '../img/user-replyme.jpg',
        text: '回复我的',
        path: "../replyMe/replyMe"
      },
      {
        icon: '../img/user-square.jpg',
        text: '口腔问题广场',
        path: '/pages/help/list/index',
      },
    ],
    settings: [
      {
        icon: '../img/user-profile.jpg',
        text: '修改个人资料',
        path: null
      },
    ]
  },


  navigateTo:function(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.path+'?id='+this.data.id,
    })
  },
  ask: function () {
    wx.navigateTo({
      url: '../postquest/postquest?id='+ this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("mainPage id is"+App.globalData.id)

    this.setData({
      id: App.globalData.id
    })
    console.log(App.globalData.id)
    this.setData({
      userInfo: App.globalData.userInfo
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