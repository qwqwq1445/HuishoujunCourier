var util = require('../../utils/util.js');
import {getAppointOrderByOptions,getAppointOrderDetail}  from "../../utils/appointorder"
import {getAppointOrdercByOptions,getAppointOrdercDetail}  from "../../utils/appointorderc"
import {getDeliverOrdercByOptions,getDeliverOrdercDetail}  from "../../utils/deliverorderc"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    orderkinds: ['分类订单', '未分类订单'],
    orderKind:'分类订单',
    time:'',
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  /**
   * 进行订单
   */
  onAppointing:function(event){
    const id=event.target["id"]
    wx.navigateTo({
      url: '../appointingOrders/index?orderId='+id,
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
  onShow:async function () {
    if(this.data.orderKind=='分类订单'){
      const resultA=await getAppointOrdercByOptions({"orderStatus":1,"courierId":getApp().globalData.courierId,"isClassified":1})
      console.log(resultA)
      var list=resultA.data.data.value
      for(var i=0;i<list.length;i++){
        var str=list[i].senderAddress
        var arr = str.split(/['市']+/);//以空格分开
        list[i].senderAddressShortened=arr[1]
      }
      console.log(list)
      this.setData({orderList:list})
    }else{
      const resultD=await getAppointOrdercByOptions({"orderStatus":1,"courierId":getApp().globalData.courierId})//courier
      var list=resultD.data.data.value
      for(var i=0;i<list.length;i++){
          var str=list[i].place
          var arr = str.split(/['市']+/);//以空格分开
          list[i].placeShortened=arr[1]
      }
      this.setData({orderList:list})
    }
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
   * @param {*} event 选择的订单类型 
   */
  onConfirm:async function(event) {
    this.setData({show:false,orderKind:event.detail.value})
    if(event.detail.value=='分类订单'){
        const res=await getAppointOrdercByOptions({"orderStatus":1,"courierId":getApp().globalData.courierId,"isClassified":1});
        var list=res.data.data.value
        for(var i=0;i<list.length;i++){
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
        }
        this.setData({orderList:list})
    }else{
        const res=await getAppointOrdercByOptions({"orderStatus":1,"courierId":getApp().globalData.courierId,"isClassified":0})//
        var list=res.data.data.value
        for(var i=0;i<list.length;i++){
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
        }
        console.log(list)
        this.setData({orderList:list})
    }
  },
  /**
   * 
   */
  onDetail(event){
    const id=event.target["id"]
    wx.navigateTo({
      url: '../appointOrderDetail/index?orderId='+id,
    });
  },
  /**
   * 进行订单函数
   */
  onTaking:function(event){
    var id=event.target["id"]
     wx.navigateTo({
      url: '../appointingOrders/index?orderId='+id,
    });
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