
import { getAppointOrderDetail } from "../../utils/appointorder"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    senderAddress:'',
    userId:'',
    senderDate:'',
    orderId:'',
    sessionKey:'',
    senderTel:'',
    addrNo:'',
    senderUrgent:'',
    courierName:'',
    integration:0,
    steps: [
      {
        desc: '待接单',
      },
      {
        desc: '已接单',
      },
      {
        desc:'处理中',
      },
      {
        desc: '已完成',
      }],
      orderStatus:0

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getAppointOrderDetail(options.orderId).then((v)=>{
        this.setData({
          orderId: options.orderId,
          time:v.data.data.value.time,
          userId:v.data.data.value.userId,
          senderDate:v.data.data.value.senderDateBegin+'至'+v.data.data.value.senderDateEnd,
          senderAddress:v.data.data.value.senderAddress,
          senderTel:v.data.data.value.senderTel,
          orderStatus:v.data.data.value.orderStatus,
          courierName:v.data.data.value.courierName,
          integration:v.data.data.value.integration,
          senderUrgent:v.data.data.value.senderUrgent==0?'否':'是'
        })
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