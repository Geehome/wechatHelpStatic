//index.js
//获取应用实例
 var app = getApp()

Page({
  
  data: {
    motto: '点击头像进入',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res)
        if (res.code) {
          //发起网络请求
          var user = app.globalData.userInfo
          console.log(user)
          wx.request({
            url: 'http://127.0.0.1:8080/getUserOpenId',
            data: {
              rescode: res.code,
              name: user.nickName,
              gender: user.gender,
              city: user.province + ' ' + user.city,
            },
            method: 'POST',
            header: {
              'content-type': 'application/json;charset=UTF-8'
            },
            success(v) {
              console.log(v);
              var result, id
              for (var key in v.data) {
                result = key;
                id = ''+v.data[key]
              }

              app.globalData.id = id

              if (result == 'isOldUser')
                wx.switchTab({
                  url: '../main/iblog'
                })

              else if (result == 'insertSuccess')
                wx.redirectTo({
                  url: '../register/register?id=' + id
                })
            }
          })
        } else {
          consoe.log('登陆失败！' + res.errMsg)
        }
      }
    })


  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})