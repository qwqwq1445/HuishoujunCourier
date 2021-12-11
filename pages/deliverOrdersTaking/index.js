var util = require('../../utils/util.js');
import {getBucketByOptions} from "../../utils/bucket"
import {getAppointOrderByOptions,getAppointOrderDetail}  from "../../utils/appointorder"
import {getAppointOrdercByOptions,getAppointOrdercDetail}  from "../../utils/appointorderc"
import {getDeliverOrdercByOptions,getDeliverOrdercDetail}  from "../../utils/deliverorderc"
const dealWithData=(data)=>{
  let c = [];
  let d = {};
  data.forEach(element => {
    if(!d[element.place]){
      c.push({
        place: element.place,
        allData: [element]
      });
      d[element.place] = element;
    }else{
      c.forEach(ele => {
        if(ele.place == element.place){
          ele.allData.push(element);
        }
      });
    }             
 });
  return c;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    binList: [],
    columns: [],
    binName:[],
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
    const blist=await getBucketByOptions({"addrNo":420111})
    const resultA=await getDeliverOrdercByOptions({"orderStatus":1,"courierId":getApp().globalData.courierId,"place":blist.data.data.value[0].place,"category":blist.data.data.value[0].category})
    var binList = dealWithData(blist.data.data.value).map( (item, index) => {
      return item.place
    })
    this.setData({
      orderList:resultA.data.data.value,
      binName:[blist.data.data.value[0].place,blist.data.data.value[0].category],
      columns:[
        {
          values: binList,
          className: 'column1',
          defaultIndex:0,
        },
        {
          values: ['可回收物','有害垃圾','厨余垃圾','其他垃圾'],
          className: 'column2',
          defaultIndex: 0,
        },
      ]
    })    
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
    const result=await getDeliverOrdercByOptions({"orderStatus":1});//courier
    this.setData({
      show:false,
      binName:event.detail.value,
      orderList:result.data.data.value
    })
  },
  /**
   * 
   */
  onDetail(event){
    const id=event.target["id"]
    wx.navigateTo({
      url: '../deliverOrderDetail/index?orderId='+id,
    });
  },
  /**
   * 进行订单函数
   */
  onTaking:function(event){
    this.onScanning()
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
      }).then(() => {
        wx.switchTab({
          url: '../info/index',
        })
      });
    }else{
      wx.scanCode({
        success: (res) => {
          wx.navigateTo({
            url: '../openBin/index?infoBin=' +res.result
          })
        },
        fail(){
          wx.showToast({
            title: '扫码失败'
          })
        }
      })
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