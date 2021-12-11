// pages/binOrders/deliverOrders.js
import {getBucketByOptions} from "../../utils/bucket"
import {getDeliverOrderByOptions,updateDeliverOrder}  from "../../utils/deliverorder"
import {addDeliverOrderc}  from "../../utils/deliverorderc"
var amapFile = require('../../static/amap-wx.130.js');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
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
    binCode:'',//回收箱编码
    binName:[],//回收箱地址信息
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'f1c086a1184898191bae6b8fecaa3bf3'});
    myAmapFun.getRegeo({
      success:async function(res){
        const blist=await getBucketByOptions({"addrNo":420111})
        const result=await getDeliverOrderByOptions({"orderStatus":0,"place":blist.data.data.value[0].place,"category":blist.data.data.value[0].category});//"addrNo":res[0].regeocodeData.addressComponent.adcode
          // for(var i=0;i<result.data.data.value.length;i++){
          //   var str=result.data.data.value[i].place
          //   var arr = str.split(/['市']+/);//以空格分开
          //   result.data.data.value[i].placeShortened=arr[1]
          // }
        var binList = dealWithData(blist.data.data.value).map( (item, index) => {
          return item.place
        })
        that.setData({
          binName:[blist.data.data.value[0].place,blist.data.data.value[0].category],
          orderList:result.data.data.value,
          binList:binList,
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
      fail:function(info){
        console.log(info);
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
  onCancel:function() {
    this.setData({ 
      show: false 
    });
  },
  /**
   * 确认函数
   */
  onConfirm:async function(){
    var result=await getDeliverOrderByOptions({"orderStatus":0,"place":this.data.binName[0],"category":this.data.binName[1]});
    this.setData({
      show:false,
      orderList:result.data.data.value
    })
  },
  onChange:async function(event){
    this.setData({
      binName:event.detail.value
    })
  },
  onSubmit:function(){
    if(this.data.orderList.length!=0){
      Dialog.confirm({
        message: '确定一键接收订单吗',
      }).then(() =>{
        var array=this.data.orderList
        for(var i=0;i<array.length;i++){
          updateDeliverOrder({
            "orderId":array[i].orderId,
            "orderStatus":1,
            "courierName":getApp().globalData.courierName,
            "courierTel":getApp().globalData.courierTel
          })
            addDeliverOrderc({
              "category": array[i].category,
              "courierId": getApp().globalData.courierId,
              "feedback": "none",
              "orderId": array[i].orderId,
              "orderStatus": 1,
              "place": array[i].place,
              "time": array[i].time,
              "weight": 0
            })
            this.setData({orderList:[]})
        }
        wx.showToast({
          title: '一键接单完成！',  // 标题
          icon: 'success',   // 图标类型，默认success
          duration: 1500 ,  // 提示窗停留时间，默认1500ms
        })
      });
    }
    else{
      wx.showToast({
        title: '请选择垃圾种类',
        icon:'none'
      })
    }
  },
  /**
   * 接单函数
   */
  onOrderTaking(event){
    var id=event.target["id"];
    Dialog.confirm({
      message: '确定接收订单吗',
    }).then(()=>{
    //增加订单到骑手接单表中
    var array=this.data.orderList
    for (var i=0; i<array.length; i++) {
      if(array[i].orderId == id){
        updateDeliverOrder({
          "orderId":id,
          "orderStatus":1,
          "courierName":getApp().globalData.courierName,
          "courierTel":getApp().globalData.courierName
        })
          addDeliverOrderc({
            "category": array[i].category,
            "courierId": getApp().globalData.courierId,
            "feedback": array[i].feedback,
            "orderId": array[i].orderId,
            "orderStatus": 1,
            "place": array[i].place,
            "time": array[i].time,
            "weight": array[i].weight
          })
          array.splice(i,1)
          this.setData({orderList:array})
        }
      }
      wx.showToast({
        title: '接单成功',
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