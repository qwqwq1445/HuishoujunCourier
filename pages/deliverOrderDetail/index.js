import { getDeliverOrderDetail } from "../../utils/deliverorder"
// pages/deliverOrderDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrNo: "",
    category: "",
    feedback: "",
    integration: 0,
    orderId: "",
    orderStatus: 0,
    place: "",
    time: "",
    userId: "",
    courierId:"",
    weight: 0,
    steps: [
      {
        desc: '待领取',
      },
      {
        desc: '已领取',
      },
      {
        desc:'处理中'
      },
      {
        desc: '已完成',
      }],
      orderStatus:0

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var result=await getDeliverOrderDetail(options.orderId);//根据id查找
    console.log(result)
    this.setData({
      category: result.data.data.value.category,
      feedback: "",  
      integration: 0,
      orderId: result.data.data.value.orderId ,
      orderStatus: result.data.data.value.orderStatus,
      place: result.data.data.value.place,
      time: result.data.data.value.time,
      userId: result.data.data.value.userId,
      courierId: result.data.data.value.courierId,
      weight:result.data.data.value.weight
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