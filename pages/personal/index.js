import { areaList } from "../../static/area"
import { getCourierDetail,saveOrUpdateCourier } from "../../utils/courier"

// pages/personal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    credit: '',
    id: '',
    idCard: '',
    imageUrl: '',
    name: '',
    orderNum: 0,
    sessionKey: '',
    tel: '',
    area:'',
    role:''
  },
  onNameChange(event) {
    this.setData({
      name: event.detail,
    });
  },
  /**
   * 骑手号监听函数
   * @param {*} event 
   */
  onAddressChange(event) {
    this.setData({
      address: event.detail,
    });
  },
  /**
   * 电话号监听函数
   * @param {*} event 
   */
  onTelChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      tel: event.detail,
    });
  },
  /**
   * 提交个人信息更新
   */
  onSubmit(){
    if(this.data.id!=''){
      saveOrUpdateCourier({
          "id":this.data.id,
          "address": this.data.address,
          "idCard": this.data.idCard,
          "tel": this.data.tel,
          "credit": this.data.credit,
          "name": this.data.name
      })
      getApp().globalData.courierTel=this.data.tel
      getApp().globalData.courierName=this.data.name
      wx.showToast({
        title: '更改成功！',  // 标题
        icon: 'success',   // 图标类型，默认success
        duration: 1500 ,  // 提示窗停留时间，默认1500ms
      })
      setTimeout(function () {
        wx.navigateBack({//返回
          delta: 0
        })
      }, 1500);
    }else{
      wx.showToast({
        title: '未登录状态！',  // 标题
        icon: 'none',   // 图标类型，默认success
        duration: 1500 ,  // 提示窗停留时间，默认1500ms
      })
      setTimeout(function () {
        wx.navigateBack({//返回
          delta: 0
        })
      }, 1500);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    if(getApp().globalData.courierId!=""){
      const v=await getCourierDetail(getApp().globalData.courierId)
        await this.setData({
          id:getApp().globalData.courierId,
          name:v.data.data.value.name,
          address: v.data.data.value.address,
          credit: v.data.data.value.credit,
          idCard: v.data.data.value.idCard,
          orderNum: v.data.data.value.orderNum,
          tel: v.data.data.value.tel,
          area:areaList.county_list[v.data.data.value.addrNo],
          role:v.data.data.value.role
        })
    }
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