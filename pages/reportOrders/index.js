// pages/reportOrders/index.js
import {areaList} from "../../static/area"
import {getAppointOrderByOptions,getAppointOrderDetail}  from "../../utils/appointorder"
import {getDeliverOrderByOptions,getDeliverOrdercDetail}  from "../../utils/deliverorder"
var amapFile = require('../../static/amap-wx.130.js');
Page({
   /**
   * 页面的初始数据
   */
  data: {
    show:false,
    columns: ['上门订单', '清箱订单', '保洁员订单'],
    orderKind:'上门订单',
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'f1c086a1184898191bae6b8fecaa3bf3'});
    myAmapFun.getRegeo({
      success:async function(res){
          const result=await getAppointOrderByOptions({
            "orderStatus":2,
            "courierId":getApp().globalData.courierId
          })
          var list=result.data.data.value
          for(var i=0;i<list.length;i++){
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
          }
          that.setData({
            ACode:res[0].regeocodeData.addressComponent.adcode,
            AName:res[0].regeocodeData.addressComponent.district,
            orderList:list
          })
      },
      fail:function(info){
        wx.showToast({
          title: '获取定位失败',
        })
      }
    })
  },
  /**
   * 显示弹出层
   */
  showPopup:function() {
    this.setData({ show: true });
  },
  /**
   * 不显示弹出层
   */
  onClose:function() {
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
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
          }
        this.setData({orderList:list})
        break;
      case '保洁员订单':
        break;
    }
  },
  /**
   * 点击详情的函数
   */
  onDetail(event){
    const id=event.target["id"]
    switch(this.data.orderKind){
      case "上门订单":
        wx.navigateTo({
          url: '../appointOrderDetail/index?orderId='+id,
        });
        break;
      case "清箱订单":
        break;
      case "保洁员订单":
        break;
    }
  },
  /**
   * 进行订单函数
   */
  onReport:function(event){
    var id=event.target["id"]
    switch(this.data.orderKind){
      case "上门订单":
        wx.navigateTo({
          url: '../reportingOrders/index?orderId='+id,
        });
        break;
      case "清箱订单":
        break;
      case "保洁员订单":
        break;
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