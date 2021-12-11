// pages/openBin/index.js
import {getBucketInfo,updateBucket} from "../../utils/bucket"
import {getCourierDetail,saveOrUpdateCourier} from "../../utils/courier"
import {getDeliverOrderByOptions,updateDeliverOrder}  from "../../utils/deliverorder"
import {getDeliverOrdercByOptions,updateDeliverOrderc}  from "../../utils/deliverorderc"
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place:'',
    function:'开启箱体',
    category:'',
    maxweight:'',
    weight:'',
    orderList:[],
  },

  onDetail:function(event){
    var id=event.target["id"]
    wx.navigateTo({
      url: '../deliverOrderDetail/index?orderId='+id,
    });
  },
  /**
   * 单个领取
   */
  onTaking:async function(event){
    if(this.data.function=='开启箱体'){
      Dialog.alert({
        title: '提示',
        message: '请先进行开箱操作',
      })
    }else{
      var id=event.target['id']
      var array=this.data.orderList
      for (var i=0; i<array.length; i++) {
        if(array[i].orderId == id){
          await updateDeliverOrder({"orderId":id,"orderStatus":2})
          await updateDeliverOrderc({"orderId":id,"orderStatus":2})
          updateBucket({"place":this.data.place,"category":this.data.category,"weight":this.data.weight-array[i].weight,"isFull":0})
          const detail=await getCourierDetail(getApp().globalData.courierId)
          await saveOrUpdateCourier({"id":getApp().globalData.courierId,"orderNum":detail.data.data.value.orderNum+1})
          array.splice(i,1)
          this.setData({orderList:array,weight:this.data.weight-array[i].weight})
        }
      }
    }
  },
  /**
   * 开启箱体
   */
  onSubmit:function(){
    var array=this.data.orderList
    if(array.length!=0){
      if(this.data.function=='开启箱体'){
        wx.showToast({
          title: '开箱成功',
        })
        this.setData({
          function:'一键领取',
          ifClose:'false'
        })
      }else{
        Dialog.confirm({
          title: '提示',
          message: '确定要一键领取订单吗？',
        }).then(async ()=>{
          const detail=await getCourierDetail(getApp().globalData.courierId)
          saveOrUpdateCourier({"id":getApp().globalData.courierId,"orderNum":detail.data.data.value.orderNum+array.length})
          updateBucket({"place":this.data.place,"category":this.data.category,"weight":0,"isFull":0})
          for(var i=0;i<array.length;i++){
            await updateDeliverOrder({"orderId":array[i].orderId,"orderStatus":2})
            await updateDeliverOrderc({"orderId":array[i].orderId,"orderStatus":2})
          }
          this.setData({orderList:[]})
        })
      }
    }else{
      Dialog.alert({
        title: '提示',
        message: '你没有接收本垃圾箱的订单',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {//"addrNo":res[0].regeocodeData.addressComponent.adcode,"place":options.place
    const info=await getBucketInfo(options.binCode)
    const result=await getDeliverOrdercByOptions({"orderStatus":1,"bucketId":options.place,"courierId":getApp().globalData.courierId})
    this.setData({
      place: info.data.data.value.place,
      category:info.data.data.value.category,
      maxweight:info.data.data.value.maxWeight,
      weight:info.data.data.value.weight,
      orderList:result.data.data.value
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