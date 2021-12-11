// pages/cleanerOrders/cleanerOrders.js
import {areaList} from "../../static/area"
var amapFile = require('../../static/amap-wx.130.js');
Page({
   /**
   * 页面的初始数据
   */
  data: {
    show:false,
    areaList:areaList,
    ACode:'',//定位地区编码
    AName:'',//定位地区
    orderList:[
      {
        number:'#001',
        address:'黄阿姨'
      },
      {
        number:'#002',
        address:'陈大叔'
      },
      {
        number:'#003',
        address:'张大叔'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'f1c086a1184898191bae6b8fecaa3bf3'});
    myAmapFun.getRegeo({
      success:function(res){
          that.setData({ACode:res[0].regeocodeData.addressComponent.adcode,AName:res[0].regeocodeData.addressComponent.district})
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
  onConfirm(object){
    this.setData({ show: false,ACode:object.detail.values[2].code, AName:object.detail.values[2].name});
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