//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo()
    wx.cloud.init({
      env:"trashrecycle-core-3eou5f3ce48397"
      //env:"trashrecycle-core-3eou5f3ce48397"
    })
    // wx.cloud.downloadFile({
    //   fileID: 'cloud://cloud1-0g663m90c834cf5f.636c-cloud1-0g663m90c834cf5f-1305863758/背景印花.png',
    //   success: res => {
    //     // get temp file path
    //     getApp().globalData.backimg=res.tempFilePath
    //     this.setData({
    //       noLogin:res.tempFilePath
    //     })
    //   },
    //   fail: err => {
    //     // handle error
    //     console.log(err)
    //   }
    // })
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    courierId:'',
    courierTel:'',
    courierName:'',
    backimg:'',
    userInfo:null
  }
})



