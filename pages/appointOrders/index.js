// pages/collectingOrders/collectingOrders.js
import {areaList} from "../../static/area"
import {getAppointOrderDetail,getAppointOrderByOptions,updateAppointOrder}  from "../../utils/appointorder"
import {addAppointOrderc}  from "../../utils/appointorderc"
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
var amapFile = require('../../static/amap-wx.130.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    courierId:'',
    cannotBeTaken:false,
    show:false,
    areaList:areaList,
    ACode:'',//定位地区编码
    AName:'',//定位地区
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'f1c086a1184898191bae6b8fecaa3bf3'});
    myAmapFun.getRegeo({
      success:async function(res){
          const result=await getAppointOrderByOptions({"orderStatus":0});//addr
          var list=result.data.data.value
          for(var i=0;i<list.length;i++){
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
          }
          console.log(list)
          that.setData({
            ACode:res[0].regeocodeData.addressComponent.adcode,
            AName:res[0].regeocodeData.addressComponent.district,
            orderList:list
          })
      },
      fail:function(info){
        console.log(info);
      }
    })
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
   * 确认函数
   */
  onConfirm:async function(object){
    this.setData({ show: false,ACode:object.detail.values[2].code, AName:object.detail.values[2].name});
    const result=await getAppointOrderByOptions({"orderStatus":0});//,"addrNo":object.detail.values[2].code
    var list=result.data.data.value
          for(var i=0;i<list.length;i++){
            var str=list[i].senderAddress
            var arr = str.split(/['市']+/);//以空格分开
            list[i].senderAddressShortened=arr[1]
          }
    await this.setData({orderList:list})
  },
  /**
   * 接单函数
   */
  onOrderTaking(event){
    //把原订单的状态置为已接单
    Dialog.confirm({
      title: '确认',
      message: '确认接受此订单吗',
    })
    .then(() => {
        var id=event.target["id"]
        var array=this.data.orderList
        for (var i=0; i<array.length; i++) {
        if(array[i].orderId == id){
          updateAppointOrder({
            "orderId":id,
            "orderStatus":1,
            "courierName":getApp().globalData.courierName,
            "courierTel":getApp().globalData.courierTel
          })
          addAppointOrderc({
            "category": "",
            "courierId": getApp().globalData.courierId,
            "orderId": array[i].orderId,
            "orderStatus":1,
            "isClassified":array[i].isClassified,
            "senderAddress": array[i].senderAddress,
            "senderDateBegin": array[i].senderDateBegin,
            "senderDateEnd": array[i].senderDateEnd,
            "senderName": array[i].senderName,
            "senderRemark": array[i].senderRemark,
            "senderTel": array[i].senderTel,
            "senderUrgent": array[i].senderUrgent,
            "senderWeight": array[i].senderWeight,
            "time": array[i].time
          })
          array.splice(i,1)
          this.setData({orderList:array})
          wx.showToast({
            title: '接单成功',
          })
        }
      }
    })
    .catch(() => {
      Dialog.close()
    });
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