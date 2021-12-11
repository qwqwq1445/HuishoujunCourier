// pages/orders/orders.js
var util = require('../../utils/util.js');
import {getAppointOrderByOptions,getAppointOrderDetail}  from "../../utils/appointorder"
import {getAppointOrdercByOptions,getAppointOrdercDetail}  from "../../utils/appointorderc"
import {getDeliverOrderByOptions,getDeliverOrderDetail}  from "../../utils/deliverorder"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    show:false,
    columns: ['上门订单', '清箱订单', '保洁员订单'],
    orderKind:'上门订单',
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function () {
    if(getApp().globalData.courierId!=""){
      const result=await getAppointOrderByOptions({courierId:getApp().globalData.courierId,orderStatus:2})
      var list=result.data.data.value
          for(var i=0;i<list.length;i++){
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
      }
      console.log(list)
      this.setData({orderList:list})}
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
   * 显示弹出层
   */
  showPopup() {
    this.setData({ show: true });
  },

  /**
   * 不显示弹出层
   */
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 确认订单类型
   */
  onConfirm:async function(event) {
    this.setData({show:false,orderKind:event.detail.value})
    switch(event.detail.value){
      case '上门订单':
        const resultA=await getAppointOrderByOptions({courierId:getApp().globalData.courierId,"orderStatus":2});//courier
        var list=resultA.data.data.value
          for(var i=0;i<list.length;i++){
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
          }
        this.setData({orderList:list})
        break;
      case '清箱订单':
        const resultD=await getDeliverOrderByOptions({courierId:getApp().globalData.courierId,"orderStatus":2})//courier
        var list=resultD.data.data.value
        for(var i=0;i<list.length;i++){
            var str=list[i].place
            var arr = str.split(/['市']+/);//以空格分开
            list[i].placeShortened=arr[1]
          }
        this.setData({orderList:list})
        break;
      case '保洁员订单':
        break;
    }
  },
  /**
   * 点击详情按钮
   */
  onDetail(event){
    const id=event.target["id"]
    console.log(id)
    switch(this.data.orderKind){
      case "上门订单":
        wx.navigateTo({
          url: '../appointOrderDetail/index?orderId='+id
        });
        break;
      case "清箱订单":
        wx.navigateTo({
          url: '../deliverOrderDetail/index?orderId='+id
        });
        break;
      case "保洁员订单":
        break;
    }
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