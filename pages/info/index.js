// pages/info.js
import {getOpenId} from "../../utils/userlogin"
import {getCourierInfo} from "../../utils/courier"
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    minBack:'',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    var that=this
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.login({ 
          success:async(result)=> {
            if (result.code) {
                const res=await getOpenId(result.code)
                console.log(res)
                const r=await getCourierInfo({"openId":res.data.data.value})
                getApp().globalData.courierId=r.data.data.value.id
                getApp().globalData.courierName=r.data.data.value.name
                getApp().globalData.courierTel=r.data.data.value.tel
            }else{
              wx.showToast({
                title: '登陆失败'+res.errMsg,
              })
            }
          }
        })
      },fail(){
        wx.showToast({
          title: '登陆失败',
          icon:'none'
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 个人信息
   * **/
  onPersonal:function(){
      wx.navigateTo({
        url: '../personal/index'
      })
  },
  /**
   * 完成订单
   */
  onFinishedOrders:function(){
      wx.navigateTo({
        url: '../finishedOrders/index?'
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