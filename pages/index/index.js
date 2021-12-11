//index.js
//获取应用实例
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({
  data: {
    result:'',
    userInfo: {}
  },
  onLoad:function(){
  },
 /**
  * 扫码开箱
  */
  onScanning:function(){
    // 允许从相机和相册扫码
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
        Dialog.alert({
          message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
        })
    }else{
      wx.scanCode({
        success: (res) => {
          wx.navigateTo({
            url: '../openBin/index?binCode=' +res.result
          })
        },
        fail(){
          wx.showToast({
            title: '扫码失败',
            icon:'none'
          })
        }
      })
    }
  },
  /**
   * 上门订单
   */
  onTakingAorders:function(){
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
        Dialog.alert({
          message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
        })
    }else{
      wx.navigateTo({
        url: '../appointOrders/index',
      })
    }
  },
  /**
   * 清箱订单
   */
  onTakingDorders:function(){
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
        Dialog.alert({
          message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
        })
    }
    else{
      wx.navigateTo({
        url: '../deliverOrders/index'
      })
    }
  },
  /**
   * 地图插件
   */
  onMapping:function(){
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
      Dialog.alert({
        message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
      })
    }else{
      let plugin = requirePlugin('routePlan');
      let key = 'JVPBZ-NYW6U-6SSV5-4V3WQ-MBMRQ-D3BUT';  //使用在腾讯位置服务申请的key
      let referer = 'HuishoujunCourier';   //调用插件的app的名称
      let endPoint = JSON.stringify({  //终点
          'name': '武汉大学',
          'latitude': 30.541093,
          'longitude': 114.360734
      });
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
      });
    }
  },
  /**
   * 进行中上门订单
   */
  onAppointOrdersTaking:function(){
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
        Dialog.alert({
          message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
        });
    }else{
      wx.navigateTo({
        url: '../appointOrdersTaking/index'
      })
    }
  },
  /**
   * 进行中清箱订单
   */
  onDeliverOrdersTaking:function(){
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
        Dialog.alert({
          message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
        });
    }else{
      wx.navigateTo({
        url: '../deliverOrdersTaking/index'
      })
    }
  },
  /**
   * 保洁员订单
   */
  onCleanerOrders:function(){
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
        Dialog.alert({
          message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
        })
    }else{
      wx.navigateTo({
        url: '../cleanerOrders/index'
      })
    }
  },
  /**
   * 申报订单
   */
  onReportOrders:function(){
    if(getApp().globalData.courierId=='')
    {
      Dialog.alert({
        message: '请您先登录',
      }).then(()=>{
        wx.switchTab({
          url: '../info/index',
        })
      })
    }else if(getApp().globalData.courierName==''||getApp().globalData.courierName==null||getApp().globalData.courierTel==null)
    {
        Dialog.alert({
          message: '请您先在我的信息界面，完善个人信息（姓名，电话）',
        })
    }else{
      wx.navigateTo({
        url: '../reportOrders/index'
      })
    }
  },
  
})
