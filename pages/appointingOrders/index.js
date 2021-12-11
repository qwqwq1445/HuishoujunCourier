import {addAppointOrder,updateAppointOrder} from "../../utils/appointorder"
import {getAppointOrdercDetail,updateAppointOrderc} from "../../utils/appointorderc"
import {getCourierDetail,saveOrUpdateCourier} from "../../utils/courier"
const util=require("../../utils/util.js")
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
const categories = [
  { text: '可回收物', value: 0 },
  { text: '有害垃圾', value: 1 },
  { text: '厨余垃圾', value: 2 },
  { text: '其他垃圾', value: 3 },
]
const kinds = [
  [
    { text: '纸类', value: 0,bonus: 20},
    { text: '塑料', value: 1,bonus: 30},
    { text: '金属', value: 2,bonus: 50},
    { text: '玻璃', value: 3,bonus: 40},
    { text: '织物', value: 4,bonus: 30},
  ],
  [
    { text: '灯管', value: 0,bonus: 50},
    { text: '家用化学品', value: 1,bonus: 20},
    { text: '电池', value: 2,bonus: 100},
  ],
  [
    { text: '家庭厨余垃圾', value: 0,bonus: 10},
    { text: '餐厨垃圾', value: 1,bonus: 10},
    { text: '其他厨余垃圾', value: 2,bonus: 10},
  ],
  [
    { text: '其他垃圾', value: 0, bonus:10},
  ],
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    weight:0,
    integration:0,
    trashList:[],
    listLength:0,
    currentTime:'',
    senderName:'',
    courierId:'',
    begin:'',
    show:false,
    select:0,
    category:0,
    kind:0,
    categories:categories,
    kinds:kinds[0]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    const begin = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    const result=await getAppointOrdercDetail(options.orderId);//根据id查找
    this.setData({
        currentTime: begin,
        orderId: options.orderId,  
        date:result.data.data.value.senderDateBegin+'至'+result.data.data.value.senderDateEnd,
        senderName:result.data.data.value.senderName,
        courierId:result.data.data.value.courierId
    })
  },

  onSwitch1Change({ detail }) {
    this.setData({ category: detail,kinds:kinds[detail] });
  },

  onSwitch2Change({ detail }) {
    this.setData({ kind: detail });
  },
  /**
   * 重量的改变
   * @param {*} event 
   */
  onWeightChange:function(event){
    this.setData({weight:event.detail*1,integration:event.detail*this.data.kinds[this.data.kind].bonus})
  },
  /**
   * 垃圾种类的改变
   * @param {*} e 
   */
  onTrashChange:function(e){
    this.setData({select:e.detail})
  },
  /**
   * 增加垃圾种类函数
   */
  onAddingTrash:function(){
    this.setData({show:true})
  },
  onClose:function(){
    this.setData({show:false})
  },
  /**
   * 
   */
  onConfirmAdding:function(){
    const integration=this.data.weight*this.data.kinds[this.data.kind].bonus
    const list=this.data.trashList
    for(var i=0;i<list.length;i++){
      list[i].id=i
    }
    const newTrash={"id":list.length,"trashKind":this.data.kinds[this.data.kind].text,"weight":this.data.weight,"bonus":this.data.kinds[this.data.kind].bonus,"integration":integration}
    list.push(newTrash)
    this.setData({show:false,weight:0,select:0,integration:0,trashList:list,listLength:list.length})
  },
  /**
   * 完成订单
   */
  onSubmit:function(){
    if(this.data.trashList.length!=0){
      Dialog.confirm({
        message: '确定完成订单吗',
      }).then(async() =>{
        var category=''
        var weight=0
        var integration=0
        for(var i=0;i<this.data.trashList.length;i++){
          category+=this.data.trashList[i].trashKind+' '
          weight+=this.data.trashList[i].weight
          integration+=this.data.trashList[i].integration
        }
        updateAppointOrderc({
          "orderId":this.data.orderId,
          "orderStatus":2,
          "category":category,
          "weight":weight
        })
        updateAppointOrder({
          "orderId":this.data.orderId,
          "orderStatus":2,
          "category":category,
          "weight":weight,
          "integration":integration
        })
        const detail=await getCourierDetail(this.data.courierId)
        saveOrUpdateCourier({"id":this.data.courierId,"orderNum":detail.data.data.value.orderNum+1})
        wx.showToast({
          title: '订单完成！',  // 标题
          icon: 'success',   // 图标类型，默认success
          duration: 1500 ,  // 提示窗停留时间，默认1500ms
        })
        setTimeout(function () {
          wx.navigateBack({//返回
            delta: 0
          })
        }, 1500);
      });
    }
    else{
      wx.showToast({
        title: '请选择垃圾种类',
        icon:'none'
      })
    }
  },
  onDelete(event) {
    const { position, instance } = event.detail;
    console.log(event.detail)
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          const id=event.detail.instance.id;
          console.log(event.detail.instance.id)
          const list=this.data.trashList;
          list.splice(id,1);
          this.setData({trashList:list})
          instance.close();
        });
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